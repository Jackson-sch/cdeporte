''
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function AdminReports() {
  const reservationData = [
    { name: 'Lun', reservas: 12 },
    { name: 'Mar', reservas: 19 },
    { name: 'Mié', reservas: 15 },
    { name: 'Jue', reservas: 22 },
    { name: 'Vie', reservas: 25 },
    { name: 'Sáb', reservas: 30 },
    { name: 'Dom', reservas: 18 },
  ]

  const courtUsageData = [
    { name: 'Tenis', value: 400 },
    { name: 'Fútbol', value: 300 },
    { name: 'Baloncesto', value: 300 },
    { name: 'Voleibol', value: 200 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Informes y Estadísticas</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Reservas por Día</CardTitle>
            <CardDescription>Número de reservas en la última semana</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reservationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reservas" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Uso de Canchas</CardTitle>
            <CardDescription>Distribución del uso de canchas por tipo</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={courtUsageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {courtUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center mt-4">
              {courtUsageData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center mx-2">
                  <div className="w-3 h-3 mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span>{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Generar Informes</CardTitle>
          <CardDescription>Selecciona el tipo de informe que deseas generar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo de Informe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reservations">Reservaciones</SelectItem>
                <SelectItem value="revenue">Ingresos</SelectItem>
                <SelectItem value="memberships">Membresías</SelectItem>
                <SelectItem value="maintenance">Mantenimiento</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Diario</SelectItem>
                <SelectItem value="weekly">Semanal</SelectItem>
                <SelectItem value="monthly">Mensual</SelectItem>
                <SelectItem value="yearly">Anual</SelectItem>
              </SelectContent>
            </Select>
            <Button>Generar Informe</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}