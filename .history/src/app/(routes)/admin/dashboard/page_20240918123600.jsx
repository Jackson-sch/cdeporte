import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalendarDays, Users, DollarSign, Activity } from "lucide-react"
import { ChartContainer } from '@/components/ui/chart'

export default function AdminDashboard() {
  const stats = [
    { title: "Reservas Hoy", value: 24, icon: CalendarDays },
    { title: "Usuarios Activos", value: 573, icon: Users },
    { title: "Ingresos del Mes", value: "$12,450", icon: DollarSign },
    { title: "Tasa de Ocupación", value: "78%", icon: Activity },
  ]

  const recentReservations = [
    { id: 1, user: "María González", court: "Cancha de Tenis 1", date: "2023-07-15", time: "14:00 - 15:00", status: "Confirmada" },
    { id: 2, user: "Carlos Rodríguez", court: "Cancha de Fútbol A", date: "2023-07-15", time: "16:00 - 17:00", status: "Pendiente" },
    { id: 3, user: "Ana Martínez", court: "Cancha de Baloncesto 2", date: "2023-07-16", time: "10:00 - 11:00", status: "Confirmada" },
  ]

  const reservationData = [
    { name: 'Lun', reservas: 12 },
    { name: 'Mar', reservas: 19 },
    { name: 'Mié', reservas: 15 },
    { name: 'Jue', reservas: 22 },
    { name: 'Vie', reservas: 25 },
    { name: 'Sáb', reservas: 30 },
    { name: 'Dom', reservas: 18 },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard del Administrador</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Reservas Recientes</CardTitle>
            <CardDescription>Últimas reservas realizadas en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Cancha</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell>{reservation.user}</TableCell>
                    <TableCell>{reservation.court}</TableCell>
                    <TableCell>{`${reservation.date} ${reservation.time}`}</TableCell>
                    <TableCell>
                      <Badge variant={reservation.status === 'Confirmada' ? 'default' : 'secondary'}>
                        {reservation.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button className="w-full mt-4">Ver Todas las Reservas</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reservas por Día</CardTitle>
            <CardDescription>Número de reservas en la última semana</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={reservationData} width="100%" height={300}>
              <BarChart data={reservationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reservas" fill="#8884d8" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}