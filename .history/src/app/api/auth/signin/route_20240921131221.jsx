import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getSession({ request });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ message: "Sign in successful" }, { status: 200 });
}
