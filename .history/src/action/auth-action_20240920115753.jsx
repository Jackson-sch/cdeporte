"use server";

import { signIn } from "@/auth";
import dbConnect from "@/lib/mongoose";
import { loginSchema } from "@/lib/validations/login/login";
import bcrypt from "bcryptjs";

export const loginAction = async (loginSchema) => {
  try {
    await signIn("credentials", {
      email: loginSchema.email,
      password: loginSchema.password,
      redirect: false,
    });
    return {
      success: true,
    };
  } catch (error) {
    if (error) {
      return {
        error: error.cause?.err
      }
    }
  }
};
