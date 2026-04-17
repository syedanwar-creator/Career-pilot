import { Outlet } from "react-router-dom";

import { adminNavItems, routePaths } from "@/routes/paths";
import { AppNavLink, Breadcrumbs } from "@/shared/components";
import { useAuthStore } from "@/store";

export function AdminLayout(): JSX.Element {
  const session = useAuthStore((state) => state.session);

  return (
    <div className="shell shell--section">
      <header className="section-header-shell">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>{session?.tenant?.name || "School admin workspace"}</h1>
        </div>
        <div className="actions">
          <AppNavLink label="Back to dashboard" to={routePaths.dashboard} />
        </div>
      </header>
      <Breadcrumbs />
      <div className="section-nav">
        {adminNavItems.map((item) => (
          <AppNavLink key={item.to} label={item.label} to={item.to} />
        ))}
      </div>
      <Outlet />
    </div>
  );
}
