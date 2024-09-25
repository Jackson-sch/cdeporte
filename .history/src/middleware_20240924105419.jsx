import { NextResponse } from "next/server";

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  runtime: 'nodejs'  // Esto fuerza el uso del runtime de Node.js
};

export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Rutas públicas
  const publicRoutes = ["/", "/login", "/register"];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Aquí puedes agregar más lógica de middleware si es necesario

  return NextResponse.next();
}