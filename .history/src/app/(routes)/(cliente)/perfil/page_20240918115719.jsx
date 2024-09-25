import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Lock, User } from "lucide-react"

export default function ProfilePage() {
  const userInfo = {
    name: 'Juan Pérez',
    email: 'jackson.sebastian@example.com',
    phone: '+51 999 999 999',
    address: 'Calle Gabriel Aguilar 1640, El Porvenir',
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Actualiza tu información de perfil</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">Datos Personales</TabsTrigger>
                <TabsTrigger value="security">Seguridad</TabsTrigger>
              </TabsList>
              <TabsContent value="personal">
                <form className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input id="name" defaultValue={userInfo.name} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" defaultValue={userInfo.email} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" defaultValue={userInfo.phone} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" defaultValue={userInfo.address} />
                  </div>
                  <Button>Guardar Cambios</Button>
                </form>
              </TabsContent>
              <TabsContent value="security">
                <form className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Contraseña Actual</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">Nueva Contraseña</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button>Cambiar Contraseña</Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Foto de Perfil</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="w-32 h-32">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Avatar" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <Button variant="outline" className="mt-4">Cambiar Foto</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferencias</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications" className="flex items-center">
                  <Bell className="mr-2 h-4 w-4" />
                  Notificaciones por Email
                </Label>
                <Switch id="notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="privacy" className="flex items-center">
                  <Lock className="mr-2 h-4 w-4" />
                  Perfil Privado
                </Label>
                <Switch id="privacy" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}