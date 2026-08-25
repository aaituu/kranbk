import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";
  const isApiAuthRoute = pathname.startsWith("/api/auth");

  // Allow API auth routes
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Allow login page without auth
  if (isLoginPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  // Protect admin routes (except login)
  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/auth/:path*",
  ],
};

