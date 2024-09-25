import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function middleware(req) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  // Rutas públicas
  const publicRoutes = ["/", "/login", "/register"];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Rutas protegidas
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Rutas específicas de rol (ejemplo)
  if (pathname.startsWith("/admin") && session.user.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};