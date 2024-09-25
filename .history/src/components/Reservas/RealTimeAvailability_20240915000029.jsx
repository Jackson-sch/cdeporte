'use client'
import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function RealTimeAvailability() {
  const [availability, setAvailability] = useState([])

  useEffect(() => {
    // Simulación de actualización en tiempo real
    const interval = setInterval(() => {
      const newAvailability = [
        { id: 1, court: "Cancha de Fútbol 1", time: "10:00", status: Math.random() > 0.5 ? "Disponible" : "Ocupado" },
        { id: 2, court: "Cancha de Tenis A", time: "11:00", status: Math.random() > 0.5 ? "Disponible" : "Ocupado" },
        { id: 3, court: "Cancha de Baloncesto Central", time: "12:00", status: Math.random() > 0.5 ? "Disponible" : "Ocupado" },
      ]
      setAvailability(newAvailability)
    }, 5000) // Actualiza cada 5 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Disponibilidad en Tiempo Real</CardTitle>
        <CardDescription>Vea la disponibilidad actual de las canchas</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cancha</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {availability.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.court}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>
                  <Badge variant={item.status === "Disponible" ? "success" : "destructive"}>
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}