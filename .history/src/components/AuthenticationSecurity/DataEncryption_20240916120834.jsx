import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertCircle, Check, Key, Lock } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DataEncryption() {
  const [encryptionKey, setEncryptionKey] = useState('********')
  const [isKeyVisible, setIsKeyVisible] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newEncryptionStrength, setNewEncryptionStrength] = useState('256')

  const [encryptedData, setEncryptedData] = useState([
    { id: 1, type: 'Contraseñas de usuario', status: 'Cifrado', lastUpdated: '2023-07-01' },
    { id: 2, type: 'Información de pago', status: 'Cifrado', lastUpdated: '2023-06-30' },
    { id: 3, type: 'Datos personales', status: 'Cifrado', lastUpdated: '2023-06-29' },
  ])

  const handleKeyVisibility = () => {
    setIsKeyVisible(!isKeyVisible)
  }

  const handleRegenerateKey = () => {
    // En una implementación real, aquí se generaría una nueva clave de cifrado
    setEncryptionKey('NEW_ENCRYPTION_KEY')
    setIsKeyVisible(true)
  }

  const handleUpdateEncryption = () => {
    // En una implementación real, aquí se actualizaría la fuerza de cifrado
    console.log('Actualizando fuerza de cifrado a:', newEncryptionStrength)
    setIsDialogOpen(false)
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Cifrado de Datos</CardTitle>
        <CardDescription>Gestione el cifrado de datos sensibles en el sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert>
          <Lock className="h-4 w-4" />
          <AlertTitle>Cifrado Activo</AlertTitle>
          <AlertDescription>
            Todos los datos sensibles están siendo cifrados con AES-256.
          </AlertDescription>
        </Alert>
        <div className="mt-6">
          <Label htmlFor="encryption-key">Clave de Cifrado Actual</Label>
          <div className="flex items-center mt-2">
            <Input
              id="encryption-key"
              type={isKeyVisible ? 'text' : 'password'}
              value={encryptionKey}
              readOnly
              className="mr-2"
            />
            <Button variant="outline" onClick={handleKeyVisibility}>
              {isKeyVisible ? 'Ocultar' : 'Mostrar'}
            </Button>
          </div>
          <Button className="mt-2" onClick={handleRegenerateKey}>
            <Key className="mr-2 h-4 w-4" /> Regenerar Clave
          </Button>
        </div>
        <h3 className="text-lg font-semibold mt-6 mb-2">Estado del Cifrado de Datos</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo de Datos</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Última Actualización</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {encryptedData.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.type}</TableCell>
                <TableCell>
                  <span className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    {data.status}
                  </span>
                </TableCell>
                <TableCell>{data.lastUpdated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Actualizar Configuración de Cifrado</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Actualizar Configuración de Cifrado</DialogTitle>
              <DialogDescription>
                Seleccione la nueva fuerza de cifrado para los datos
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="encryption-strength" className="text-right">
                  Fuerza de Cifrado
                </Label>
                <Select
                  value={newEncryptionStrength}
                  onValueChange={setNewEncryptionStrength}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccione la fuerza de cifrado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="128">AES-128</SelectItem>
                    <SelectItem value="192">AES-192</SelectItem>
                    <SelectItem value="256">AES-256</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleUpdateEncryption}>Actualizar Cifrado</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}