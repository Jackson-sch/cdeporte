import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, Gift, Calendar } from "lucide-react"

export default function MembershipPage() {
  const membershipInfo = {
    plan: 'Premium',
    validUntil: '2023-12-31',
    daysLeft: 180,
    benefits: [
      '10% de descuento en reservas',
      'Acceso prioritario a canchas',
      '1 clase gratuita al mes',
      'Invitados con tarifa reducida',
    ],
    usageHistory: [
      { id: 1, date: '2023-07-01', activity: 'Reserva de Cancha de Tenis', discount: '10%' },
      { id: 2, date: '2023-06-15', activity: 'Clase gratuita', discount: '100%' },
      { id: 3, date: '2023-06-10', activity: 'Invitado con tarifa reducida', discount: '50%' },
    ]
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mi Membresía</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Plan Actual</CardTitle>
            <CardDescription>Detalles de tu membresía</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Badge variant="secondary" className="text-lg">{membershipInfo.plan}</Badge>
              <span className="text-sm text-muted-foreground">Válido hasta: {membershipInfo.validUntil}</span>
            </div>
            <Progress value={(membershipInfo.daysLeft / 365) * 100} className="mb-2" />
            <p className="text-sm text-muted-foreground mb-4">{membershipInfo.daysLeft} días restantes</p>
            <h4 className="font-semibold mb-2">Beneficios:</h4>
            <ul className="list-disc list-inside">
              {membershipInfo.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <CreditCard className="mr-2 h-4 w-4" /> Renovar Membresía
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historial de Uso</CardTitle>
            <CardDescription>Cómo has utilizado tu membresía</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Actividad</TableHead>
                  <TableHead>Descuento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {membershipInfo.usageHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.activity}</TableCell>
                    <TableCell>{item.discount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Invita a un Amigo</CardTitle>
            <CardDescription>Obtén beneficios por referidos</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Por cada amigo que se una, recibirás una semana gratis en tu membresía.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Gift className="mr-2 h-4 w-4" /> Invitar Amigo
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
            <CardDescription>Eventos exclusivos para miembros</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Torneo de Tenis - 15 de Agosto</span>
              </li>
              <li className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Clase Magistral de Fútbol - 22 de Agosto</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Ver Todos los Eventos</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}