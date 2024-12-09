import axios from "axios";
import { NextResponse } from "next/server";
import { ApiErrorCodes } from "@/types/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      {
        code: ApiErrorCodes.PARAM_ERROR,
        message: "URL is required",
      },
      { status: 200 }
    );
  }

  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      timeout: 60000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        Referer: "https://www.instagram.com/",
        Origin: "https://www.instagram.com",
      },
      maxContentLength: 50 * 1024 * 1024,
      validateStatus: (status) => status >= 200 && status < 300,
    });

    return new NextResponse(Buffer.from(response.data), {
      status: 200,
      headers: {
        "Content-Type":
          response.headers["content-type"] || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      return NextResponse.json(
        {
          code: ApiErrorCodes.FETCH_ERROR,
          message: "Failed to fetch the image",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        code: ApiErrorCodes.SERVER_ERROR,
        message: "Internal Server Error",
      },
      { status: 200 }
    );
  }
}
