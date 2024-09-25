import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, CreditCard, User } from "lucide-react"

export default function MemberBenefits() {
  const [activeMemberships, setActiveMemberships] = useState([
    { id: 1, user: 'Juan Pérez', plan: 'Premium', startDate: '2023-06-01', endDate: '2023-07-01', status: 'Activa' },
    { id: 2, user: 'María González', plan: 'VIP', startDate: '2023-05-15', endDate: '2023-08-15', status: 'Activa' },
    { id: 3, user: 'Carlos Rodríguez', plan: 'Básico', startDate: '2023-07-01', endDate: '2023-08-01', status: 'Pendiente' },
  ])

  const [newMembership, setNewMembership] = useState({ user: '', plan: '', startDate: '', endDate: '' })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewMembership(prev => ({ ...prev, [name]: value }))
  }

  const handleAddMembership = () => {
    const id = activeMemberships.length + 1
    setActiveMemberships([...activeMemberships, { id, ...newMembership, status: 'Activa' }])
    setIsDialogOpen(false)
    setNewMembership({ user: '', plan: '', startDate: '', endDate: '' })
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Beneficios para Miembros</CardTitle>
        <CardDescription>Gestione las membresías activas y sus beneficios</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="memberships">
          <TabsList>
            <TabsTrigger value="memberships">Membresías Activas</TabsTrigger>
            <TabsTrigger value="benefits">Beneficios Disponibles</TabsTrigger>
          </TabsList>
          <TabsContent value="memberships">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Fecha de Inicio</TableHead>
                  <TableHead>Fecha de Fin</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeMemberships.map((membership) => (
                  <TableRow key={membership.id}>
                    <TableCell>{membership.user}</TableCell>
                    <TableCell>{membership.plan}</TableCell>
                    <TableCell>{membership.startDate}</TableCell>
                    <TableCell>{membership.endDate}</TableCell>
                    <TableCell>{membership.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="benefits">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Descuentos en Reservas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Los miembros disfrutan de descuentos exclusivos en las reservas de canchas:</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Plan Básico: 5% de descuento</li>
                    <li>Plan Premium: 10% de descuento</li>
                    <li>Plan VIP: 20% de descuento</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Acceso Prioritario</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Los miembros Premium y VIP tienen acceso prioritario a las reservas de canchas en horarios de alta demanda.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Entrenador Personal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Los miembros VIP tienen acceso a sesiones con un entrenador personal una vez al mes.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Agregar Nueva Membresía</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nueva Membresía</DialogTitle>
              <DialogDescription>
                Ingrese los detalles de la nueva membresía
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user" className="text-right">
                  Usuario
                </Label>
                <Input
                  id="user"
                  name="user"
                  value={newMembership.user}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plan" className="text-right">
                  Plan
                </Label>
                <Select
                  name="plan"
                  value={newMembership.plan}
                  onValueChange={(value) => setNewMembership(prev => ({ ...prev, plan: value }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccione un plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Básico">Básico</SelectItem>
                    <Select

Item value="Premium">Premium</SelectItem>
                    <SelectItem value="VIP">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  Fecha de Inicio
                </Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={newMembership.startDate}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">
                  Fecha de Fin
                </Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={newMembership.endDate}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddMembership}>Agregar Membresía</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}