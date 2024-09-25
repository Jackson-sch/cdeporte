import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { dbConnect } from "./lib/mongoose"; // Asegúrate de tener esta función implementada
import User from "./models/User/User"; // Asegúrate de que este modelo esté bien definido

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
        console.log("🚀 ~ authorize: ~ credentials:", credentials);
        const { email, password } = credentials;

        if (!email || !password) {
          console.log("Email o contraseña incorrectos");
          return null;
        }

        await dbConnect();

        const user = await User.findOne({ email });
        console.log("🚀 ~ Usuario encontrado:", user);

        if (!user || !user.password) {
          console.log("🚀 ~ Usuario no encontrado o sin contraseña");
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password);
        console.log("🚀 ~ authorize: ~ isValid:", isValid);

        if (!isValid) {
          console.log("Contraseña incorrecta");
          return null;
        }

        // Verificación del email
        if (!user.emailVerified) {
          // Manejo de verificación del email aquí...
          console.log("Email no verificado");
          return null;
        }

        console.log("Autenticación correcta");
        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      },
    }),
  ],
};

export default authConfig;