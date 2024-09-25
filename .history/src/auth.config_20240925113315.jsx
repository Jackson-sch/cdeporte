import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { dbConnect } from "@/lib/mongoose"
import User from "@/models/User/User"
import bcrypt from "bcryptjs"

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      
    })
    /* Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        await dbConnect()

        const user = await User.findOne({ email: credentials.email }).select("+password")

        if (!user || !user.password) {
          return null
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordCorrect) {
          return null
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        }
      },
    }), */
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.firstName = user.firstName
        token.lastName = user.lastName
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.firstName = token.firstName
        session.user.lastName = token.lastName
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },

  events: {
    async linkAccount({user}){
      try {
        const res = await fetch("/api/auth/link-account", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id }),
        })
        if (!res.ok) {
          throw new Error(`Error en la petición: ${res.status} ${res.statusText}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}