
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Invoicing() {
  const [invoices, setInvoices] = useState([
    { id: 1, date: '2023-06-01', amount: 50, status: 'Pagada' },
    { id: 2, date: '2023-06-05', amount: 30, status: 'Pendiente' },
    { id: 3, date: '2023-06-10', amount: 40, status: 'Pagada' },
  ])

  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleGenerateInvoice = () => {
    const newInvoice = {
      id: invoices.length + 1,
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      status: 'Pendiente'
    }
    setInvoices([...invoices, newInvoice])
    setSelectedInvoice(newInvoice)
    setIsDialogOpen(true)
  }

  const handleUpdateInvoice = (e) => {
    e.preventDefault()
    const updatedInvoices = invoices.map(inv => 
      inv.id === selectedInvoice.id ? { ...inv, amount: parseFloat(e.target.amount.value) } : inv
    )
    setInvoices(updatedInvoices)
    setIsDialogOpen(false)
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Facturación</CardTitle>
        <CardDescription>Gestione y genere facturas para sus reservas</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>${invoice.amount}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>
                  <Button variant="outline" onClick={() => window.print()}>Imprimir</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerateInvoice}>Generar Nueva Factura</Button>
      </CardFooter>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva Factura</DialogTitle>
            <DialogDescription>
              Ingrese los detalles de la nueva factura
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateInvoice}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Monto
                </Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  defaultValue={selectedInvoice?.amount}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Guardar Factura</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}