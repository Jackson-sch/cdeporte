import NextAuth from "next-auth";
import {authConfig

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };