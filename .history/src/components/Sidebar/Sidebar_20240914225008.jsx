import { SidebarRoutes } from "../../../../../../components/SidebarRoutes/SidebarRoutes";


export function Sidebar() {
  return (
    <div className="h-screen">
      <div className="flex flex-col h-full border-r">
        <SidebarRoutes />
      </div>
    </div>
  );
}