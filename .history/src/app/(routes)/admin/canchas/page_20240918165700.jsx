import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function AdminCourts() {
  const courts = [
    { id: 1, name: 'Cancha de Tenis 1', type: 'Tenis', status: 'Disponible', maintenanceDate: '2023-08-15' },
    { id: 2, name: 'Cancha de Fútbol A', type: 'Fútbol', status: 'En mantenimiento', maintenanceDate: '2023-07-20' },
    { id: 3, name: 'Cancha de Baloncesto 2', type: 'Baloncesto', status: 'Disponible', maintenanceDate: '2023-09-01' },
    { id: 4, name: 'Cancha de Voleibol', type: 'Voleibol', status: 'Disponible', maintenanceDate: '2023-08-30' },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gestión de Canchas</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Listado de Canchas</CardTitle>
          <CardDescription>Administra las canchas disponibles en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Próximo Mantenimiento</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courts.map((court) => (
                <TableRow key={court.id}>
                  <TableCell>{court.name}</TableCell>
                  <TableCell>{court.type}</TableCell>
                  <TableCell>
                    <Badge variant={court.status === 'Disponible' ? 'default' : 'secondary'}>
                      {court.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{court.maintenanceDate}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2">Editar</Button>
                    <Button variant="destructive" size="sm">Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Agregar Nueva Cancha</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Agregar Nueva Cancha</DialogTitle>
                <DialogDescription>
                  Ingresa los detalles de la nueva cancha a agregar al sistema.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nombre
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Tipo
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tenis">Tenis</SelectItem>
                      <SelectItem value="futbol">Fútbol</SelectItem>
                      <SelectItem value="baloncesto">Baloncesto</SelectItem>
                      <SelectItem value="voleibol">Voleibol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="maintenance" className="text-right">
                    Próximo Mantenimiento
                  </Label>
                  <Input id="maintenance" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Disponible
                  </Label>
                  <Switch id="status" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Guardar Cancha</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}