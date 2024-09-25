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
  User,
  User2,
} from "lucide-react";

export const dataGeneralSidebar = [
  {
    icon: LayoutDashboard,
    label: "Das",
    href: "/dashboard",
  },
  {
    icon: GalleryVertical,
    label: "Canchas",
    href: "/canchas",
  },
  {
    icon: Calendar,
    label: "Reservas",
    href: "/reservas",
  },
  {
    icon: Gem,
    label: "Membresía",
    href: "/membresia",
  },
  {
    icon: User,
    label: "Perfil",
    href: "/perfil",
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
    icon: User2,
    label: "Usuarios",
    href: "/admin/usuarios",
  },
];
