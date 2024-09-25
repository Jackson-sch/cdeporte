"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import RealTimeAvailability from "@/components/Reservas/RealTimeAvailability";
import HistorialReservas from "@/components/Reservas/HistorialReserva";
import ReservationHistory from "@/components/Reservas/ReservationHistory";

export default function ReservationCalendar() {
  const [date, setDate] = useState(new Date());
  const [selectedCourt, setSelectedCourt] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const courts = [
    "Cancha de Fútbol 1",
    "Cancha de Tenis A",
    "Cancha de Baloncesto Central",
  ];
  const times = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const handleReservation = () => {
    console.log("Reserva realizada:", { date, selectedCourt, selectedTime });
    setIsDialogOpen(false);
    // Aquí iría la lógica para enviar la reserva al servidor
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:">
      <div className="col-span-3">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Calendario de Reservas</CardTitle>
            <CardDescription>
              Seleccione una fecha para su reserva
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <div className="mt-4">
              <Select onValueChange={setSelectedCourt}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una cancha" />
                </SelectTrigger>
                <SelectContent>
                  {courts.map((court) => (
                    <SelectItem key={court} value={court}>
                      {court}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4">
              <Select onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una hora" />
                </SelectTrigger>
                <SelectContent>
                  {times.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="mt-4 w-full">Reservar</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmar Reserva</DialogTitle>
                  <DialogDescription>
                    ¿Está seguro que desea realizar esta reserva?
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Fecha
                    </Label>
                    <Input
                      id="date"
                      value={date.toLocaleDateString()}
                      className="col-span-3"
                      readOnly
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="court" className="text-right">
                      Cancha
                    </Label>
                    <Input
                      id="court"
                      value={selectedCourt}
                      className="col-span-3"
                      readOnly
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">
                      Hora
                    </Label>
                    <Input
                      id="time"
                      value={selectedTime}
                      className="col-span-3"
                      readOnly
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleReservation}>Confirmar Reserva</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-3">
        <RealTimeAvailability />
      </div>

      <ReservationHistory />
    </div>
  );
}
