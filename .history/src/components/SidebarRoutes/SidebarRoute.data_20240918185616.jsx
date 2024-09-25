import {
  Calendar,
  ChartColumnStacked,
  Coffee,
  FolderKanban,
  GalleryVertical,
  Gem,
  LayoutDashboard,
  Settings2,
  User,
  User2,
} from "lucide-react";

export const dataGeneralSidebar = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
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
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    icon: GalleryVertical,
    label: "Canchas",
    href: "/admin/canchas",
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
    icon: Settings2,
    label: "Configuración",
    href: "/admin/configuracion",
  },
  {
    icon: User2,
    label: "Usuarios",
    href: "/admin/usuarios",
  },
];
