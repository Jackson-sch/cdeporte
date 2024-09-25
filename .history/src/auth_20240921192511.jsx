import NextAuth from "next-auth";
import User from "./models/User/User";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  ...authConfig,
});
