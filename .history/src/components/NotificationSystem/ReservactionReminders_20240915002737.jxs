import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export default function ReservationReminders() {
  const [reminders, setReminders] = useState([
    { id: 1, reservationId: 'RES001', type: 'Correo', sendBefore: '1 día', status: 'Activo' },
    { id: 2, reservationId: 'RES002', type: 'SMS', sendBefore: '2 horas', status: 'Inactivo' },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newReminder, setNewReminder] = useState({
    reservationId: '',
    type: '',
    sendBefore: '',
    isActive: true
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewReminder(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setNewReminder(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = reminders.length + 1
    const status = newReminder.isActive ? 'Activo' : 'Inactivo'
    setReminders([...reminders, { id, ...newReminder, status }])
    setIsDialogOpen(false)
    setNewReminder({
      reservationId: '',
      type: '',
      sendBefore: '',
      isActive: true
    })
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Recordatorios de Reserva</CardTitle>
        <CardDescription>Configure recordatorios automáticos para las reservas</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID de Reserva</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Enviar Antes</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reminders.map((reminder) => (
              <TableRow key={reminder.id}>
                <TableCell>{reminder.reservationId}</TableCell>
                <TableCell>{reminder.type}</TableCell>
                <TableCell>{reminder.sendBefore}</TableCell>
                <TableCell>{reminder.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Configurar Recordatorio</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Configurar Nuevo Recordatorio</DialogTitle>
              <DialogDescription>
                Configure un nuevo recordatorio para una reserva
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="reservationId" className="text-right">
                    ID de Reserva
                  </Label>
                  <Input
                    id="reservationId"
                    name="reservationId"
                    value={newReminder.reservationId}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Tipo
                  </Label>
                  <Select name="type" onValueChange={(value) => handleSelectChange('type', value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Correo">Correo</SelectItem>
                      <SelectItem value="SMS">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sendBefore" className="text-right">
                    Enviar Antes
                  </Label>
                  <Select name="sendBefore" onValueChange={(value) => handleSelectChange('sendBefore', value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione cuándo enviar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 hora">1 hora</SelectItem>
                      <SelectItem value="2 horas">2 horas</SelectItem>
                      <SelectItem value="1 día">1 día</SelectItem>
                      <SelectItem value="2 días">2 días</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    name="isActive"
                    checked={newReminder.isActive}
                    onCheckedChange={(checked) => handleSelectChange('isActive', checked)}
                  />
                  <Label htmlFor="isActive">Activar Recordatorio</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Configurar Recordatorio</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}