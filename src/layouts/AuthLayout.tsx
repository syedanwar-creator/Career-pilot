import { Link, Outlet } from "react-router-dom";

import { DemoCredentials } from "@/features/auth";
import { routePaths } from "@/routes/paths";
import { useAppStore } from "@/store";

export function AuthLayout(): JSX.Element {
  const config = useAppStore((state) => state.config);

  return (
    <div className="auth-layout">
      <section className="auth-layout__hero">
        <p className="eyebrow">Career Reality Platform</p>
        <h1>Behavior-first routing for a career intelligence platform.</h1>
        <p>
          The public flow now has dedicated routes for landing, login, register, forgot password, and reset password,
          while the protected app lives behind guard-based layouts.
        </p>
        <div className="feature-grid">
          <article className="card stat-card">
            <strong>{config?.careerCount || 0}+</strong>
            <span>Career profiles</span>
          </article>
          <article className="card stat-card">
            <strong>{config?.geminiConfigured ? "Enabled" : "Optional"}</strong>
            <span>AI interview engine</span>
          </article>
        </div>
        <div className="auth-layout__links">
          <Link className="text-link" to={routePaths.home}>
            Back to landing
          </Link>
          <Link className="text-link" to={routePaths.register}>
            Need an account?
          </Link>
        </div>
        <DemoCredentials accounts={config?.demoAccounts || []} />
      </section>
      <section className="auth-layout__panel">
        <Outlet />
      </section>
    </div>
  );
}
