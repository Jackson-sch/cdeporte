import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star } from 'lucide-react'

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
    </div>
  )
}

export default function CourtRatings() {
  const [courtRatings, setCourtRatings] = useState([
    { id: 1, name: 'Cancha de Fútbol 1', averageRating: 4.2, totalReviews: 15 },
    { id: 2, name: 'Cancha de Tenis A', averageRating: 4.8, totalReviews: 10 },
    { id: 3, name: 'Cancha de Baloncesto Central', averageRating: 3.9, totalReviews: 8 },
    { id: 4, name: 'Cancha de Voleibol', averageRating: 4.5, totalReviews: 6 },
    { id: 5, name: 'Cancha de Fútbol 2', averageRating: 4.0, totalReviews: 12 },
  ])

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Calificaciones de Canchas</CardTitle>
        <CardDescription>Resumen de las calificaciones de todas las canchas</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre de la Cancha</TableHead>
              <TableHead>Calificación Promedio</TableHead>
              <TableHead>Total de Reseñas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courtRatings.map((court) => (
              <TableRow key={court.id}>
                <TableCell>{court.name}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <StarRating rating={Math.round(court.averageRating)} />
                    <span>{court.averageRating.toFixed(1)}</span>
                  </div>
                </TableCell>
                <TableCell>{court.totalReviews}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}