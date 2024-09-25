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

export default function AdminMaintenance() {
  const maintenanceTasks = [
    { id: 1, court: "Cancha de Tenis 1", task: "Reparación de red", date: "2023-07-20", status: "Pendiente" },
    { id: 2, court: "Cancha de Fútbol A", task: "Corte de césped", date: "2023-07-18", status: "Completado" },
    { id: 3, court: "Cancha de Baloncesto 2", task: "Pintura de líneas", date: "2023-07-25", status: "Programado" },
    { id: 4, court: "Cancha de Voleibol", task: "Reemplazo de postes", date: "2023-07-22", status: "En progreso" },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mantenimiento de Canchas</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Tareas de Mantenimiento</CardTitle>
            <CardDescription>Gestiona las tareas de mantenimiento de las canchas</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cancha</TableHead>
                  <TableHead>Tarea</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenanceTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.court}</TableCell>
                    <TableCell>{task.task}</TableCell>
                    <TableCell>{task.date}</TableCell>
                    <TableCell>
                      <Badge variant={
                        task.status === 'Completado' ? 'default' :
                        task.status === 'En progreso' ? 'secondary' :
                        task.status === 'Pendiente' ? 'destructive' :
                        'outline'
                      }>
                        {task.status}
                      </Badge>
                    </TableCell>
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
                <Button>Agregar Tarea de Mantenimiento</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Agregar Tarea de Mantenimiento</DialogTitle>
                  <DialogDescription>
                    Ingresa los detalles de la nueva tarea de mantenimiento.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
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
                    <Label htmlFor="task" className="text-right">
                      Tarea
                    </Label>
                    <Input id="task" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Fecha
                    </Label>
                    <Input id="date" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Estado
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                        <SelectItem value="en-progreso">En progreso</SelectItem>
                        <SelectItem value="completado">Completado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Guardar Tarea</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendario de Mantenimiento</CardTitle>
            <CardDescription>Vista mensual de las tareas de mantenimiento</CardDescription>
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