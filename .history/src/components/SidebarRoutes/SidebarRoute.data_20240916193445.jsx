import {
  Calendar,
  Car,
  Coffee,
  FolderKanban,
  GalleryVertical,
  Heart,
  LayoutDashboard,
  Settings2,
  SquareGanttChart,
} from "lucide-react";

export const dataGeneralSidebar = [
  {
    icon: LayoutDashboard,
    label: "Cars",
    href: "/dashboard",
  },
  {
    icon: GalleryVertical,
    label: "Canchas",
    href: "/dashboard/canchas",
  },
  {
    icon: Calendar,
    label: "Reservas",
    href: "/dashboard/reservas",
  },
  {
    icon: Heart,
    label: "Loved Cars",
    href: "/loved-cars",
  },
  {
    icon: SquareGanttChart,
    label: "Manage your cars",
    href: "/dashboard/canchitas",
  },
];

export const dataAdminSidebar = [
  {
    icon: GalleryVertical,
    label: "Canchas",
    href: "/admin/canchas",
  },
  {
    icon: Settings2,
    label: "Settings",
    href: "/admin/configuracion",
  },
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    icon: FolderKanban,
    label: "Inventario",
    href: "/admin/inventario",
  },
  {
    icon: Coffee,
    label: "Mantenimiento",
    href: "/admin/mantenimiento",
  },
  {
    icon: ,
    
  },
  {
    icon: Calendar,
    label: "All reserves",
    href: "/dashboard/admin/reserves-admin",
  },
];
