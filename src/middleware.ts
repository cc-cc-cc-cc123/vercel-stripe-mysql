import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ApiErrorCodes } from "./types/api";

// Asynchronous function to record access logs
const saveAccessLog = (request: NextRequest, uid: string = "anonymous") => {
  const clientIp = request.headers.get("x-forwarded-for") || "";
  const clientUserAgent = request.headers.get("user-agent") || "";
  const browserSessionId =
    request.headers.get("x-browser-session-id") || "unknown";

  // Build the complete URL
  const protocol = request.nextUrl.protocol;
  const host = request.headers.get("host");
  const apiUrl = `${protocol}//${host}/api/log/access`;

  Promise.resolve(
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid,
        sessionId: browserSessionId,
        clientIp,
        clientUserAgent,
        targetUrl: request.nextUrl.pathname,
      }),
    })
  );
};

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/api/server-sitemap.xml" ||
    request.nextUrl.pathname === "/api/stripe/callback" ||
    request.nextUrl.pathname === "/api/img" ||
    request.nextUrl.pathname === "/api/log/access"
  ) {
    return NextResponse.next();
  }

  const firebaseUser = request.cookies.get("firebaseUser")?.value;
  if (!firebaseUser && request.nextUrl.pathname !== "/api/search") {
    saveAccessLog(request);
    return NextResponse.json(
      { code: ApiErrorCodes.NEED_LOGIN, message: "Need login" },
      { status: 200 }
    );
  }

  const parsedFirebaseUser = firebaseUser ? JSON.parse(firebaseUser) : "{}";
  const uid = parsedFirebaseUser?.uid;
  const email = parsedFirebaseUser?.email;

  saveAccessLog(request, uid || "anonymous");

  if ((!uid || !email) && request.nextUrl.pathname !== "/api/search") {
    return NextResponse.json(
      { code: ApiErrorCodes.NEED_LOGIN, message: "Need login" },
      { status: 200 }
    );
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", uid);
  requestHeaders.set("x-user-email", email);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/api/:path*"],
};
