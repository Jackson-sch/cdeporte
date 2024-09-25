import {
  Calendar,
  Car,
  ChartColumnStacked,
  Coffee,
  FolderKanban,
  GalleryVertical,
  Gem,
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
    icon: Gem,
    label: "Membresía",
    href: "/admin/membresia",
  },
  {
    icon: ChartColumnStacked,
    label: "Reportes",
    href: "/admin/reportes",
  },
  {
    icon: Calendar,
    label: "Reservas",
    href: "/admin/reservas",
  },
  {
    icon: User
  },
];
