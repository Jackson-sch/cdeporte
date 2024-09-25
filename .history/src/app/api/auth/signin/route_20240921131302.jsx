import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
   await dbConnect();
   
  } catch (error) {
    
  }
}
