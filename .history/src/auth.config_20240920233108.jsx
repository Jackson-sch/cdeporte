import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./lib/validations/auth/login";
import User from "./models/User/User";

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
        const { data, success } = loginSchema.safeParse(credentials);

        if (!success) {
          throw new Error("Credenciales no válidas");
        }

        // verificar si existe el usuario en la base de datos
        const user = await User.findOne({ email: data.email });

        if (!user || !user.password) {
          throw new Error("Usuario no registrado");
        }

        // verificar si la contraseña es correcta
        const isValid = await bcrypt.compare(data.password, user.password);

        if (!isValid) {
          throw new Error("Contraseña incorrecta");
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
          await Sen(user.email, token);

          throw new Error("El email de verificación se envió con éxito");
        }

        return user;
      },
    }),
  ],
};

export default authConfig;
