import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { loginSchema } from "./lib/validations/auth/login";
import User from "./models/User/User";
import VerificationToken from "./models/VerificationTokenSchema/VerificationToken";
import { nanoid } from "nanoid";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  pages: {
    
  },
});
