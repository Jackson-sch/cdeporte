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
import { useRouter } from "next/navigation";

export function FormLogin() {
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();


  const form = useForm({
    resolver: zodResolver(value),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const onSubmit = async (values) => {
    setError(null);
    startTransition(async () => {
      const res =  await loginAction(values);
      if(res.error) {
        setError(res.error);
      } else {
        toast({
          title: "Login exitoso",
          description: res.message,
          duration: 3000,
        });
        router.push("/dashboard");
      }
    })
  };

  return (
    <>>
  );
}
