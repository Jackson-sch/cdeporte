import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const usageData = [
  { name: 'Lun', Fútbol: 4, Tenis: 3, Baloncesto: 2 },
  { name: 'Mar', Fútbol: 3, Tenis: 4, Baloncesto: 3 },
  { name: 'Mié', Fútbol: 5, Tenis: 2, Baloncesto: 4 },
  { name: 'Jue', Fútbol: 4, Tenis: 3, Baloncesto: 3 },
  { name: 'Vie', Fútbol: 6, Tenis: 5, Baloncesto: 5 },
  { name: 'Sáb', Fútbol: 8, Tenis: 6, Baloncesto: 7 },
  { name: 'Dom', Fútbol: 7, Tenis: 5, Baloncesto: 6 },
]

const incomeData = [
  { name: 'Ene', Fútbol: 1000, Tenis: 800, Baloncesto: 600 },
  { name: 'Feb', Fútbol: 1200, Tenis: 900, Baloncesto: 700 },
  { name: 'Mar', Fútbol: 1100, Tenis: 850, Baloncesto: 650 },
  { name: 'Abr', Fútbol: 1300, Tenis: 950, Baloncesto: 750 },
  { name: 'May', Fútbol: 1400, Tenis: 1000, Baloncesto: 800 },
  { name: 'Jun', Fútbol: 1600, Tenis: 1100, Baloncesto: 900 },
]

const maintenanceData = [
  { name: 'Ene', Preventivo: 5, Correctivo: 2 },
  { name: 'Feb', Preventivo: 4, Correctivo: 1 },
  { name: 'Mar', Preventivo: 6, Correctivo: 3 },
  { name: 'Abr', Preventivo: 5, Correctivo: 2 },
  { name: 'May', Preventivo: 7, Correctivo: 1 },
  { name: 'Jun', Preventivo: 6, Correctivo: 2 },
]

export default function Dashboard() {
  return (
    <Tabs defaultValue="usage" className="w-[1000px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="usage">Uso de Canchas</TabsTrigger>
        <TabsTrigger value="income">Análisis de Ingresos</TabsTrigger>
        <TabsTrigger value="maintenance">Reportes de Mantenimiento</TabsTrigger>
      </TabsList>
      <TabsContent value="usage">
        <Card>
          <CardHeader>
            <CardTitle>Uso de Canchas</CardTitle>
            <CardDescription>Reservas por día y tipo de cancha</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Fútbol" fill="#8884d8" />
                <Bar dataKey="Tenis" fill="#82ca9d" />
                <Bar dataKey="Baloncesto" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
            <Button onClick={() => console.log('Descargar reporte de uso')}>
              Descargar Reporte
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="income">
        <Card>
          <CardHeader>
            <CardTitle>Análisis de Ingresos</CardTitle>
            <CardDescription>Ingresos mensuales por tipo de cancha</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incomeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Fútbol" fill="#8884d8" />
                <Bar dataKey="Tenis" fill="#82ca9d" />
                <Bar dataKey="Baloncesto" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
            <Button onClick={() => console.log('Descargar reporte de ingresos')}>
              Descargar Reporte
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="maintenance">
        <Card>
          <CardHeader>
            <CardTitle>Reportes de Mantenimiento</CardTitle>
            <CardDescription>Mantenimientos preventivos y correctivos por mes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={maintenanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Preventivo" fill="#8884d8" />
                <Bar dataKey="Correctivo" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
            <Button onClick={() => console.log('Descargar reporte de mantenimiento')}>
              Descargar Reporte
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}