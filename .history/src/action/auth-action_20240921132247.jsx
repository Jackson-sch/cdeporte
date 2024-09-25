"use client";

import

import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User/User";

import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

const registerActions = async (formData) => {
  try {
    const { firstName, lastName, email, password } = formData;

    if (!firstName || !lastName || !email || !password) {
      throw new Error("Por favor, completa todos los campos");
    }

    await dbConnect();

    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ email });

    if (existingUser) throw new Error("El correo electrónico ya existe");

    const hashedPassword = await hash(password, 12);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    /*  redirect("/login"); */

    // Autenticar al usuario
    /* await signIn("credentials", {
      email,
      password,
      redirect: false,
    }); */

    return {
      success: true,
      message:
        "Por favor, verifica tu correo electrónico para completar el registro.",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return {
      error:
        error.message ||
        "Error interno en el servidor. Por favor, intenta de nuevo.",
    };
  }
};

const loginAction = async (formData) => {
  const { email, password } = formData;

  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });


    if (result?.error) {
      return { error: "Credenciales inválidas. Por favor, verifica tu email y contraseña." };
    }

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Error de autenticación. Por favor, intenta de nuevo." };
    }
    return {
      error: "Error interno del servidor. Por favor, intenta de nuevo más tarde.",
    };
  }
};

const fetchAllUsers = async () => {
  await dbConnect();
  const users = await User.find({});
  return users;
};

export { loginAction, registerActions, fetchAllUsers };
