import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminInventory() {
  const inventoryItems = [
    { id: 1, name: "Pelotas de Tenis", category: "Equipamiento", quantity: 100, status: "En stock" },
    { id: 2, name: "Redes de Voleibol", category: "Equipamiento", quantity: 5, status: "Bajo stock" },
    { id: 3, name: "Balones de Fútbol", category: "Equipamiento", quantity: 20, status: "En stock" },
    { id: 4, name: "Raquetas de Tenis", category: "Equipamiento", quantity: 15, status: "En stock" },
    { id: 5, name: "Conos de Entrenamiento", category: "Accesorios", quantity: 50, status: "En stock" },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Inventario</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Listado de Inventario</CardTitle>
          <CardDescription>Gestiona el inventario de equipamiento y accesorios</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'En stock' ? 'default' : 'destructive'}>
                      {item.status}
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
              <Button>Agregar Nuevo Item</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Item al Inventario</DialogTitle>
                <DialogDescription>
                  Ingresa los detalles del nuevo item de inventario.
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
                  <Label htmlFor="category" className="text-right">
                    Categoría
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equipamiento">Equipamiento</SelectItem>
                      <SelectItem value="accesorios">Accesorios</SelectItem>
                      <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Cantidad
                  </Label>
                  <Input id="quantity" type="number" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Guardar Item</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}