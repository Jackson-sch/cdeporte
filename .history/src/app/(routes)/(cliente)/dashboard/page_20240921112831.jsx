
import { auth } from '@/auth'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bell } from "lucide-react"

export default async function ClientDashboard() {
  const session
  // En una implementación real, estos datos vendrían de una API o base de datos
  const upcomingReservations = [
    { id: 1, court: 'Cancha de Tenis 1', date: '2023-07-15', time: '14:00 - 15:00' },
    { id: 2, court: 'Cancha de Fútbol A', date: '2023-07-18', time: '18:00 - 19:00' },
  ]

  const membershipInfo = {
    plan: 'Premium',
    validUntil: '2023-12-31',
    benefits: ['10% de descuento en reservas', 'Acceso prioritario'],
  }

  const recentPayments = [
    { id: 1, date: '2023-07-01', amount: 1000, concept: 'Membresía Premium' },
    { id: 2, date: '2023-06-15', amount: 200, concept: 'Reserva de cancha' },
  ]

  const favoriteCourts = [
    { id: 1, name: 'Cancha de Tenis 1', reservations: 15 },
    { id: 2, name: 'Cancha de Fútbol A', reservations: 8 },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard del Cliente</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Próximas Reservas</CardTitle>
            <CardDescription>Tus próximas reservas de canchas</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cancha</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Hora</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingReservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell>{reservation.court}</TableCell>
                    <TableCell>{reservation.date}</TableCell>
                    <TableCell>{reservation.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button className="mt-4">Ver todas las reservas</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tu Membresía</CardTitle>
            <CardDescription>Detalles de tu plan actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <Badge variant="secondary" className="mr-2">{membershipInfo.plan}</Badge>
              <span className="text-sm text-muted-foreground">Válido hasta: {membershipInfo.validUntil}</span>
            </div>
            <h4 className="font-semibold mb-2">Beneficios:</h4>
            <ul className="list-disc list-inside">
              {membershipInfo.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
            <Button className="mt-4">Gestionar membresía</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pagos Recientes</CardTitle>
            <CardDescription>Tus últimas transacciones</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Concepto</TableHead>
                  <TableHead>Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.concept}</TableCell>
                    <TableCell>${payment.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button className="mt-4">Ver historial completo</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tus Canchas Favoritas</CardTitle>
            <CardDescription>Las canchas que más reservas</CardDescription>
          </CardHeader>
          <CardContent>
            {favoriteCourts.map((court) => (
              <div key={court.id} className="flex items-center justify-between mb-2">
                <span>{court.name}</span>
                <Badge variant="secondary">{court.reservations} reservas</Badge>
              </div>
            ))}
            <Button className="mt-4">Ver todas las canchas</Button>
          </CardContent>
        </Card>
      </div>

      <Alert className="mt-6">
        <Bell className="h-4 w-4" />
        <AlertTitle>Notificación Importante</AlertTitle>
        <AlertDescription>
          Hay mantenimiento programado para la Cancha de Tenis 2 el próximo fin de semana. Por favor, considera esto al hacer tus reservas.
        </AlertDescription>
      </Alert>
    </div>
  )
}