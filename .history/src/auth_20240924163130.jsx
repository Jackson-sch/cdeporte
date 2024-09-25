import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { Mongo}

export const { handlers, auth, signIn, signOut } = NextAuth({ ...authConfig });
