import Link from "next/link";

import { getStudentProfile } from "@/lib/api";
import { AppPage, Hero, SurfaceCard } from "@/components/page-chrome";
import { getServerSessionCookieHeader, requireStudent } from "@/lib/session";

import { ProfileForm } from "./ProfileForm";

export const dynamic = "force-dynamic";

export default async function StudentProfilePage(): Promise<JSX.Element> {
  const session = await requireStudent();
  const response = await getStudentProfile(getServerSessionCookieHeader());

  return (
    <AppPage>
      <Hero
        eyebrow="Student profile"
        title="Build your signal profile"
        subtitle={
          <p style={{ margin: 0 }}>
            This profile drives recommendations and later assessment generation for {session.user.fullName}.
          </p>
        }
        actions={
          <Link className="button-secondary" href="/student/dashboard">
            Back to dashboard
          </Link>
        }
      />
      <div className="section-stack">
        <SurfaceCard title="Profile inputs">
          <ProfileForm initialProfile={response.profile} />
        </SurfaceCard>
      </div>
    </AppPage>
  );
}
