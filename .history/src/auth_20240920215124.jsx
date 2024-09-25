import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { loginSchema } from "./lib/validations/auth/login"
import User from "./models/User/User"
import VerificationToken from "./models/VerificationTokenSchema/VerificationToken"
import { nanoid } from "nanoid"
 
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

        // verificar si la contraseña es correcta
        const isValid = await bcrypt.compare(data.password, user.password)

        if (!isValid) {
          throw new Error("Contraseña incorrecta")
        }

        // verificación del email
       if(!user.emailVerified) {
        const verifyTokenExits = await VerificationToken.findOne({
          identifier: user.email,
        })

        // si existe un token, lo eliminamos
        if (verifyTokenExits?.identifier) {
          await VerificationToken.findByIdAndDelete({
            identifier: user.email,
          })
        }

        // creamos un nuevo token de verificación
        const token = nanoid()

        await VerificationToken.create({
          identifier: user.email,
          token,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 horas
        });

        // enviamos el email de verificación
        await sendEmailVerification(user.email, token)

        throw new Error("El email de verificación se envió con éxito")
      }

      return user
    },
  ]
})