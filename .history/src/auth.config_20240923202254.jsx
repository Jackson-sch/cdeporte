import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { dbConnect } from "./lib/mongoose";
import User from "./models/User/User";
import bcryptjs from "bcryptjs";
import {NextAuthConfig} from "next-auth";
import { sendVerificationRequest } from "./lib/authSendRequest";

const publicRoutes = ["/api/auth/signin", "/api/auth/signup"];
const authRoutes = ["/login", "/register"];

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
        console.log("🚀 Iniciando autorización");
        const { email, password } = credentials;

          if (!email || !password) {
            console.log("Email o contraseña incorrectos");
            return null;
          }

        await dbConnect();

        // verificar si existe el usuario en la base de datos
        const user = await User.findOne({ email }).select(
          "+password +emailVerified"
        );
        console.log("🚀 ~ Usuario encontrado:", user);

        if (!user || !user.password) {
          console.log("🚀 ~ Usuario no encontrado o sin contraseña");
          return null;
        }

        console.log("🚀 ~ Contraseña proporcionada:", password);
        console.log("🚀 ~ Contraseña almacenada (hash):", user.password);

        // verificar si la contraseña es correcta
        const isValid = await bcryptjs.compare(password, user.password);
        console.log("🚀 ~ authorize: ~ isValid:", isValid);

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
        const { ...userWithoutPassword } = user;
        console.log("🚀 ~ userWithoutPassword:", userWithoutPassword);
        return userWithoutPassword
      },
    }),
  ],
  callbacks: {
    /* async signIn({ user, account, profile }) {
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
    }, */
    
    authorize({request: {nextUrl}, auth}) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      // Permitir el acceso a rutas públicas para todos los usuarios
      if (publicRoutes.includes(pathname)) {
        return true;
      }

      // No permitir el acceso a rutas privadas para usuarios no autenticados
      if(authRoutes.includes(pathname)) {
        if(isLoggedIn) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return true
      }
      return isLoggedIn
    },
    
    async session({ session, token }) {
      if (session) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }

      console.log("🚀 ~ session ~ session:", session);
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      console.log("🚀 ~ jwt ~ user:", user)
      if (user) {
        token.role = user.role;
        token.sub = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
 /*      if (trigger === "update" && session) {
        console.log("🚀 ~ jwt ~ trigger:", trigger);
        token.role = session.user.role;
        token.sub = session.user.id;
        token.firstName = session.user.firstName;
        token.lastName = session.user.lastName
      } */
      console.log("🚀 ~ jwt ~ token:", token);
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  events: {
    async linkAccount({ user }) {
      await User.updateOne({ _id: user.id }, { $set: { emailVerified: true } });
    },
  },
};

export default authConfig;
