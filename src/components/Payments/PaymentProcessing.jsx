'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Stripe, StripeCheckout } from '@/components/stripe'

export default function PaymentProcessing() {
  const [paymentMethod, setPaymentMethod] = useState('credit_card')
  const [amount, setAmount] = useState('')

  const handlePayment = () => {
    console.log('Procesando pago:', { paymentMethod, amount })
    // Aquí iría la lógica para procesar el pago
  }

  return (
    <Stripe>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Procesar Pago</CardTitle>
          <CardDescription>Seleccione el método de pago y el monto</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="paymentMethod">Método de Pago</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="Seleccione el método de pago" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="credit_card">Tarjeta de Crédito</SelectItem>
                    <SelectItem value="bank_transfer">Transferencia Bancaria</SelectItem>
                    <SelectItem value="cash">Efectivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="amount">Monto</Label>
                <Input
                  id="amount"
                  placeholder="Ingrese el monto"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </form>
          {paymentMethod === 'credit_card' && (
            <div className="mt-4">
              <StripeCheckout
                clientSecret={process.env.STRIPE_CLIENT_SECRET}
                onSuccess={() => console.log('Pago exitoso')}
                onError={() => console.log('Error en el pago')}
              >
                <Button className="w-full">Pagar con Tarjeta</Button>
              </StripeCheckout>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {paymentMethod !== 'credit_card' && (
            <Button onClick={handlePayment} className="w-full">Procesar Pago</Button>
          )}
        </CardFooter>
      </Card>
    </Stripe>
  )
}