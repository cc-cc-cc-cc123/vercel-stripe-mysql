import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { ApiErrorCodes } from "@/types/api";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const uid = req.headers.get("x-user-id");
    const email = req.headers.get("x-user-email");
    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email || "",
      line_items: [
        {
          quantity: 1,
          price: process.env.STRIPE_PRICE_ID,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_NEXT_APP_WEB_HOST}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_NEXT_APP_WEB_HOST}?success=false`,
    });

    // Save order to database
    const order = await prisma?.paymentOrder.create({
      data: {
        amount: 6,
        currency: "usd",
        customerId: "",
        paymentIntent: session.id, // Using session ID instead of payment intent
        status: session.payment_status,
        uid: uid || "",
      },
    });

    return NextResponse.json(
      {
        code: ApiErrorCodes.SUCCESS,
        message: "Success",
        data: {
          sessionId: session.id,
          sessionUrl: session.url,
          orderId: order.id,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json(
      {
        code: ApiErrorCodes.PAYMENT_ERROR,
        message: "Payment initialization failed",
      },
      { status: 200 }
    );
  }
}
