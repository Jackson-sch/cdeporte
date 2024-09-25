import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { dbConnect } from "./lib/mongoose";
import User from "./models/User/User";
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
        console.log("🚀 Iniciando autorización");
        const { email, password } = credentials;

        if (!email || !password) {
          console.log("Email o contraseña incorrectos");
          return null;
        }

        await dbConnect();

        // verificar si existe el usuario en la base de datos
        const user = await User.findOne({ email });
        console.log("🚀 ~ Usuario encontrado:", user);

        if (!user || !user.password) {
          console.log("🚀 ~ Usuario no encontrado o sin contraseña");
          return null;
        }

        console.log("🚀 ~ Contraseña proporcionada:", password);
        console.log("🚀 ~ Contraseña almacenada (hash):", user.password);

        // verificar si la contraseña es correcta
        const isValid = await new Promise((resolve) => {
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              console.error("🚀 ~ Error al comparar contraseñas:", err);
              resolve(false);
            } else {
              resolve(result);
            }
          });
        });

        if (!isValid) {
          console.log("Contraseña incorrecta");
          return null;
        }

        // verificación del email
        if (!user.emailVerified) {
          const verifyTokenExits = await VerificationToken.findOne({
            identifier: user.email,
          });

          // si existe un token, lo eliminamos
          if (verifyTokenExits?.identifier) {
            await VerificationToken.findByIdAndDelete({
              identifier: user.email,
            });
          }

          // creamos un nuevo token de verificación
          const token = nanoid();

          await VerificationToken.create({
            identifier: user.email,
            token,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 horas
          });

          // enviamos el email de verificación
          await sendVerificationRequest(user.email, token);

          console.log("Email no verificado");
          return null;
        }
        console.log("Autenticación correcta");
        console.log("🚀 ~ User:", user);
        return user;
      },
    }),
  ],
};

export default authConfig;
