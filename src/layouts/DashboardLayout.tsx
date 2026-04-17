import { Outlet } from "react-router-dom";

import { useAuthActions } from "@/features/auth";
import { dashboardNavItems, routePaths } from "@/routes/paths";
import { Breadcrumbs, Button, Card, AppNavLink } from "@/shared/components";
import { useAuthStore } from "@/store";

export function DashboardLayout(): JSX.Element {
  const session = useAuthStore((state) => state.session);
  const { isSubmitting, logout } = useAuthActions();

  return (
    <div className="shell shell--app">
      <aside className="sidebar" aria-label="Dashboard navigation">
        <div className="sidebar__brand">
          <p className="eyebrow">Student Space</p>
          <h2>{session?.user?.fullName || "Student"}</h2>
          <p>{session?.tenant?.name || "Independent workspace"}</p>
        </div>
        <nav className="nav-stack">
          {dashboardNavItems.map((item) => (
            <AppNavLink key={item.to} end={"end" in item ? item.end : false} label={item.label} to={item.to} />
          ))}
        </nav>
        <div className="sidebar__footer">
          <AppNavLink label="Settings" to={routePaths.settingsProfile} />
          {session?.user?.role === "school_admin" ? <AppNavLink label="Admin" to={routePaths.adminOverview} /> : null}
          <Button disabled={isSubmitting} variant="secondary" onClick={() => void logout()}>
            Sign out
          </Button>
        </div>
      </aside>
      <div className="shell__content">
        <header className="topbar">
          <Breadcrumbs />
          <Card className="topbar__meta">
            <span>{session?.tenant?.slug || "individual"}</span>
            <span>{session?.user?.email || ""}</span>
          </Card>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
