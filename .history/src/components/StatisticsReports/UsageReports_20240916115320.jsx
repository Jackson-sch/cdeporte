import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const usageData = {
  daily: [
    { hour: '08:00', Fútbol: 2, Tenis: 1, Baloncesto: 1 },
    { hour: '10:00', Fútbol: 1, Tenis: 2, Baloncesto: 0 },
    { hour: '12:00', Fútbol: 3, Tenis: 1, Baloncesto: 2 },
    { hour: '14:00', Fútbol: 2, Tenis: 2, Baloncesto: 1 },
    { hour: '16:00', Fútbol: 3, Tenis: 3, Baloncesto: 2 },
    { hour: '18:00', Fútbol: 4, Tenis: 2, Baloncesto: 3 },
    { hour: '20:00', Fútbol: 3, Tenis: 1, Baloncesto: 2 },
  ],
  weekly: [
    { day: 'Lun', Fútbol: 10, Tenis: 8, Baloncesto: 6 },
    { day: 'Mar', Fútbol: 8, Tenis: 9, Baloncesto: 7 },
    { day: 'Mié', Fútbol: 12, Tenis: 7, Baloncesto: 8 },
    { day: 'Jue', Fútbol: 9, Tenis: 10, Baloncesto: 6 },
    { day: 'Vie', Fútbol: 15, Tenis: 12, Baloncesto: 10 },
    { day: 'Sáb', Fútbol: 20, Tenis: 15, Baloncesto: 18 },
    { day: 'Dom', Fútbol: 18, Tenis: 14, Baloncesto: 16 },
  ],
  monthly: [
    { week: 'Semana 1', Fútbol: 50, Tenis: 40, Baloncesto: 35 },
    { week: 'Semana 2', Fútbol: 55, Tenis: 45, Baloncesto: 40 },
    { week: 'Semana 3', Fútbol: 60, Tenis: 50, Baloncesto: 45 },
    { week: 'Semana 4', Fútbol: 65, Tenis: 55, Baloncesto: 50 },
  ],
}

export default function UsageReports() {
  const [reportType, setReportType] = useState('daily')

  const data = usageData[reportType]
  const xAxisDataKey = reportType === 'daily' ? 'hour' : reportType === 'weekly' ? 'day' : 'week'

  return (
    <Card className="w-[1000px]">
      <CardHeader>
        <CardTitle>Reportes de Uso de Canchas</CardTitle>
        <CardDescription>Analice el uso de las canchas por período</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select onValueChange={setReportType} defaultValue={reportType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccione el tipo de reporte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Diario</SelectItem>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensual</SelectItem>
            </SelectContent>
          </Select>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisDataKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Fútbol" fill="#8884d8" />
              <Bar dataKey="Tenis" fill="#82ca9d" />
              <Bar dataKey="Baloncesto" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{xAxisDataKey === 'hour' ? 'Hora' : xAxisDataKey === 'day' ? 'Día' : 'Semana'}</TableHead>
                <TableHead>Fútbol</TableHead>
                <TableHead>Tenis</TableHead>
                <TableHead>Baloncesto</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row[xAxisDataKey]}</TableCell>
                  <TableCell>{row.Fútbol}</TableCell>
                  <TableCell>{row.Tenis}</TableCell>
                  <TableCell>{row.Baloncesto}</TableCell>
                  <TableCell>{row.Fútbol + row.Tenis + row.Baloncesto}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button onClick={() => console.log(`Descargar reporte ${reportType}`)}>
            Descargar Reporte
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}