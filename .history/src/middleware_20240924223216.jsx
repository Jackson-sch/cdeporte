import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    // Rutas públicas
    const publicRoutes = ["/", "/login", "/register"];
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    // Rutas protegidas
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Rutas específicas de rol (ejemplo)
    if (pathname.startsWith("/admin") && token.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};