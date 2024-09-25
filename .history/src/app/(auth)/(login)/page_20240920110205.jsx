"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { FormLogin } from "../components/sing-in";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inicio de sesión:", credentials);
    // Aquí iría la lógica para autenticar al usuario
  };

  return (
    <div className="container m-auto flex min-h-screen w-full max-w-lg flex-col items-center justify-center">
      <Card className="mx-auto h-screen w-[350px]">
      <CardHeader>
        <CardTitle>Iniciar Sesión</CardTitle>
        <CardDescription>Accede a tu cuenta.</CardDescription>
      </CardHeader>
      <CardContent>
        <FormLogin />
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button onClick={handleSubmit} className="w-full">Iniciar Sesión</Button>
        <div className="flex justify-between w-full">
          <Button variant="outline" className="flex items-center gap-2">
            <FaGoogle /> Google
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FaFacebook /> Facebook
          </Button>
        </div>
      </CardFooter>
    </Card>
      
    </div>
  );
}
