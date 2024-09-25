import {getServerSession} from "next-auth/";
import {authConfig} from "@/auth.config";
import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  const session = await getServerSession(authConfig);
  if(!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  await dbConnect();

  const user = await User.findById(session.user.id).selected("+password +emailVerified");

  if (!user) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  return NextResponse.json(user);
}