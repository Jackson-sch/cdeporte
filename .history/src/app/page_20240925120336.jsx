"use client";
import DetalleCanchita from "@/components/Canchitas/DetalleCanchita/DetalleCanchita";
import NavbarHome from "@/components/NavbarDashboard/NavbarHome";
import { LogInIcon } from "lucide-react";
import React from "react";
import { Button } from "react-day-picker";

export default function page() {
  return (
    <>
      <NavbarHome />
      <DetalleCanchita />
    </>
  );
}
