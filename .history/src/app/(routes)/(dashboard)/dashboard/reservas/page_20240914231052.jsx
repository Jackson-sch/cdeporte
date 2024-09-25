'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
/* import { useSession } from 'next-auth/react' */
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'

export default function NewReservationPage() {
  const router = useRouter()
  /* const { data: session } = useSession() */
  /* const { fieldId } = router.query */
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Aquí deberías implementar la lógica para crear una nueva reserva
    // utilizando los datos del formulario y el fieldId
    console.log('Crear reserva para:', { fieldId, date, time })
    // Después de crear la reserva, redirige al usuario a la página de reservas
    router.push('/reservations')
  }

  /* if (!session) {
    return <p>Debes iniciar sesión para hacer una reserva.</p>
  } */

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Nueva Reserva</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">Fecha</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">Hora</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit">Crear Reserva</Button>
        </CardFooter>
      </Card>
    </div>
  )
}