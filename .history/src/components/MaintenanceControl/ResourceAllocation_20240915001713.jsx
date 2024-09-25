'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export default function ResourceAllocation() {
  const [allocations, setAllocations] = useState([
    { id: 1, date: '2023-07-01', court: 'Cancha de Fútbol 1', staff: 'Juan Pérez', equipment: 'Kit de limpieza' },
    { id: 2, date: '2023-07-15', court: 'Cancha de Tenis A', staff: 'María González', equipment: 'Herramientas de reparación' },
    { id: 3, date: '2023-07-30', court: 'Cancha de Baloncesto Central', staff: 'Carlos Rodríguez', equipment: 'Equipo de pintura' },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newAllocation, setNewAllocation] = useState({ date: '', court: '', staff: '', equipment: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewAllocation(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setNewAllocation(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = allocations.length + 1
    setAllocations([...allocations, { id, ...newAllocation }])
    setIsDialogOpen(false)
    setNewAllocation({ date: '', court: '', staff: '', equipment: '' })
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Asignación de Recursos</CardTitle>
        <CardDescription>Gestione la asignación de personal y equipos para mantenimiento</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Cancha</TableHead>
              <TableHead>Personal</TableHead>
              <TableHead>Equipo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allocations.map((allocation) => (
              <TableRow key={allocation.id}>
                <TableCell>{allocation.date}</TableCell>
                <TableCell>{allocation.court}</TableCell>
                <TableCell>{allocation.staff}</TableCell>
                <TableCell>{allocation.equipment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Asignar Recursos</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Asignar Recursos para Mantenimiento</DialogTitle>
              <DialogDescription>
                Ingrese los detalles de la asignación de recursos
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
                    value={newAllocation.date}
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
                  <Label htmlFor="staff" className="text-right">
                    Personal
                  </Label>
                  <Select name="staff" onValueChange={(value) => handleSelectChange('staff', value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione el personal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Juan Pérez">Juan Pérez</SelectItem>
                      <SelectItem value="María González">María González</SelectItem>
                      <SelectItem value="Carlos Rodríguez">Carlos Rodríguez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="equipment" className="text-right">
                    Equipo
                  </Label>
                  <Select name="equipment" onValueChange={(value) => handleSelectChange('equipment', value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione el equipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kit de limpieza">Kit de limpieza</SelectItem>
                      <SelectItem value="Herramientas de reparación">Herramientas de reparación</SelectItem>
                      <SelectItem value="Equipo de pintura">Equipo de pintura</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Guardar Asignación</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}