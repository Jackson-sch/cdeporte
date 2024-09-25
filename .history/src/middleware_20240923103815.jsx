import NextAuth from "next-auth";
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};