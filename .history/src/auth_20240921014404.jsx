import NextAuth from "next-auth";
import User from "./models/User/User";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("SignIn callback:", user, account);
      if (account.provider === "google") {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            email: user.email,
            firstName: user.family_name,
            lastName: user.given_name,
            image: user.picture,
            role: "user",
            emailVerified: user.email_verified,
          });
        }
      }
      return true;
    },
    async session({ session, token }) {
      console.log("Session callback:", session, token);
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }

      return session;
    },

    async jwt({ token, user }) {
      console.log("JWT callback:", token, user);
      if (user) {
        token.role = user.role;
        token.sub = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }

      return token;
    },
  },

  events: {
    async linkAccount({ user }) {
      await User.updateOne({ _id: user.id }, { $set: { emailVerified: true } });
    },
  },
});
