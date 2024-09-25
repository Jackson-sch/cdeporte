'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from '';

const DetalleCanchita = () => {
  const [cancha, setCancha] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Aquí normalmente harías una llamada a tu API para obtener los detalles de la cancha
    // Por ahora, usaremos datos de ejemplo
    const canchitaEjemplo = {
      id: 1,
      nombre: 'Cancha de Fútbol A',
      tipo: 'Fútbol',
      capacidad: 22,
      equipamiento: ['Porterías', 'Redes', 'Banquillos'],
      descripcion: 'Cancha de fútbol de césped artificial de última generación. Perfecta para partidos de 11 contra 11.',
      fotos: [
        'https://ejemplo.com/cancha-futbol-1.jpg',
        'https://ejemplo.com/cancha-futbol-2.jpg',
      ],
    };
    setCancha(canchitaEjemplo);
  }, [id]);

  if (!cancha) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{cancha.nombre}</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Detalles de la cancha</h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Tipo</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{cancha.tipo}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Capacidad</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{cancha.capacidad} personas</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Equipamiento</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    {cancha.equipamiento.map((item, index) => (
                      <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Descripción</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{cancha.descripcion}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Fotos</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cancha.fotos.map((foto, index) => (
              <img key={index} src={foto} alt={`Foto ${index + 1} de ${cancha.nombre}`} className="object-cover h-48 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleCanchita;