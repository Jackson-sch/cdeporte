import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function SportsEquipment() {
  const [equipment, setEquipment] = useState([
    { id: 1, name: 'Balón de Fútbol', quantity: 20, category: 'Fútbol', status: 'Disponible' },
    { id: 2, name: 'Raqueta de Tenis', quantity: 10, category: 'Tenis', status: 'Disponible' },
    { id: 3, name: 'Balón de Baloncesto', quantity: 15, category: 'Baloncesto', status: 'Disponible' },
    { id: 4, name: 'Red de Voleibol', quantity: 2, category: 'Voleibol', status: 'En uso' },
    { id: 5, name: 'Conos', quantity: 30, category: 'General', status: 'Disponible' },
  ])

  const [newEquipment, setNewEquipment] = useState({ name: '', quantity: '', category: '', status: 'Disponible' })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewEquipment(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setNewEquipment(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = equipment.length + 1
    setEquipment([...equipment, { id, ...newEquipment, quantity: parseInt(newEquipment.quantity) }])
    setIsDialogOpen(false)
    setNewEquipment({ name: '', quantity: '', category: '', status: 'Disponible' })
  }

  const lowStockItems = equipment.filter(item => item.quantity < 5)

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Gestión de Equipos Deportivos</CardTitle>
        <CardDescription>Controle el inventario de equipos deportivos disponibles</CardDescription>
      </CardHeader>
      <CardContent>
        {lowStockItems.length > 0 && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Alerta de Stock Bajo</AlertTitle>
            <AlertDescription>
              Los siguientes artículos tienen un stock bajo: {lowStockItems.map(item => item.name).join(', ')}
            </AlertDescription>
          </Alert>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipment.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Agregar Equipo</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Equipo</DialogTitle>
              <DialogDescription>
                Ingrese los detalles del nuevo equipo deportivo
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={newEquipment.name}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Cantidad
                  </Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={newEquipment.quantity}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Categoría
                  </Label>
                  <Select name="category" onValueChange={(value) => handleSelectChange('category', value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fútbol">Fútbol</SelectItem>
                      <SelectItem value="Tenis">Tenis</SelectItem>
                      <SelectItem value="Baloncesto">Baloncesto</SelectItem>
                      <SelectItem value="Voleibol">Voleibol</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Estado
                  </Label>
                  <Select name="status" onValueChange={(value) => handleSelectChange('status', value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Disponible">Disponible</SelectItem>
                      <SelectItem value="En uso">En uso</SelectItem>
                      <SelectItem value="En mantenimiento">En mantenimiento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Agregar Equipo</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}