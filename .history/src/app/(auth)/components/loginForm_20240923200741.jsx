'use client'

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { loginAction, handleGoogleLogin } from "@/action/auth-action";

import { toast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

export function FormLogin() {
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const params = useSearchParams();
  const errors = params.get("error");

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (errors) {
      switch (errors) {
        case
      }
    }
  })

  const onSubmit = async (values) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
    setError(null);
    startTransition(async () => {
      const response = await loginAction(values);
      if (response.error) {
        setError(response.error);
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
      } else {
        router.push("/dashboard");
      }
    });
  };

  return (
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
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>

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
  );
}
