import { Link } from "react-router-dom";

import { DemoCredentials } from "@/features/auth";
import { routePaths } from "@/routes/paths";
import { Button, Card } from "@/shared/components";
import { useAppStore } from "@/store";

export default function LandingPage(): JSX.Element {
  const config = useAppStore((state) => state.config);

  return (
    <div className="stack">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Career Reality</p>
          <h1>Production routing for a simulation-driven career platform.</h1>
          <p>
            Public, protected, and role-based routes now live behind a centralized route map with lazy loading,
            guard layers, route-scoped error boundaries, and deep-link-safe navigation.
          </p>
        </div>
        <div className="feature-grid">
          <Card className="stat-card">
            <strong>{config?.careerCount || 0}+</strong>
            <span>Career profiles</span>
          </Card>
          <Card className="stat-card">
            <strong>Students + Schools</strong>
            <span>Separate access paths</span>
          </Card>
          <Card className="stat-card">
            <strong>{config?.geminiConfigured ? "Enabled" : "Optional"}</strong>
            <span>AI-assisted profiling</span>
          </Card>
        </div>
        <div className="actions">
          <Link className="button button--primary" to={routePaths.login}>
            Sign in
          </Link>
          <Link className="button button--secondary" to={routePaths.register}>
            Create account
          </Link>
        </div>
      </section>
      <section className="grid grid--three">
        <Card>
          <p className="eyebrow">Routing model</p>
          <h3>Guarded by intent</h3>
          <p>Public entry points stay open, dashboard paths require auth, and admin paths require a role guard.</p>
        </Card>
        <Card>
          <p className="eyebrow">UX standard</p>
          <h3>Lazy without blank screens</h3>
          <p>Every route renders inside Suspense with geometry-matched skeletons instead of full-viewport spinners.</p>
        </Card>
        <Card>
          <p className="eyebrow">Navigation</p>
          <h3>Deep-link safe</h3>
          <p>Breadcrumbs, active states, prefetch hints, and SPA fallback handling keep refreshes and shared links working.</p>
        </Card>
      </section>
      <DemoCredentials accounts={config?.demoAccounts || []} />
    </div>
  );
}
