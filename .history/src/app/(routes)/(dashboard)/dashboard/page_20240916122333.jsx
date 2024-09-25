'use client'
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'

export default function Page() {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [cancha, setCancha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar la reserva
    console.log('Reserva:', { fecha, hora, cancha });
    alert('Reserva realizada con éxito!', { fecha, hora, cancha })
  };

  

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-center">Reserva de Canchitas Deportivas</h1>
            </div>
            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">Fecha</label>
                  <input
                    type="date"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Fecha"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Hora</label>
                  <input
                    type="time"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Hora"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Cancha</label>
                  <select
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    value={cancha}
                    onChange={(e) => setCancha(e.target.value)}
                  >
                    <option value="">Selecciona una cancha</option>
                    <option value="futbol">Fútbol</option>
                    <option value="tenis">Tenis</option>
                    <option value="basquet">Básquet</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <Button
                  className="flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                  type="submit"
                >
                  Reservar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
