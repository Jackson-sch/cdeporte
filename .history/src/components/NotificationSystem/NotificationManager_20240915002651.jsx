'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export default function NotificationManager() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'Correo', subject: 'Confirmación de Reserva', message: 'Su reserva ha sido confirmada.', scheduled: '2023-07-01 10:00', status: 'Enviado' },
    { id: 2, type: 'SMS', subject: 'Recordatorio', message: 'Recordatorio: Su reserva es mañana.', scheduled: '2023-07-05 09:00', status: 'Pendiente' },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newNotification, setNewNotification] = useState({
    type: '',
    subject: '',
    message: '',
    scheduled: '',
    sendImmediately: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewNotification(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSelectChange = (name, value) => {
    setNewNotification(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = notifications.length + 1
    const status = newNotification.sendImmediately ? 'Enviado' : 'Pendiente'
    setNotifications([...notifications, { id, ...newNotification, status }])
    setIsDialogOpen(false)
    setNewNotification({
      type: '',
      subject: '',
      message: '',
      scheduled: '',
      sendImmediately: false
    })
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Gestor de Notificaciones</CardTitle>
        <CardDescription>Administre y envíe notificaciones a los usuarios</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Asunto</TableHead>
              <TableHead>Programado para</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>{notification.type}</TableCell>
                <TableCell>{notification.subject}</TableCell>
                <TableCell>{notification.scheduled}</TableCell>
                <TableCell>{notification.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Crear Notificación</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Crear Nueva Notificación</DialogTitle>
              <DialogDescription>
                Complete los detalles para crear una nueva notificación
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
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
                  <Label htmlFor="subject" className="text-right">
                    Asunto
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={newNotification.subject}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="message" className="text-right">
                    Mensaje
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={newNotification.message}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="scheduled" className="text-right">
                    Programado para
                  </Label>
                  <Input
                    id="scheduled"
                    name="scheduled"
                    type="datetime-local"
                    value={newNotification.scheduled}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="sendImmediately"
                    name="sendImmediately"
                    checked={newNotification.sendImmediately}
                    onCheckedChange={(checked) => handleSelectChange('sendImmediately', checked)}
                  />
                  <Label htmlFor="sendImmediately">Enviar inmediatamente</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Crear Notificación</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}