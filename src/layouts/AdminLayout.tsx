import { Outlet } from "react-router-dom";

import { AppSidebar } from "@/shared/components/AppSidebar";

export function AdminLayout(): JSX.Element {

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <AppSidebar section="admin" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#f8fafc", minWidth: 0 }}>
        <main id="route-content" style={{ flex: 1, padding: "28px", overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
