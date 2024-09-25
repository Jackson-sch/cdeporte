'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export default function ResultsManagement() {
  const [matches, setMatches] = useState([
    { id: 1, tournament: 'Torneo de Fútbol 2023', team1: 'Equipo A', team2: 'Equipo B', score1: 2, score2: 1, date: '2023-07-01' },
    { id: 2, tournament: 'Torneo de Baloncesto 2023', team1: 'Equipo C', team2: 'Equipo D', score1: 78, score2: 82, date: '2023-07-02' },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newMatch, setNewMatch] = useState({ tournament: '', team1: '', team2: '', score1: '', score2: '', date: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewMatch(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setNewMatch(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = matches.length + 1
    setMatches([...matches, { id, ...newMatch }])
    setIsDialogOpen(false)
    setNewMatch({ tournament: '', team1: '', team2: '', score1: '', score2: '', date: '' })
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Gestión de Resultados</CardTitle>
        <CardDescription>Registre y visualice los resultados de los partidos</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Torneo</TableHead>
              <TableHead>Equipo 1</TableHead>
              <TableHead>Equipo 2</TableHead>
              <TableHead>Resultado</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.map((match) => (
              <TableRow key={match.id}>
                <TableCell>{match.tournament}</TableCell>
                <TableCell>{match.team1}</TableCell>
                <TableCell>{match.team2}</TableCell>
                <TableCell>{`${match.score1} - ${match.score2}`}</TableCell>
                <TableCell>{match.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Registrar Resultado</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Resultado</DialogTitle>
              <DialogDescription>
                Ingrese los detalles del partido y su resultado
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
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
                  <Label htmlFor="team1" className="text-right">
                    Equipo 1
                  </Label>
                  <Input
                    id="team1"
                    name="team1"
                    value={newMatch.team1}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="team2" className="text-right">
                    Equipo 2
                  </Label>
                  <Input
                    id="team2"
                    name="team2"
                    value={newMatch.team2}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="score1" className="text-right">
                    Puntuación Equipo 1
                  </Label>
                  <Input
                    id="score1"
                    name="score1"
                    type="number"
                    value={newMatch.score1}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="score2" className="text-right">
                    Puntuación Equipo 2
                  </Label>
                  <Input
                    id="score2"
                    name="score2"
                    type="number"
                    value={newMatch.score2}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Fecha
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={newMatch.date}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Registrar Resultado</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}