import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AdminMemberships() {
  const membershipPlans = [
    { id: 1, name: "Básico", price: 500, duration: "1 mes", features: ["Acceso a canchas", "Descuento 5% en reservas"], status: "Activo" },
    { id: 2, name: "Premium", price: 1000, duration: "3 meses", features: ["Acceso a canchas", "Descuento 10% en reservas", "Acceso prioritario"], status: "Activo" },
    { id: 3, name: "VIP", price: 2500, duration: "6 meses", features: ["Acceso ilimitado a canchas", "Descuento 20% en reservas", "Acceso prioritario", "Entrenador personal"], status: "Inactivo" },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gestión de Membresías</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Planes de Membresía</CardTitle>
          <CardDescription>Administra los planes de membresía disponibles</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Duración</TableHead>
                <TableHead>Características</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {membershipPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>{plan.name}</TableCell>
                  <TableCell>${plan.price}</TableCell>
                  <TableCell>{plan.duration}</TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside">
                      {plan.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <Badge variant={plan.status === 'Activo' ? 'default' : 'secondary'}>
                      {plan.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2">Editar</Button>
                    <Button variant="destructive" size="sm">Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Agregar Nuevo Plan</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Plan de Membresía</DialogTitle>
                <DialogDescription>
                  Ingresa los detalles del nuevo plan de membresía.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nombre
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Precio
                  </Label>
                  <Input id="price" type="number" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Duración
                  </Label>
                  <Input id="duration" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="features" className="text-right">
                    Características
                  </Label>
                  <Textarea id="features" className="col-span-3" placeholder="Una característica por línea" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Guardar Plan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}