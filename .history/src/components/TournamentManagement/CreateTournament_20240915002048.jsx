's'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"
import { Switch } from "@/components/ui/switch"

export default function CreateTournament() {
  const [tournament, setTournament] = useState({
    name: '',
    description: '',
    sport: '',
    startDate: null,
    endDate: null,
    maxTeams: '',
    isPublic: true,
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setTournament(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSelectChange = (name, value) => {
    setTournament(prev => ({ ...prev, [name]: value }))
  }

  const handleDateRangeChange = (range) => {
    setTournament(prev => ({
      ...prev,
      startDate: range.from,
      endDate: range.to
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Torneo creado:', tournament)
    // Aquí iría la lógica para enviar los datos al servidor
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Crear Nuevo Torneo</CardTitle>
        <CardDescription>Complete los detalles para crear un nuevo torneo</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nombre del Torneo</Label>
              <Input id="name" name="name" value={tournament.name} onChange={handleInputChange} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Descripción</Label>
              <Textarea id="description" name="description" value={tournament.description} onChange={handleInputChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="sport">Deporte</Label>
              <Select name="sport" onValueChange={(value) => handleSelectChange('sport', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un deporte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="futbol">Fútbol</SelectItem>
                  <SelectItem value="tenis">Tenis</SelectItem>
                  <SelectItem value="baloncesto">Baloncesto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Fechas del Torneo</Label>
              <DatePickerWithRange onDateChange={handleDateRangeChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="maxTeams">Número Máximo de Equipos</Label>
              <Input id="maxTeams" name="maxTeams" type="number" value={tournament.maxTeams} onChange={handleInputChange} />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="isPublic" name="isPublic" checked={tournament.isPublic} onCheckedChange={(checked) => handleSelectChange('isPublic', checked)} />
              <Label htmlFor="isPublic">Torneo Público</Label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit}>Crear Torneo</Button>
      </CardFooter>
    </Card>
  )
}