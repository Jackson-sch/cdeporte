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

export default function MaintenanceMaterial() {
  const [materials, setMaterials] = useState([
    { id: 1, name: 'Pintura para líneas', quantity: 5, unit: 'Galones', category: 'Pintura', lastUsed: '2023-06-15' },
    { id: 2, name: 'Fertilizante', quantity: 20, unit: 'Kg', category: 'Jardinería', lastUsed: '2023-06-10' },
    { id: 3, name: 'Herramientas de jardinería', quantity: 3, unit: 'Sets', category: 'Jardinería', lastUsed: '2023-06-12' },
    { id: 4, name: 'Redes de repuesto', quantity: 2, unit: 'Unidades', category: 'Equipamiento', lastUsed: '2023-05-30' },
    { id: 5, name: 'Productos de limpieza', quantity: 10, unit: 'Litros', category: 'Limpieza', lastUsed: '2023-06-18' },
  ])

  const [newMaterial, setNewMaterial] = useState({ name: '', quantity: '', unit: '', category: '', lastUsed: '' })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewMaterial(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setNewMaterial(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = materials.length + 1
    setMaterials([...materials, { id, ...newMaterial, quantity: parseInt(newMaterial.quantity) }])
    setIsDialogOpen(false)
    setNewMaterial({ name: '', quantity: '', unit: '', category: '', lastUsed: '' })
  }

  const lowStockItems = materials.filter(item => item.quantity < 3)

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Gestión de Material de Mantenimiento</CardTitle>
        <CardDescription>Controle el inventario de materiales para mantenimiento de instalaciones</CardDescription>
      </CardHeader>
      <CardContent>
        {lowStockItems.length > 0 && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Alerta de Stock Bajo</AlertTitle>
            <AlertDescription>
              Los siguientes materiales tienen un stock bajo: {lowStockItems.map(item => item.name).join(', ')}
            </AlertDescription>
          </Alert>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Unidad</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Último Uso</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.lastUsed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Agregar Material</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Material</DialogTitle>
              <DialogDescription>
                Ingrese los detalles del nuevo material de mantenimiento
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
                    value={newMaterial.name}
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
                    value={newMaterial.quantity}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="unit" className="text-right">
                    Unidad
                  </Label>
                  <Input
                    id="unit"
                    name="unit"
                    value={newMaterial.unit}
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
                      <SelectItem value="Pintura">Pintura</SelectItem>
                      <SelectItem value="Jardinería">Jardinería</SelectItem>
                      <SelectItem value="Equipamiento">Equipamiento</SelectItem>
                      <SelectItem value="Limpieza">Limpieza</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lastUsed" className="text-right">
                    Último Uso
                  </Label>
                  <Input
                    id="lastUsed"
                    name="lastUsed"
                    type="date"
                    value={newMaterial.lastUsed}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Agregar Material</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}