'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import FormRegister from '../components/registerForm'



export default function Register() {


  return (
    <div className="container m-auto flex min-h-screen w-full max-w-lg flex-col items-center justify-center">
    <Card className="w-[400px] mx-auto ">
      <CardHeader>
        <CardTitle>Registro de Usuario</CardTitle>
        <CardDescription>Crea una nueva cuenta en el sistema.</CardDescription>
      </CardHeader>
      <CardContent>
        <FormRegister />
      </CardContent>
    </Card>
    </div>
  )
}