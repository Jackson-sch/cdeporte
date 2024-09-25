"use server";

import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User/User";

import bcryptjs from "bcryptjs";
import { signIn, signOut } from "@/auth";
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
  console.log("Intentando iniciar sesión con:", email);

  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log("Resultado de signIn:", result);

    if (result?.error) {
      console.log("Error en signIn:", result.error);
      return { error: "Credenciales inválidas. Por favor, verifica tu email y contraseña." };
    }

    console.log("Inicio de sesión exitoso");
    return { success: true };
  } catch (error) {
    console.error("Error en loginAction:", error);
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
