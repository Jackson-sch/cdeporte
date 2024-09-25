import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { CalendarDays, Check, X } from "lucide-react"

export default function GoogleCalendarIntegration() {
  const [reservations, setReservations] = useState([
    { id: 1, court: 'Cancha de Fútbol 1', date: '2023-07-01', time: '10:00 - 11:00', synced: true },
    { id: 2, court: 'Cancha de Tenis A', date: '2023-07-02', time: '15:00 - 16:00', synced: false },
    { id: 3, court: 'Cancha de Baloncesto Central', date: '2023-07-03', time: '18:00 - 19:00', synced: true },
  ])

  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = () => {
    // En una implementación real, aquí se manejaría la autenticación con Google
    setIsConnected(true)
  }

  const handleDisconnect = () => {
    // En una implementación real, aquí se manejaría la desconexión de Google
    setIsConnected(false)
  }

  const handleSyncToggle = (id) => {
    setReservations(reservations.map(reservation =>
      reservation.id === id ? { ...reservation, synced: !reservation.synced } : reservation
    ))
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Integración con Google Calendar</CardTitle>
        <CardDescription>Sincronice sus reservas con Google Calendar</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Switch
            id="airplane-mode"
            checked={isConnected}
            onCheckedChange={isConnected ? handleDisconnect : handleConnect}
          />
          <Label htmlFor="airplane-mode">Conectado a Google Calendar</Label>
        </div>
        {isConnected && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cancha</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Sincronizado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.court}</TableCell>
                  <TableCell>{reservation.date}</TableCell>
                  <TableCell>{reservation.time}</TableCell>
                  <TableCell>{reservation.synced ? <Check className="text-green-500" /> : <X className="text-red-500" />}</TableCell>
                  <TableCell>
                    <Switch
                      checked={reservation.synced}
                      onCheckedChange={() => handleSyncToggle(reservation.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={() => console.log('Sincronizar todas las reservas')} disabled={!isConnected}>
          <CalendarDays className="mr-2 h-4 w-4" /> Sincronizar Todas las Reservas
        </Button>
      </CardFooter>
    </Card>
  )
}