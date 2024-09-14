'use client'
import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, startOfDay, addHours, isSameDay } from 'date-fns';

const CalendarioDisponibilidad = ({ canchaId, onSeleccionHorario }) => {
  const [semanaActual, setSemanaActual] = useState(startOfWeek(new Date()));
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    // Aquí normalmente harías una llamada a tu API para obtener la disponibilidad
    // Por ahora, generaremos datos de ejemplo
    const generarHorariosEjemplo = () => {
      let horariosGenerados = [];
      for (let i = 0; i < 7; i++) {
        const dia = addDays(semanaActual, i);
        for (let hora = 8; hora < 22; hora++) {
          horariosGenerados.push({
            fecha: addHours(startOfDay(dia), hora),
            disponible: Math.random() > 0.3, // 70% de probabilidad de estar disponible
          });
        }
      }
      setHorarios(horariosGenerados);
    };

    generarHorariosEjemplo();
  }, [semanaActual, canchaId]);

  const renderCelda = (horario) => {
    const estiloBase = "p-2 text-center cursor-pointer";
    const estiloDisponible = horario.disponible
      ? "bg-green-200 hover:bg-green-300"
      : "bg-red-200 cursor-not-allowed";

    return (
      <div
        key={horario.fecha.toISOString()}
        className={`${estiloBase} ${estiloDisponible}`}
        onClick={() => horario.disponible && onSeleccionHorario(horario.fecha)}
      >
        {format(horario.fecha, 'HH:mm')}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Disponibilidad</h2>
      <div className="grid grid-cols-8 gap-2">
        <div className="font-bold">Hora</div>
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="font-bold text-center">
            {format(addDays(semanaActual, i), 'EEE dd')}
          </div>
        ))}
        {horarios.map((horario, index) => (
          <React.Fragment key={index}>
            {index % 7 === 0 && (
              <div className="font-bold">{format(horario.fecha, 'HH:mm')}</div>
            )}
            {renderCelda(horario)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CalendarioDisponibilidad;