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
    signIn: "/login",
    error: "/login",
    signOut: "/login",
  },
  callbacks: {
    async signIn({ user, account}) {
      if (account?.provider === "google") {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            emailVerified: true,
          });
        }
      }
    },
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.sub = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }

      return token;
    }
  },

  events: {
    async linkAccount({user}) {
      await User.updateOne({ _id: user.id }, { $set: { emailVerified: true } });
    }
  },
  
});
