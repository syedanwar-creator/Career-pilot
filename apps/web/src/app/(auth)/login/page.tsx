import Link from "next/link";

import { redirectIfAuthenticated } from "@/lib/session";
import { AppPage, Hero, SurfaceCard } from "@/components/page-chrome";

import { LoginForm } from "../AuthForm";

export default async function LoginPage(): Promise<JSX.Element> {
  await redirectIfAuthenticated();

  return (
    <AppPage>
      <Hero
        eyebrow="Authentication"
        title="Welcome back"
        subtitle={<p style={{ margin: 0 }}>Sign in and continue to the correct student or school workspace.</p>}
      />
      <div className="section-stack">
        <SurfaceCard title="Login">
          <LoginForm />
          <p style={{ marginTop: "16px" }}>
            <Link href="/forgot-password">Forgot password?</Link>
          </p>
        </SurfaceCard>
      </div>
    </AppPage>
  );
}
