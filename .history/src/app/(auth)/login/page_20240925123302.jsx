"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FaGoogle, FaFacebook } from "react-icons/fa";

import { signIn } from "next-auth/react";
import { FormLogin } from "../components/loginForm";

export default function Login() {

  const handleSubmit = async () => {
    await signIn("google");
  }

  return (
    <div className="container m-auto flex min-h-screen w-full max-w-lg flex-col items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Iniciar Sesión</CardTitle>
          <CardDescription>Accede a tu cuenta.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormLogin />
        </CardContent>
        <CardFooter>
          <div className="flex w-full">
            <Button
              variant="outline"
              onClick={handleSubmit}
              className="flex items-center gap-2"
            >
              <FaGoogle /> Continuar con Google
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
