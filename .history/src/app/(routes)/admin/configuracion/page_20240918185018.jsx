import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function AdminSettings() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Configuración del Sistema</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="reservations">Reservaciones</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>Ajusta la configuración general del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Nombre del Sitio</Label>
                <Input id="site-name" defaultValue="Sistema de Reservas Deportivas" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Zona Horaria</Label>
                <Select defaultValue="America/Mexico_City">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la zona horaria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Mexico_City">Ciudad de México</SelectItem>
                    <SelectItem value="America/Bogota">Bogotá</SelectItem>
                    <SelectItem value="America/Lima">Lima</SelectItem>
                    <SelectItem value="America/Santiago">Santiago</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="maintenance-mode" />
                <Label htmlFor="maintenance-mode">Modo de Mantenimiento</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="reservations">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Reservaciones</CardTitle>
              <CardDescription>Ajusta las reglas para las reservaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="max-reservations">Máximo de Reservaciones por Usuario (por semana)</Label>
                <Input type="number" id="max-reservations" defaultValue="5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cancellation-period">Período de Cancelación (horas antes)</Label>
                <Input type="number" id="cancellation-period" defaultValue="24" />
              </div>
              <div className="space-y-2">
                <Label>Horario de Reservaciones</Label>
                <div className="flex space-x-2">
                  <Input type="time" defaultValue="06:00" />
                  <span className="self-center">a</span>
                  <Input type="time" defaultValue="22:00" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Notificaciones</CardTitle>
              <CardDescription>Configura las notificaciones del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="email-notifications" />
                <Label htmlFor="email-notifications">Notificaciones por Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sms-notifications" />
                <Label htmlFor="sms-notifications">Notificaciones por SMS</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reminder-time">Tiempo de Recordatorio (horas antes)</Label>
                <Input type="number" id="reminder-time" defaultValue="2" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Seguridad</CardTitle>
              <CardDescription>Ajusta la configuración de seguridad del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="two-factor-auth" />
                <Label htmlFor="two-factor-auth">Autenticación de Dos Factores</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Tiempo de Expiración de Sesión (minutos)</Label>
                <Input type="number" id="session-timeout" defaultValue="30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-strength">Fuerza Mínima de Contraseña</Label>
                <Slider
                  defaultValue={[2]}
                  max={3}
                  step={1}
                  className="w-[60%]"
                />
                <div className="flex justify-between text-xs text-muted-foreground w-[60%]">
                  <span>Débil</span>
                  <span>Media</span>
                  <span>Fuerte</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}