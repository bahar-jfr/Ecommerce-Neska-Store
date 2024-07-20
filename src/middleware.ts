import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (pathname.startsWith("/dashboard")) {
    const cookie = cookies();
    const userRole = cookie.get("role")?.value;

    if (userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
  if (pathname.startsWith("/auth/login")&& accessToken) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path", "/login"],
};
