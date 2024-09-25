"use server";

import { signIn } from "@/auth";
import dbConnect from "@/lib/mongoose";
import { loginSchema } from "@/lib/validations/auth/login";
import bcrypt from "bcryptjs";

export const loginAction = async (values: ) => {
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
      return { error: error.cause?.err?.message };
    }
    return { error: "Error al iniciar sesión, error 500" };
  }
};

export const registerAction = async (registerSchema) => {};
