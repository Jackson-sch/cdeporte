import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";

export default function CourtsPage() {
  const courts = [
    {
      id: 1,
      name: "Cancha de Tenis 1",
      type: "Tenis",
      status: "Disponible",
      rating: 4.5,
      image: "/canchitas/tenis.jpg",
    },
    {
      id: 2,
      name: "Cancha de Fútbol A",
      type: "Fútbol",
      status: "En mantenimiento",
      rating: 4.2,
      image: "/canchitas/futbol.jpg",
    },
    {
      id: 3,
      name: "Cancha de Baloncesto 2",
      type: "Baloncesto",
      status: "Disponible",
      rating: 4.8,
    },
    {
      id: 4,
      name: "Cancha de Voleibol",
      type: "Voleibol",
      status: "Ocupada",
      rating: 4.0,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Nuestras Canchas</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courts.map((court) => (
          <Card key={court.id}>
            <CardHeader>
              <CardTitle>{court.name}</CardTitle>
              <CardDescription>Cancha de {court.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={`/placeholder.svg?height=200&width=400`}
                alt={`Imagen de ${court.name}`}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="flex justify-between items-center">
                <Badge
                  variant={
                    court.status === "Disponible"
                      ? "default"
                      : court.status === "En mantenimiento"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {court.status}
                </Badge>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>{court.rating}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <MapPin className="mr-2 h-4 w-4" /> Ver en mapa
              </Button>
              <Button>Reservar</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
