import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/db";


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),

  ...authConfig,
});
