import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Check, X } from "lucide-react"

export default function MembershipPlans() {
  const [plans, setPlans] = useState([
    { id: 1, name: 'Básico', price: 500, duration: 'Mensual', benefits: ['Acceso a canchas', 'Descuento 5% en reservas'], active: true },
    { id: 2, name: 'Premium', price: 1000, duration: 'Mensual', benefits: ['Acceso a canchas', 'Descuento 10% en reservas', 'Acceso prioritario'], active: true },
    { id: 3, name: 'VIP', price: 2500, duration: 'Trimestral', benefits: ['Acceso ilimitado a canchas', 'Descuento 20% en reservas', 'Acceso prioritario', 'Entrenador personal'], active: true },
  ])

  const [newPlan, setNewPlan] = useState({ name: '', price: '', duration: 'Mensual', benefits: '' })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewPlan(prev => ({ ...prev, [name]: value }))
  }

  const handleAddPlan = () => {
    const id = plans.length + 1
    const benefitsArray = newPlan.benefits.split(',').map(benefit => benefit.trim())
    setPlans([...plans, { id, ...newPlan, benefits: benefitsArray, active: true }])
    setIsDialogOpen(false)
    setNewPlan({ name: '', price: '', duration: 'Mensual', benefits: '' })
  }

  const togglePlanStatus = (id) => {
    setPlans(plans.map(plan => 
      plan.id === id ? { ...plan, active: !plan.active } : plan
    ))
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Planes de Membresía</CardTitle>
        <CardDescription>Gestione los planes de membresía disponibles</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Duración</TableHead>
              <TableHead>Beneficios</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell>{plan.name}</TableCell>
                <TableCell>${plan.price}</TableCell>
                <TableCell>{plan.duration}</TableCell>
                <TableCell>
                  <ul className="list-disc list-inside">
                    {plan.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  {plan.active ? (
                    <span className="flex items-center text-green-500">
                      <Check className="mr-2 h-4 w-4" /> Activo
                    </span>
                  ) : (
                    <span className="flex items-center text-red-500">
                      <X className="mr-2 h-4 w-4" /> Inactivo
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={plan.active}
                    onCheckedChange={() => togglePlanStatus(plan.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Agregar Nuevo Plan</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Plan de Membresía</DialogTitle>
              <DialogDescription>
                Ingrese los detalles del nuevo plan de membresía
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newPlan.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Precio
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={newPlan.price}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duración
                </Label>
                <Select
                  name="duration"
                  value={newPlan.duration}
                  onValueChange={(value) => setNewPlan(prev => ({ ...prev, duration: value }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccione la duración" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mensual">Mensual</SelectItem>
                    <SelectItem value="Trimestral">Trimestral</SelectItem>
                    <SelectItem value="Anual">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="benefits" className="text-right">
                  Beneficios
                </Label>
                <Input
                  id="benefits"
                  name="benefits"
                  value={newPlan.benefits}
                  onChange={handleInputChange}
                  placeholder="Separar beneficios por comas"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddPlan}>Agregar Plan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}