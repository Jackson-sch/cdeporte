import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function FieldsPage() {
  const [fields, setFields] = useState([])

  useEffect(() => {
    // Aquí deberías hacer una llamada a tu API para obtener las canchas
    // Este es solo un ejemplo de datos
    setFields([
      { _id: '1', name: 'Cancha 1', type: 'Fútbol', capacity: 22 },
      { _id: '2', name: 'Cancha 2', type: 'Tenis', capacity: 4 },
    ])
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Canchas Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((field) => (
          <Card key={field._id}>
            <CardHeader>
              <CardTitle>{field.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Tipo: {field.type}</p>
              <p>Capacidad: {field.capacity}</p>
              <Link href={`/reservations/new?fieldId=${field._id}`}>
                <Button className="mt-2">Reservar</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}