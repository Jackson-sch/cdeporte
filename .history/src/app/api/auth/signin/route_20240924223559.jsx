import {getServerSession} from "next-auth";
import {authConfig} from "@/auth.config";
import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User/User";
import { NextResponse } from "next/server";

export async function 