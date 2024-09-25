import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { dbConnect } from "./lib/mongoose";
import User from "./models/User/User";
import bcrypt from "bcryptjs";
import { sendVerificationRequest } from "./lib/authSendRequest";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const res = await
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          await dbConnect();
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            await User.create({
              email: user.email,
              firstName: profile.given_name,
              lastName: profile.family_name,
              image: profile.picture,
              role: "user",
              emailVerified: true,
            });
          }
        } catch (error) {
          console.error("Error creating user:", error);
          return false;
        }
      }
      return true;
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
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/login",
  },
  session: { strategy: "jwt" },
  events: {
    async linkAccount({ user }) {
      await User.updateOne({ _id: user.id }, { $set: { emailVerified: true } });
    },
  },
};

export default authConfig;
