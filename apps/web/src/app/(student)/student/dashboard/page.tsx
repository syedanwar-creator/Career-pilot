import Link from "next/link";

import { AppPage, Hero, NavLinkCard, SurfaceCard } from "@/components/page-chrome";
import { requireStudent } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function StudentDashboardPage(): Promise<JSX.Element> {
  const session = await requireStudent();

  return (
    <AppPage>
      <Hero
        eyebrow="Student workspace"
        title={`Welcome, ${session.user.fullName.split(" ")[0]}`}
        subtitle={<p style={{ margin: 0 }}>Move from self-discovery to evidence with profile building, recommendations, proof sessions, and a shareable report.</p>}
        actions={
          <>
            <Link className="button-primary" href="/student/profile">
              Update profile
            </Link>
            <Link className="button-secondary" href="/student/report">
              View report
            </Link>
          </>
        }
      />
      <div className="section-stack">
        <SurfaceCard title="Continue your journey">
          <div className="nav-link-list">
            <NavLinkCard href="/student/profile" title="Profile foundation" description="Add the signals that drive recommendations and proof." />
            <NavLinkCard href="/student/careers" title="Career catalog" description="Explore the curated pathways and compare options." />
            <NavLinkCard href="/student/recommendations" title="Recommendations" description="Generate and review ranked career matches." />
            <NavLinkCard href="/student/proof-sessions" title="Proof sessions" description="Validate fit using AI-generated behavioral prompts." />
            <NavLinkCard href="/student/report" title="Durable report" description="See the parent-shareable snapshot of your progress." />
          </div>
        </SurfaceCard>
        <SurfaceCard title="Session debug">
          <pre className="debug-panel">{JSON.stringify(session, null, 2)}</pre>
        </SurfaceCard>
      </div>
    </AppPage>
  );
}
