import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const publicRoutes = ["/", "/login", "/register"];
  const protectedRoutes = ["/dashboard", "/profile"];

  if (!isLoggedIn && protectedRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (isLoggedIn && publicRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
  runtime:
};