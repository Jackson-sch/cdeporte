import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(db),

  ...authConfig,
});
