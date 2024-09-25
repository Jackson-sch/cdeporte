import {getServerSession} from "next-auth";
import {authConfig} from "@/auth.config";
import { dbConnect } from "@/lib/mongoose";