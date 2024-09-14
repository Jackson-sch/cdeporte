'use client'
import React, { useState } from 'react';
import CalendarioDisponibilidad from './Calendario';


const ProcesoReserva = ({ canchaId }) => {
  const [paso, setPaso] = useState(1);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [datosReserva, setDatosReserva] = useState({
    nombre: '',
    email: '',
    telefono: '',
  });

  const handleSeleccionHorario = (horario) => {
    setHorarioSeleccionado(horario);
    setPaso(2);
  };

  const handleInputChange = (e) => {
    setDatosReserva({ ...datosReserva, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar la reserva al backend
    console.log('Reserva enviada:', { ...datosReserva, horario: horarioSeleccionado });
    setPaso(3);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reserva de Cancha</h1>
      {paso === 1 && (
        <CalendarioDisponibilidad
          canchaId={canchaId}
          onSeleccionHorario={handleSeleccionHorario}
        />
      )}
      {paso === 2 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold">Confirma tu reserva</h2>
          <p>Horario seleccionado: {horarioSeleccionado.toLocaleString()}</p>
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre completo
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={datosReserva.nombre}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={datosReserva.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              id="telefono"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={datosReserva.telefono}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Confirmar Reserva
          </button>
        </form>
      )}
      {paso === 3 && (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">¡Reserva Confirmada!</h2>
          <p>Gracias por tu reserva. Hemos enviado un email de confirmación a {datosReserva.email}.</p>
        </div>
      )}
    </div>
  );
};

export default ProcesoReserva;