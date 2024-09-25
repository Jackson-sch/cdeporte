import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"

export default function AdminReservations() {
  const reservations = [
    { id: 1, user: "María González", court: "Cancha de Tenis 1", date: "2023-07-15", time: "14:00 - 15:00", status: "Confirmada" },
    { id: 2, user: "Carlos Rodríguez", court: "Cancha de Fútbol A", date: "2023-07-15", time: "16:00 - 17:00", status: "Pendiente" },
    { id: 3, user: "Ana Martínez", court: "Cancha de Baloncesto 2", date: "2023-07-16", time: "10:00 - 11:00", status: "Confirmada" },
    { id: 4, user: "Luis Sánchez", court: "Cancha de Voleibol", date: "2023-07-17", time: "18:00 - 19:00", status: "Cancelada" },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gestión de Reservas</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Listado de Reservas</CardTitle>
            <CardDescription>Administra las reservas de canchas</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Cancha</TableHead>
                  <TableHead>Fecha y Hora</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell>{reservation.user}</TableCell>
                    <TableCell>{reservation.court}</TableCell>
                    <TableCell>{`${reservation.date} ${reservation.time}`}</TableCell>
                    <TableCell>
                      <Badge variant={
                        reservation.status === 'Confirmada' ? 'default' :
                        reservation.status === 'Pendiente' ? 'secondary' :
                        'destructive'
                      }>
                        {reservation.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2">Editar</Button>
                      <Button variant="destructive" size="sm">Cancelar</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Crear Nueva Reserva</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Crear Nueva Reserva</DialogTitle>
                  <DialogDescription>
                    Ingresa los detalles de la nueva reserva.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="user" className="text-right">
                      Usuario
                    </Label>
                    <Input id="user" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="court" className="text-right">
                      Cancha
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecciona una cancha" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tenis1">Cancha de Tenis 1</SelectItem>
                        <SelectItem value="futbolA">Cancha de Fútbol A</SelectItem>
                        <SelectItem value="baloncesto2">Cancha de Baloncesto 2</SelectItem>
                        <SelectItem value="voleibol">Cancha de Voleibol</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Fecha
                    </Label>
                    <Input id="date" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">
                      Hora
                    </Label>
                    <Input id="time" type="time" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Guardar Reserva</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendario de Reservas</CardTitle>
            <CardDescription>Vista mensual de las reservas</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={new Date()}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}