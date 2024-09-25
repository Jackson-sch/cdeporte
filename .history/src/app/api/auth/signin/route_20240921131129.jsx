// pages/api/auth/login.js o app/api/auth/login/route.js
import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: "Contraseña incorrecta" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error del servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}