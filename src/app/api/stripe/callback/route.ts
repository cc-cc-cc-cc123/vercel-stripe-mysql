import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
// Webhook handler for payment status updates
export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "No signature found" },
        { status: 400 }
      );
    }

    // 验证 Webhook 签名
    let event: Stripe.Event;
    try {
      event = Stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // 处理支付成功事件
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // 更新订单状态
      const order = await prisma.paymentOrder.update({
        where: { paymentIntent: session.id },
        data: { status: "completed", customerId: session.customer as string },
      });
      console.log("order", order);

      // 如果存在客户ID，更新用户的使用次数
      if (order.uid) {
        await prisma.users.upsert({
          where: { uid: order.uid },
          update: {
            credits: {
              increment: 20,
            },
          },
          create: {
            uid: order.uid,
            credits: 20,
          },
        });
      }
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
