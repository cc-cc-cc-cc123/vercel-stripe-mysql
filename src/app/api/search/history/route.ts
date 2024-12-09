import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ApiErrorCodes } from "@/types/api";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const uid = request.headers.get("x-user-id");

    if (!uid) {
      return NextResponse.json(
        {
          code: ApiErrorCodes.UNAUTHORIZED,
          message: "Unauthorized access",
        },
        { status: 401 }
      );
    }

    const searchHistory = await prisma.userSearchHistory.findMany({
      where: {
        uid: uid,
      },
      orderBy: {
        id: "desc",
      },
      select: {
        username: true,
        createdAt: true,
        type: true,
        remaining: true,
      },
    });

    // Transform the data to match usageHistoryData format
    const formattedHistory = searchHistory.map((item: any) => ({
      targetAccount: `@${item.username}`,
      date: item.createdAt.toISOString().split("T")[0],
      type: item.type,
      remainingSearches: item.type === "premium" ? item.remaining : "-",
    }));

    return NextResponse.json(
      {
        code: ApiErrorCodes.SUCCESS,
        message: "Success",
        data: formattedHistory,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        code: ApiErrorCodes.SERVER_ERROR,
        message: error.message || "Internal server error occurred",
      },
      { status: 200 }
    );
  }
}
