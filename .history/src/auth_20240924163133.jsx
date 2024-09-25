import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { MongoDB}

export const { handlers, auth, signIn, signOut } = NextAuth({ ...authConfig });
