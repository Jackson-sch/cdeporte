'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const ListadoCanchitas = () => {
  const [canchitas, setCanchitas] = useState([]);

  useEffect(() => {
    // Aquí normalmente harías una llamada a tu API para obtener las canchitas
    // Por ahora, usaremos datos de ejemplo
    const canchitasEjemplo = [
      { id: 1, nombre: 'Cancha de Fútbol A', tipo: 'Fútbol', capacidad: 22 },
      { id: 2, nombre: 'Cancha de Tenis 1', tipo: 'Tenis', capacidad: 4 },
      { id: 3, nombre: 'Cancha de Básquet Central', tipo: 'Básquet', capacidad: 10 },
      { id: 4, nombre: 'Cancha de Vóley Playa', tipo: 'Vóley', capacidad: 12 },
    ];
    setCanchitas(canchitasEjemplo);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Catálogo de Canchitas</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {canchitas.map((cancha) => (
            <div key={cancha.id} className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">{cancha.nombre}</h3>
                <p className="mt-1 text-sm text-gray-500">Tipo: {cancha.tipo}</p>
                <p className="mt-1 text-sm text-gray-500">Capacidad: {cancha.capacidad} personas</p>
                <div className="mt-4">
                  <Link
                    href={`/dashboard/canchitas/${cancha.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListadoCanchitas;