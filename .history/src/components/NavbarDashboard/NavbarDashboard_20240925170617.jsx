"use client";
import { signOut } from "next-auth/react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LogOutIcon, Menu } from "lucide-react";
import { SidebarRoutes } from "../SidebarRoutes/SidebarRoutes";
import { DropdownProfile } from "./DropdownProfile";
import LogoutButton from "@/app/(auth)/components/LogoutButton";

export function NavbarDashboard() {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <nav className="flex items-center justify-between w-full h-20 px-2 border-b gap-x-4 md:px-6 bg-background">
      <div className="block xl:hidden">
        <Sheet>
          <SheetTrigger className="flex items-center">
            <Menu />
          </SheetTrigger>
          <SheetContent side="left">
            <SidebarRoutes />
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex items-center justify-end w-full gap-x-2">
      <DropdownProfile />
        <LogoutButton onLogout={handleLogout} />
      </div>
    </nav>
  );
}
