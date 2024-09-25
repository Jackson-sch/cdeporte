import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { loginSchema } from "./lib/validations/auth/login"
import User from "./models/User/User"
 
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
        const {data, success} = loginSchema.safeParse(credentials)

        if (!success) {
          throw new Error("Credenciales no válidas")
        }

        // verificar si existe el usuario en la base de datos
        const user = await User.findOne({email: data.username})

        if (!user || !user.password) {
          throw new Error("Usuario no registrado")
        }

       
      }

    })
  ],
})