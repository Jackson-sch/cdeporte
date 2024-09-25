import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
   await dbConnect();
   const {email, password} = await req.json();

   const user = await User.findOne({email}).select("+password +emailVerified");
  } catch (error) {
    
  }
}
