import { object, string } from "zod";

export const loginSchema = object({
  email: string({
    required_error: "El correo electrónico es obligatorio.",
  })
    .email({
      message: "Dirección de correo electrónico no válida.",
    })
    .min(1, {
      message: "El correo electrónico es obligatorio.",
    }),

  password: string({
    required_error: "La contraseña es obligatoria.",
  })
    .min(1, "La contraseña es obligatoria.")
    .min(8, {
      message: "La contraseña debe ser al menos 8 caracteres.",
    })
    .max(32, {
      message: "La contraseña debe ser menos de 32 caracteres.",
    }),
});