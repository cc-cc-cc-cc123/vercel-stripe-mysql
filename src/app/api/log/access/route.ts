import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await prisma.accessLog.create({ data });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving access log:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
