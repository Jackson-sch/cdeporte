'use server'

import { signIn } from "@/auth"
import dbConnect from "@/lib/mongoose"
import { loginSchema } from "@/lib/validations/login/login"
import bcr