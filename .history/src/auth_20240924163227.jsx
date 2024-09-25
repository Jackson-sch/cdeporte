import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { dbConnect } from "./lib/mongoose";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(dbConnect),

  ...authConfig,
});
