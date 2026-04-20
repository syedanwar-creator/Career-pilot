import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/api";
import { AppPage, Hero, NavLinkCard, SurfaceCard } from "@/components/page-chrome";
import { getDefaultAppPath, getServerSessionCookieHeader } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function LandingPage(): Promise<JSX.Element> {
  const auth = await getSession(getServerSessionCookieHeader());

  if (auth.session) {
    redirect(getDefaultAppPath(auth.session));
  }

  return (
    <AppPage>
      <Hero
        eyebrow="Career Pilot"
        title="Try a career path before committing to it."
        subtitle={
          <p style={{ margin: 0 }}>
            Students build a profile, get AI-assisted matches, complete non-technical proof sessions, and generate
            reports they can share with parents or schools.
          </p>
        }
        actions={
          <>
          <Link
              className="button-primary"
            href="/register"
          >
            Create account
          </Link>
          <Link
              className="button-ghost"
            href="/login"
          >
            Sign in
          </Link>
          <Link
              className="button-ghost"
            href="/forgot-password"
          >
            Reset password
          </Link>
          </>
        }
      />

      <section className="panel-grid panel-grid--cards section-stack">
        <SurfaceCard>
          <FeatureCard
          eyebrow="Student path"
          title="Profile to proof"
          body="Create a student account, submit the profile, recompute recommendations, then complete a proof session and report."
          href="/register"
          label="Start as student"
        />
        </SurfaceCard>
        <SurfaceCard>
          <FeatureCard
          eyebrow="School path"
          title="Admin and reporting"
          body="Create a school admin account, onboard students, inspect readiness, and generate the school-level report."
          href="/register"
          label="Start as school admin"
        />
        </SurfaceCard>
        <SurfaceCard>
          <FeatureCard
          eyebrow="Local review"
          title="Run it on localhost"
          body="Start infra, run the local bootstrap, then launch the monorepo stack to test the full product end to end."
          href="https://example.invalid/local-testing-guide"
          label="See local testing guide"
          externalText="Use docs/local-testing-guide.md from the repo root."
        />
        </SurfaceCard>
      </section>

      <SurfaceCard title="What is ready in localhost">
        <ul className="content-list">
          <li>Tenant-aware auth for individual students, school admins, and school students</li>
          <li>Student profiles, recommendations, proof sessions, and durable reports</li>
          <li>School roster management, student detail views, and school reporting</li>
          <li>Parent share links with expiry and revocation</li>
          <li>Metrics, request IDs, security headers, and rate limiting on the API</li>
        </ul>
      </SurfaceCard>
    </AppPage>
  );
}

function FeatureCard({
  eyebrow,
  title,
  body,
  href,
  label,
  externalText
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  label: string;
  externalText?: string;
}): JSX.Element {
  return (
    <article>
      <p className="app-eyebrow">{eyebrow}</p>
      <h2 style={{ margin: "10px 0 8px", fontSize: "2rem", lineHeight: 1 }}>{title}</h2>
      <p className="muted-text" style={{ margin: 0 }}>{body}</p>
      {externalText ? (
        <p className="muted-text" style={{ marginTop: "12px" }}>{externalText}</p>
      ) : (
        <div style={{ marginTop: "16px" }}>
          <Link className="button-secondary" href={href}>
            {label}
          </Link>
        </div>
      )}
    </article>
  );
}
