import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"

export default function MaintenanceSchedule() {
  const [schedules, setSchedules] = useState([
    { id: 1, date: '2023-07-01', court: 'Cancha de Fútbol 1', type: 'Preventivo' },
    { id: 2, date: '2023-07-15', court: 'Cancha de Tenis A', type: 'Preventivo' },
    { id: 3, date: '2023-07-30', court: 'Cancha de Baloncesto Central', type: 'Correctivo' },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newSchedule, setNewSchedule] = useState({ date: new Date(), court: '', type: '' })

  const handleSelectChange = (name, value) => {
    setNewSchedule(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = schedules.length + 1
    setSchedules([...schedules, { id, ...newSchedule, date: newSchedule.date.toISOString().split('T')[0] }])
    setIsDialogOpen(false)
    setNewSchedule({ date: new Date(), court: '', type: '' })
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Programación de Mantenimiento</CardTitle>
        <CardDescription>Calendario de mantenimientos programados</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Cancha</TableHead>
              <TableHead>Tipo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell>{schedule.date}</TableCell>
                <TableCell>{schedule.court}</TableCell>
                <TableCell>{schedule.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Programar Mantenimiento</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Programar Nuevo Mantenimiento</DialogTitle>
              <DialogDescription>
                Seleccione la fecha, cancha y tipo de mantenimiento
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Fecha
                  </Label>
                  <Calendar
                    mode="single"
                    selected={newSchedule.date}
                    onSelect={(date) => setNewSchedule(prev => ({ ...prev, date }))}
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
              </div>
              <DialogFooter>
                <Button type="submit">Guardar Programación</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}