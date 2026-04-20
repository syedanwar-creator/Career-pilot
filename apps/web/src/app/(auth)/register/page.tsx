import Link from "next/link";

import { redirectIfAuthenticated } from "@/lib/session";
import { AppPage, Hero, SurfaceCard } from "@/components/page-chrome";

import { RegisterForm } from "../AuthForm";

export default async function RegisterPage(): Promise<JSX.Element> {
  await redirectIfAuthenticated();

  return (
    <AppPage>
      <Hero
        eyebrow="Authentication"
        title="Create your workspace"
        subtitle={
          <p style={{ margin: 0 }}>
            Start as an individual student, a school admin, or join an existing school as a student.
          </p>
        }
      />
      <div className="section-stack">
        <SurfaceCard title="Register">
          <RegisterForm />
          <p style={{ marginTop: "16px" }}>
            <Link href="/login">Already have an account?</Link>
          </p>
        </SurfaceCard>
      </div>
    </AppPage>
  );
}
