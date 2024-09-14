
import CalendarioDisponibilidad from '@/components/Reservas/Calendario'
import HistorialReservas from '@/components/Reservas/HistorialReserva'
import ProcesoReserva from '@/components/Reservas/ProcesoReserva'
import React from 'react'

export default function page() {
  return (
    <div>
        <CalendarioDisponibilidad canchaId={1} />
        <ProcesoReserva canchaId={1} />
        <HistorialReservas />
    </div>
  )
}
