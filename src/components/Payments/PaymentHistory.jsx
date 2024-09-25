
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function PaymentHistory() {
  const payments = [
    { id: 1, date: '2023-06-01', amount: 50, method: 'Tarjeta de Crédito', status: 'Completado' },
    { id: 2, date: '2023-06-05', amount: 30, method: 'Transferencia Bancaria', status: 'Pendiente' },
    { id: 3, date: '2023-06-10', amount: 40, method: 'Efectivo', status: 'Completado' },
  ]

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Historial de Pagos</CardTitle>
        <CardDescription>Revise sus pagos anteriores y pendientes</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Método de Pago</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.date}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>
                  <Badge variant={payment.status === 'Completado' ? 'success' : 'warning'}>
                    {payment.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}