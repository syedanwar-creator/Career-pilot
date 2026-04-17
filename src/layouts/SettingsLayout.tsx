import { Outlet } from "react-router-dom";

import { settingsNavItems, routePaths } from "@/routes/paths";
import { AppNavLink, Breadcrumbs } from "@/shared/components";

export function SettingsLayout(): JSX.Element {
  return (
    <div className="shell shell--section">
      <header className="section-header-shell">
        <div>
          <p className="eyebrow">Settings</p>
          <h1>Account and workspace preferences</h1>
        </div>
        <div className="actions">
          <AppNavLink label="Back to dashboard" to={routePaths.dashboard} />
        </div>
      </header>
      <Breadcrumbs />
      <div className="section-nav">
        {settingsNavItems.map((item) => (
          <AppNavLink key={item.to} label={item.label} to={item.to} />
        ))}
      </div>
      <Outlet />
    </div>
  );
}
