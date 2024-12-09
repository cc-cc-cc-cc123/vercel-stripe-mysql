import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ApiErrorCodes } from "@/types/api";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const uid = req.headers.get("x-user-id");

    if (!uid) {
      return NextResponse.json(
        {
          code: ApiErrorCodes.UNAUTHORIZED,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const orders = await prisma.paymentOrder.findMany({
      where: {
        uid: uid,
        status: "completed", // Stripe 支付成功状态为 'complete'
      },
      orderBy: {
        id: "desc", // 按 ID 倒序排列
      },
      select: {
        paymentIntent: true,
        createdAt: true,
        amount: true,
        status: true,
      },
    });

    // 格式化数据以匹配表格结构
    const formattedOrders = orders.map((order: any) => ({
      orderId: order.paymentIntent,
      date: order.createdAt.toISOString(),
      amount: `$${order.amount}.00`,
      status: order.status,
    }));

    return NextResponse.json(
      {
        code: ApiErrorCodes.SUCCESS,
        message: "Success",
        data: formattedOrders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Order fetch error:", error);
    return NextResponse.json(
      {
        code: ApiErrorCodes.SERVER_ERROR,
        message: "Failed to fetch orders",
      },
      { status: 500 }
    );
  }
}
