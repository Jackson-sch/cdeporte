import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star } from 'lucide-react'

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
    </div>
  )
}

export default function UserReviews() {
  const [reviews, setReviews] = useState([
    { id: 1, user: 'Juan Pérez', court: 'Cancha de Fútbol 1', rating: 4, comment: 'Excelente cancha, bien mantenida.', status: 'Aprobado' },
    { id: 2, user: 'María González', court: 'Cancha de Tenis A', rating: 5, comment: 'La mejor cancha de tenis en la que he jugado.', status: 'Aprobado' },
    { id: 3, user: 'Carlos Rodríguez', court: 'Cancha de Baloncesto Central', rating: 3, comment: 'Buena cancha, pero necesita mejor iluminación.', status: 'Pendiente' },
  ])

  const [newReview, setNewReview] = useState({ user: '', court: '', rating: 5, comment: '' })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewReview(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setNewReview(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = reviews.length + 1
    setReviews([...reviews, { id, ...newReview, status: 'Pendiente' }])
    setIsDialogOpen(false)
    setNewReview({ user: '', court: '', rating: 5, comment: '' })
  }

  const handleStatusChange = (id, newStatus) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status: newStatus } : review
    ))
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Comentarios de Usuarios</CardTitle>
        <CardDescription>Gestione y modere los comentarios de los usuarios sobre las canchas</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Cancha</TableHead>
              <TableHead>Calificación</TableHead>
              <TableHead>Comentario</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>{review.user}</TableCell>
                <TableCell>{review.court}</TableCell>
                <TableCell><StarRating rating={review.rating} /></TableCell>
                <TableCell>{review.comment}</TableCell>
                <TableCell>{review.status}</TableCell>
                <TableCell>
                  <Select
                    value={review.status}
                    onValueChange={(value) => handleStatusChange(review.id, value)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Cambiar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aprobado">Aprobar</SelectItem>
                      <SelectItem value="Rechazado">Rechazar</SelectItem>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Agregar Comentario</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Comentario</DialogTitle>
              <DialogDescription>
                Ingrese los detalles del nuevo comentario
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="user" className="text-right">
                    Usuario
                  </Label>
                  <Input
                    id="user"
                    name="user"
                    value={newReview.user}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="court" className="text-right">
                    Cancha
                  </Label>
                  <Select name="court" onValueChange={(value) => handleSelectChange('court', value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione una cancha" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cancha de Fútbol 1">Cancha de Fútbol 1</SelectItem>
                      <SelectItem value="Cancha de Tenis A">Cancha de Tenis A</SelectItem>
                      <SelectItem value="Cancha de Baloncesto Central">Cancha de Baloncesto Central</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="rating" className="text-right">
                    Calificación
                  </Label>
                  <Select name="rating" onValueChange={(value) => handleSelectChange('rating', parseInt(value))}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione una calificación" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <SelectItem key={rating} value={rating.toString()}>
                          <StarRating rating={rating} />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="comment" className="text-right">
                    Comentario
                  </Label>
                  <Textarea
                    id="comment"
                    name="comment"
                    value={newReview.comment}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Agregar Comentario</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}