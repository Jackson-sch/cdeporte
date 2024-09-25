import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertCircle, Check, Smartphone, Mail } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function MultiFactorAuth() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState('app')
  const [verificationCode, setVerificationCode] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [recentLogins, setRecentLogins] = useState([
    { id: 1, date: '2023-07-01 10:30', location: 'Ciudad de México, México', device: 'iPhone 12' },
    { id: 2, date: '2023-06-30 15:45', location: 'Guadalajara, México', device: 'MacBook Pro' },
    { id: 3, date: '2023-06-29 09:15', location: 'Monterrey, México', device: 'Samsung Galaxy S21' },
  ])

  const handleEnable2FA = () => {
    setIsDialogOpen(true)
  }

  const handleDisable2FA = () => {
    setIs2FAEnabled(false)
  }

  const handleVerification = () => {
    // En una implementación real, aquí se verificaría el código
    console.log('Verificando código:', verificationCode)
    setIs2FAEnabled(true)
    setIsDialogOpen(false)
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Autenticación Multifactor</CardTitle>
        <CardDescription>Configure la autenticación de dos factores para mayor seguridad</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Switch
            id="2fa-switch"
            checked={is2FAEnabled}
            onCheckedChange={is2FAEnabled ? handleDisable2FA : handleEnable2FA}
          />
          <Label htmlFor="2fa-switch">Autenticación de dos factores (2FA)</Label>
        </div>
        {is2FAEnabled && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>2FA está activado</AlertTitle>
            <AlertDescription>
              Su cuenta está protegida con autenticación de dos factores.
            </AlertDescription>
          </Alert>
        )}
        <h3 className="text-lg font-semibold mt-6 mb-2">Inicios de sesión recientes</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Dispositivo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentLogins.map((login) => (
              <TableRow key={login.id}>
                <TableCell>{login.date}</TableCell>
                <TableCell>{login.location}</TableCell>
                <TableCell>{login.device}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configurar Autenticación de Dos Factores</DialogTitle>
            <DialogDescription>
              Elija un método y siga las instrucciones para configurar 2FA
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={selectedMethod === 'app' ? 'default' : 'outline'}
                onClick={() => setSelectedMethod('app')}
              >
                <Smartphone className="mr-2 h-4 w-4" /> Aplicación de Autenticación
              </Button>
              <Button
                variant={selectedMethod === 'sms' ? 'default' : 'outline'}
                onClick={() => setSelectedMethod('sms')}
              >
                <Mail className="mr-2 h-4 w-4" /> SMS
              </Button>
            </div>
            {selectedMethod === 'app' && (
              <div className="flex flex-col items-center">
                <img src="/placeholder.svg?height=200&width=200" alt="QR Code" className="mb-4" />
                <p className="text-sm text-gray-500">
                  Escanee este código QR con su aplicación de autenticación
                </p>
              </div>
            )}
            {selectedMethod === 'sms' && (
              <p className="text-sm text-gray-500">
                Se enviará un código de verificación al número de teléfono asociado a su cuenta
              </p>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="verification-code" className="text-right">
                Código de Verificación
              </Label>
              <Input
                id="verification-code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleVerification}>Verificar y Activar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}