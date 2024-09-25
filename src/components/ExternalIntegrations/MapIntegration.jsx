import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin } from "lucide-react"

export default function MapIntegration() {
  const [courts, setCourts] = useState([
    { id: 1, name: 'Cancha de Fútbol 1', latitude: 40.7128, longitude: -74.0060, distance: null },
    { id: 2, name: 'Cancha de Tenis A', latitude: 40.7282, longitude: -73.7949, distance: null },
    { id: 3, name: 'Cancha de Baloncesto Central', latitude: 40.7589, longitude: -73.9851, distance: null },
  ])

  const [userLocation, setUserLocation] = useState({ latitude: '', longitude: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserLocation(prev => ({ ...prev, [name]: value }))
  }

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Esta es una implementación simple de la fórmula de Haversine
    // En una aplicación real, se usaría una biblioteca más robusta o un servicio de API
    const R = 6371 // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    const d = R * c
    return d.toFixed(2)
  }

  const handleCalculateDistances = () => {
    const updatedCourts = courts.map(court => ({
      ...court,
      distance: calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        court.latitude,
        court.longitude
      )
    }))
    setCourts(updatedCourts)
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Integración con Mapas</CardTitle>
        <CardDescription>Localice las canchas y calcule distancias</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="latitude">Su Latitud</Label>
            <Input
              id="latitude"
              name="latitude"
              value={userLocation.latitude}
              onChange={handleInputChange}
              placeholder="Ej. 40.7128"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="longitude">Su Longitud</Label>
            <Input
              id="longitude"
              name="longitude"
              value={userLocation.longitude}
              onChange={handleInputChange}
              placeholder="Ej. -74.0060"
            />
          </div>
        </div>
        <Button className="mt-4" onClick={handleCalculateDistances}>Calcular Distancias</Button>
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Cancha</TableHead>
              <TableHead>Latitud</TableHead>
              <TableHead>Longitud</TableHead>
              <TableHead>Distancia (km)</TableHead>
              <TableHead>Ver en Mapa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courts.map((court) => (
              <TableRow key={court.id}>
                <TableCell>{court.name}</TableCell>
                <TableCell>{court.latitude}</TableCell>
                <TableCell>{court.longitude}</TableCell>
                <TableCell>{court.distance ? `${court.distance} km` : 'N/A'}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${court.latitude},${court.longitude}`, '_blank')}
                  >
                    <MapPin className="mr-2 h-4 w-4" /> Ver en Mapa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button onClick={() => console.log('Abrir mapa con todas las canchas')}>
          <MapPin className="mr-2 h-4 w-4" /> Ver Todas las Canchas en el Mapa
        </Button>
      </CardFooter>
    </Card>
  )
}