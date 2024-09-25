import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Credenciales incompletas" }, { status: 400 });
  }

  await dbConnect();

  const user = await User.findOne({ email }).select("+password");

  if (!user || !user.password) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 401 });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }

  return NextResponse.json({
    id: user._id.toString(),
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  });
}