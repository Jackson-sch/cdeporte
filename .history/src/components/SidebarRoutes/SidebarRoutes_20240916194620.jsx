"use client";

import { Separator } from "@/components/ui/separator";
import { dataAdminSidebar, dataGeneralSidebar } from "./SidebarRoute.data";
import { SidebarItem } from "./SidebarItem/SidebarItem";



export function SidebarRoutes() {

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="p-4 md:p-8">
          <p className="mb-2 text-slate-500">GENERAL</p>
          {dataGeneralSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>

        <Separator />

          <div className="p-4 md:p-8">
            <p className="mb-2 text-slate-500">ADMIN</p>
            {dataAdminSidebar.map((item) => (
              <SidebarItem key={item.label} item={item} />
            ))}
          </div>
      </div>

      <div>
        <Separator />

        <footer className="p-6 mt-1 text-center text-xs text-pretty">
          2024. Webby © Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
}