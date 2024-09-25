'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserProfile() {
  const [profile, setProfile] = useState({
    name: 'Juan Pérez',
    email: 'juan@example.com',
    role: 'Cliente',
    reservations: 5,
    balance: 100
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Perfil actualizado:', profile)
    setIsEditing(false)
    // Aquí iría la lógica para actualizar el perfil en el servidor
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Perfil de Usuario</CardTitle>
        <CardDescription>Gestiona tu información personal.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt={profile.name} />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" value={profile.name} onChange={handleChange} disabled={!isEditing} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" name="email" type="email" value={profile.email} onChange={handleChange} disabled={!isEditing} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Rol</Label>
              <Input value={profile.role} disabled />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Reservas activas</Label>
              <Input value={profile.reservations} disabled />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Saldo</Label>
              <Input value={`$${profile.balance}`} disabled />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancelar</Button>
            <Button onClick={handleSubmit}>Guardar</Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Editar Perfil</Button>
        )}
      </CardFooter>
    </Card>
  )
}