'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export default function TeamRegistration() {
  const [teams, setTeams] = useState([
    { id: 1, name: 'Equipo A', tournament: 'Torneo de Fútbol 2023', members: 11 },
    { id: 2, name: 'Equipo B', tournament: 'Torneo de Baloncesto 2023', members: 5 },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newTeam, setNewTeam] = useState({ name: '', tournament: '', members: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewTeam(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setNewTeam(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = teams.length + 1
    setTeams([...teams, { id, ...newTeam }])
    setIsDialogOpen(false)
    setNewTeam({ name: '', tournament: '', members: '' })
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Inscripción de Equipos</CardTitle>
        <CardDescription>Gestione la inscripción de equipos a los torneos</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre del Equipo</TableHead>
              <TableHead>Torneo</TableHead>
              <TableHead>Número de Miembros</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell>{team.name}</TableCell>
                <TableCell>{team.tournament}</TableCell>
                <TableCell>{team.members}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Inscribir Equipo</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Inscribir Nuevo Equipo</DialogTitle>
              <DialogDescription>
                Ingrese los detalles del equipo para inscribirlo en un torneo
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nombre del Equipo
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={newTeam.name}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tournament" className="text-right">
                    Torneo
                  </Label>
                  <Select name="tournament" onValueChange={(value) => handleSelectChange('tournament', value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccione un torneo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Torneo de Fútbol 2023">Torneo de Fútbol 2023</SelectItem>
                      <SelectItem value="Torneo de Baloncesto 2023">Torneo de Baloncesto 2023</SelectItem>
                      <SelectItem value="Torneo de Tenis 2023">Torneo de Tenis 2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="members" className="text-right">
                    Número de Miembros
                  </Label>
                  <Input
                    id="members"
                    name="members"
                    type="number"
                    value={newTeam.members}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Inscribir Equipo</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}