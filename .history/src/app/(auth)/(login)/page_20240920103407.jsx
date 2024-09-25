'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { FaGoogle, FaFacebook } from 'react-icons/fa'
import { FormLogin } from '../components/sing-in'

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Inicio de sesión:', credentials)
    // Aquí iría la lógica para autenticar al usuario
  }

  return (
    <div>
      {/* <Card className="mx-auto h-screen w-[350px]">
      <CardHeader>
        <CardTitle>Iniciar Sesión</CardTitle>
        <CardDescription>Accede a tu cuenta.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" name="email" type="email" value={credentials.email} onChange={handleChange} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" name="password" type="password" value={credentials.password} onChange={handleChange} required />
            </div>
          </div>
        </form>
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
    </Card> */}
    <FormLogin />
    </div>
    
  )
}