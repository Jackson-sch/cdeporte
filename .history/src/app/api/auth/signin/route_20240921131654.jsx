import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    const user = await User.findOne({ email }).select(
      "+password +emailVerified"
    );
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "Usuario no encontrado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const isPasswordValid =  await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new NextResponse(JSON.stringify({ error: "Contraseña incorrecta" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new NextResponse(JSON.strin)
  } catch (error) {}
}
