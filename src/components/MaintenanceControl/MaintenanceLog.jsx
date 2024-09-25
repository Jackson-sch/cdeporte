'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export default function MaintenanceLog() {
  const [logs, setLogs] = useState([
    { id: 1, date: '2023-06-01', court: 'Cancha de Fútbol 1', type: 'Preventivo', description: 'Revisión general' },
    { id: 2, date: '2023-06-05', court: 'Cancha de Tenis A', type: 'Correctivo', description: 'Reparación de red' },
    { id: 3, date: '2023-06-10', court: 'Cancha de Baloncesto Central', type: 'Preventivo', description: 'Limpieza profunda' },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newLog, setNewLog] = useState({ date: '', court: '', type: '', description: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewLog(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setNewLog(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = logs.length + 1
    setLogs([...logs, { id, ...newLog }])
    setIsDialogOpen(false)
    setNewLog({ date: '', court: '', type: '', description: '' })
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Registro de Mantenimiento</CardTitle>
        <CardDescription>Historial de mantenimientos realizados en las canchas</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Cancha</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Descripción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.date}</TableCell>
                <TableCell>{log.court}</TableCell>
                <TableCell>{log.type}</TableCell>
                <TableCell>{log.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Agregar Registro</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nuevo Registro de Mantenimiento</DialogTitle>
              <DialogDescription>
                Ingrese los detalles del mantenimiento realizado
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Fecha
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={newLog.date}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="court" className="text-right">
                    Cancha
                  </Label>
                  <Select name="court" onValueChange={(value) => handleSelectChange('court', value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione una cancha" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cancha de Fútbol 1">Cancha de Fútbol 1</SelectItem>
                      <SelectItem value="Cancha de Tenis A">Cancha de Tenis A</SelectItem>
                      <SelectItem value="Cancha de Baloncesto Central">Cancha de Baloncesto Central</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Tipo
                  </Label>
                  <Select name="type" onValueChange={(value) => handleSelectChange('type', value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Preventivo">Preventivo</SelectItem>
                      <SelectItem value="Correctivo">Correctivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Descripción
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newLog.description}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Guardar Registro</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}