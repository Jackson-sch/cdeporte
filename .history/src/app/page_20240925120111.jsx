
import { LogInIcon } from "lucide-react";
import React from "react";
import { Button } from "react-day-picker";

export default function page() {
  return (
    <nav>
      {/* create navbar con un boton de lgin */}
      <Button variant="ghost" size="icon" className="rounded-full">
        <LogInIcon className="h-5 w-5" />
      </Button>
    </nav>
  )
}
