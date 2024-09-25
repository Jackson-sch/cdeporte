'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CourtCategories() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Fútbol', description: 'Canchas de fútbol' },
    { id: 2, name: 'Tenis', description: 'Canchas de tenis' },
    { id: 3, name: 'Baloncesto', description: 'Canchas de baloncesto' },
  ])

  const [newCategory, setNewCategory] = useState({ name: '', description: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewCategory(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = categories.length + 1
    setCategories([...categories, { id, ...newCategory }])
    setNewCategory({ name: '', description: '' })
  }

  const handleDelete = (id) => {
    setCategories(categories.filter(category => category.id !== id))
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Categorías de Canchas</CardTitle>
        <CardDescription>Gestione las categorías de canchas disponibles.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <Button variant="destructive" onClick={() => handleDelete(category.id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nombre de la Categoría</Label>
              <Input id="name" name="name" value={newCategory.name} onChange={handleChange} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Descripción</Label>
              <Input id="description" name="description" value={newCategory.description} onChange={handleChange} required />
            </div>
          </div>
          <Button type="submit" className="mt-4">Agregar Categoría</Button>
        </form>
      </CardContent>
    </Card>
  )
}