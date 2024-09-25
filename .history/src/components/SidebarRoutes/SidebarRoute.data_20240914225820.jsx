import {
  Calendar,
  Car,
  GalleryVertical,
  Heart,
  LayoutDashboard,
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
    icon: SquareGanttChart,
    label: "Manage your cars",
    href: "/dashboard/admin/cars-manager",
  },
  {
    icon: Calendar,
    label: "All reserves",
    href: "/dashboard/admin/reserves-admin",
  },
];
