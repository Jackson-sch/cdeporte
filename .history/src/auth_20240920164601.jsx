import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { loginSchema } from "./lib/validations/auth/login"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      
      authorize: async (credentials) => {
        const {data, success} = loginSchema

       if
      }

    })
  ],
})