'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'client'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleRoleChange = (value) => {
    setFormData(prevState => ({
      ...prevState,
      role: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Registro enviado:', formData)
    // Aquí iría la lógica para enviar los datos al servidor
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Registro de Usuario</CardTitle>
        <CardDescription>Crea una nueva cuenta en el sistema.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Nombre de usuario</Label>
              <Input id="username" name="username" value={formData.username} onChange={handleChange} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="role">Rol</Label>
              <Select onValueChange={handleRoleChange} defaultValue={formData.role}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Cliente</SelectItem>
                  <SelectItem value="employee">Empleado</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button onClick={handleSubmit}>Registrar</Button>
      </CardFooter>
    </Card>
  )
}