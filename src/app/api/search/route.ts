import { NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { ApiErrorCodes } from "@/types/api";
const prisma = new PrismaClient();

// Types
interface InstagramRequest {
  username: string;
  operate: string;
  pageNo: number;
}

// Constants
const API_KEY =
  "4kpQc8OFw0I00sRAAZcll64BXugJs3hTPrDn5kwCsLZO92C7F0Wgi5BIliXeBX5n49tltJ";

const API_DOMAIN = process.env.FOLLOW_API;
// Helper function to fetch Instagram data

// Main API handler
export async function POST(request: Request) {
  try {
    const body: InstagramRequest = await request.json();
    const uid = request.headers.get("x-user-id");
    if (!(body.operate === "followers" || body.operate === "following")) {
      return NextResponse.json(
        { code: ApiErrorCodes.PARAM_ERROR, message: "param error" },
        { status: 200 }
      );
    }
    if (body.pageNo > 1) {
      //如果uid为空，表示未登录，则不扣除积分
      if (!uid) {
        return NextResponse.json(
          { code: ApiErrorCodes.NEED_LOGIN, message: "Need login" },
          { status: 200 }
        );
      }
      const user = await prisma.users.findFirst({
        where: { uid: uid || "" },
      });

      if (!user || user.credits <= 0) {
        return NextResponse.json(
          {
            code: ApiErrorCodes.INSUFFICIENT_CREDITS,
            message: "Insufficient credits",
          },
          { status: 200 }
        );
      }
    }
    const url = API_DOMAIN + `${body.operate}`;

    const params = { pageNo: body.pageNo, mediaName: body.username };
    console.log("api url", url, "params:", params);
    const response = await axios.get(url, {
      headers: {
        "api-token": API_KEY,
      },
      params,
    });
    if (response.data?.code !== 0) {
      if (response.data?.code === 23002) {
        return NextResponse.json(
          { code: ApiErrorCodes.NO_MORE_DATA, message: "no more data" },
          { status: 200 }
        );
      }
      return NextResponse.json(
        {
          code: ApiErrorCodes.SERVER_ERROR,
          message: "user name not exists",
        },
        { status: 200 }
      );
    }
    const listData = response.data.data.items;

    if (listData.length == 0) {
      return NextResponse.json(
        { code: ApiErrorCodes.NO_MORE_DATA, message: "no more data" },
        { status: 200 }
      );
    }
    if (body.pageNo > 1) {
      // 如果成功获取数据且使用了分页令牌，扣除积分并记录历史
      // Get current user credits first
      const currentUser = await prisma.users.findFirst({
        where: { uid: uid || "" },
      });
      await prisma.$transaction([
        // Deduct credits
        prisma.users.update({
          where: { uid: uid || "" },
          data: { credits: { decrement: 1 } },
        }),
        // Record search history with correct remaining credits
        prisma.userSearchHistory.create({
          data: {
            uid: uid || "",
            username: body.username,
            type: "premium",
            remaining: (currentUser?.credits || 0) - 1, // Subtract 1 from current credits
          },
        }),
      ]);
    } else {
      if (uid) {
        await prisma.$transaction([
          prisma.userSearchHistory.create({
            data: {
              uid: uid || "",
              username: body.username,
              type: "free",
              remaining: 0,
            },
          }),
        ]);
      }
    }

    return NextResponse.json(
      {
        code: ApiErrorCodes.SUCCESS,
        message: "Success",
        data: listData,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        code: ApiErrorCodes.SERVER_ERROR,
        message: error.message || "Internal server error occurred",
      },
      { status: 200 }
    );
  }
}
