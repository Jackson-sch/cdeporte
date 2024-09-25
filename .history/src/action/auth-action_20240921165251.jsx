// auth-actions.js
"use client";

import { signIn } from "next-auth/react";

export const loginAction = async (formData) => {
  console.log("🚀 ~ loginAction ~ formData:", formData)
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    console.log("🚀 ~ loginAction ~ result:", result)

    if (result.error) {
      return { error: "Credenciales inválidas" };
    }

    return { success: true };
  } catch (error) {
    return { error: "Error del servidor" };
  }
};

export const registerAction = async (formData) => {
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || "Error en el registro" };
    }

    return { success: true };
  } catch (error) {
    return { error: "Error del servidor" };
  }
};