
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

export default function CourtStatus() {
  const [courts, setCourts] = useState([
    { id: 1, name: 'Cancha de Fútbol 1', type: 'Fútbol', isAvailable: true, isInMaintenance: false },
    { id: 2, name: 'Cancha de Tenis A', type: 'Tenis', isAvailable: true, isInMaintenance: false },
    { id: 3, name: 'Cancha de Baloncesto Central', type: 'Baloncesto', isAvailable: false, isInMaintenance: true },
  ])

  const toggleAvailability = (id) => {
    setCourts(courts.map(court => 
      court.id === id ? { ...court, isAvailable: !court.isAvailable } : court
    ))
  }

  const toggleMaintenance = (id) => {
    setCourts(courts.map(court => 
      court.id === id ? { ...court, isInMaintenance: !court.isInMaintenance, isAvailable: court.isInMaintenance } : court
    ))
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Estado de las Canchas</CardTitle>
        <CardDescription>Gestione la disponibilidad y el mantenimiento de las canchas.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Disponibilidad</TableHead>
              <TableHead>Mantenimiento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courts.map((court) => (
              <TableRow key={court.id}>
                <TableCell>{court.name}</TableCell>
                <TableCell>{court.type}</TableCell>
                <TableCell>
                  <Badge variant={court.isAvailable ? "success" : "destructive"}>
                    {court.isAvailable ? "Disponible" : "No Disponible"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={court.isAvailable}
                    onCheckedChange={() => toggleAvailability(court.id)}
                    disabled={court.isInMaintenance}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={court.isInMaintenance}
                    onCheckedChange={() => toggleMaintenance(court.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}