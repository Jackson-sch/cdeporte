"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import CourtCategories from "@/components/Canchitas/CourtCategories/CourtCategories";
import CourtStatus from "@/components/Canchitas/CourtStatus/CourtStatus";

export default function AddCourt() {
  const [courtData, setCourtData] = useState({
    name: "",
    type: "",
    capacity: "",
    location: "",
    isAvailable: true,
    isIndoor: false,
    hasArtificialTurf: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourtData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setCourtData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nueva cancha:", courtData);
    // Aquí iría la lógica para enviar los datos al servidor
  };

  return (
    <>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Agregar Nueva Cancha</CardTitle>
          <CardDescription>
            Ingrese los detalles de la nueva cancha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nombre de la Cancha</Label>
                <Input
                  id="name"
                  name="name"
                  value={courtData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="type">Tipo de Cancha</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="futbol">Fútbol</SelectItem>
                    <SelectItem value="tenis">Tenis</SelectItem>
                    <SelectItem value="baloncesto">Baloncesto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="capacity">Capacidad</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={courtData.capacity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="location">Ubicación</Label>
                <Input
                  id="location"
                  name="location"
                  value={courtData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isAvailable"
                  name="isAvailable"
                  checked={courtData.isAvailable}
                  onCheckedChange={(checked) =>
                    handleSelectChange("isAvailable", checked)
                  }
                />
                <Label htmlFor="isAvailable">Disponible</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isIndoor"
                  name="isIndoor"
                  checked={courtData.isIndoor}
                  onCheckedChange={(checked) =>
                    handleSelectChange("isIndoor", checked)
                  }
                />
                <Label htmlFor="isIndoor">Cancha Techada</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="hasArtificialTurf"
                  name="hasArtificialTurf"
                  checked={courtData.hasArtificialTurf}
                  onCheckedChange={(checked) =>
                    handleSelectChange("hasArtificialTurf", checked)
                  }
                />
                <Label htmlFor="hasArtificialTurf">Césped Artificial</Label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancelar</Button>
          <Button onClick={handleSubmit}>Agregar Cancha</Button>
        </CardFooter>
      </Card>
      <CourtCategories />
      <CourtStatus />
    </>
  );
}
