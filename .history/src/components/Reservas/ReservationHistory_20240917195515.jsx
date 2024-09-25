'0use client'
import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export default function ReservationHistory() {
  const [reservations, setReservations] = useState([
    { id: 1, court: "Cancha de Fútbol 1", date: "2023-06-01", time: "10:00", status: "Confirmada" },
    { id: 2, court: "Cancha de Tenis A", date: "2023-06-05", time: "11:00", status: "Pendiente" },
    { id: 3, court: "Cancha de Baloncesto Central", date: "2023-06-10", time: "12:00", status: "Pendiente" },
  ])

  const [selectedReservation, setSelectedReservation] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCancel = (id) => {
    setReservations(reservations.map(res => 
      res.id === id ? { ...res, status: "Cancelada" } : res
    ))
    setIsDialogOpen(false)
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Historial de Reservas</CardTitle>
        <CardDescription>Vea y gestione sus reservas pasadas y futuras</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cancha</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.court}</TableCell>
                <TableCell>{reservation.date}</TableCell>
                <TableCell>{reservation.time}</TableCell>
                <TableCell>{reservation.status}</TableCell>
                <TableCell>
                  {reservation.status === "Pendiente" && (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="destructive" siz onClick={() => setSelectedReservation(reservation)}>
                          Cancelar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirmar Cancelación</DialogTitle>
                          <DialogDescription>
                            ¿Está seguro que desea cancelar esta reserva?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            No, mantener reserva
                          </Button>
                          <Button variant="destructive" onClick={() => handleCancel(selectedReservation.id)}>
                            Sí, cancelar reserva
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}