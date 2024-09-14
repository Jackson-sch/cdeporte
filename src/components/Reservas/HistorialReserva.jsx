'use client'
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const HistorialReservas = ({ userId }) => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    // Aquí normalmente harías una llamada a tu API para obtener el historial de reservas
    // Por ahora, usaremos datos de ejemplo
    const reservasEjemplo = [
      { id: 1, fecha: new Date(2024, 7, 10, 15, 0), cancha: 'Cancha de Fútbol A', estado: 'Confirmada' },
      { id: 2, fecha: new Date(2024, 7, 15, 18, 0), cancha: 'Cancha de Tenis 1', estado: 'Cancelada' },
      { id: 3, fecha: new Date(2024, 7, 20, 10, 0), cancha: 'Cancha de Básquet Central', estado: 'Pendiente' },
    ];
    setReservas(reservasEjemplo);
  }, [userId]);

  const handleCancelar = (reservaId) => {
    // Aquí iría la lógica para cancelar la reserva
    console.log('Cancelando reserva:', reservaId);
    // Actualizar el estado local para reflejar la cancelación
    setReservas(reservas.map(reserva => 
      reserva.id === reservaId ? {...reserva, estado: 'Cancelada'} : reserva
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Historial de Reservas</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {reservas.map((reserva) => (
            <li key={reserva.id} className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{reserva.cancha}</p>
                  <p className="text-sm text-gray-500">{format(reserva.fecha, 'dd/MM/yyyy HH:mm')}</p>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${reserva.estado === 'Confirmada' ? 'bg-green-100 text-green-800' : 
                      reserva.estado === 'Cancelada' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {reserva.estado}
                  </span>
                  {reserva.estado !== 'Cancelada' && (
                    <button
                      onClick={() => handleCancelar(reserva.id)}
                      className="ml-4 text-sm text-red-600 hover:text-red-900"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistorialReservas;