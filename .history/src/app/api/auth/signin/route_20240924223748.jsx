import {getServerSession} from "next-auth";
import {authConfig} from "@/auth.config";
import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  const session = await getServerSession(authConfig);
  if(!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const user = await User.findById()
}