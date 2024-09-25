"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "@/lib/validations/auth/login";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export function FormLogin() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsPending(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        form.setError("root", {
          type: "manual",
          message: "Credenciales inválidas",
        });
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      form.setError("root", {
        type: "manual",
        message: "Ocurrió un error durante el inicio de sesión",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid max-w-96 items-start gap-4"
        >
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="********"
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {form.formState.errors.root && (
            <p className="text-sm text-red-500">{form.formState.errors.root.message}</p>
          )}

          <Button type="submit" disabled={isPending}>
            {isPending ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>

          <p className="text-center text-sm text-gray-500">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="hover:text-brand underline">
              Registrar
            </Link>
          </p>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        </form>
      </Form>
    </>
  );
}