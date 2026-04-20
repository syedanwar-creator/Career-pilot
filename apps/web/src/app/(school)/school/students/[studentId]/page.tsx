import Link from "next/link";
import { notFound } from "next/navigation";

import { getSchoolStudentDetail } from "@/lib/api";
import { requireSchoolAdmin } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function SchoolStudentDetailPage({
  params
}: {
  params: { studentId: string };
}): Promise<JSX.Element> {
  const session = await requireSchoolAdmin();
  const tenantId = session.activeMembership?.tenant.id;

  if (!tenantId) {
    notFound();
  }

  const response = await getSchoolStudentDetail(tenantId, params.studentId);

  if (!response) {
    notFound();
  }

  const { report } = response;

  return (
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px" }}>
      <p style={{ textTransform: "uppercase", letterSpacing: "0.08em", color: "#4b6480", fontSize: "12px" }}>
        Student report
      </p>
      <h1 style={{ marginTop: "8px", fontSize: "36px" }}>{report.student.fullName}</h1>
      <p style={{ color: "#334a62", lineHeight: 1.6 }}>{report.student.email}</p>
      <p style={{ marginTop: "12px" }}>
        <Link href="/school/students">Back to roster</Link>
      </p>

      <section style={{ marginTop: "24px", display: "grid", gap: "16px" }}>
        <Card title="Profile status">
          <p style={{ margin: 0, color: "#334a62" }}>
            {report.profile
              ? `${report.profile.completionStatus} • Grade ${report.profile.gradeLevel || "Unknown"} • Version count ${report.profile.versionCount}`
              : "No submitted profile yet"}
          </p>
        </Card>

        <Card title="Latest recommendation snapshot">
          {report.latestRecommendation ? (
            <>
              <p style={{ margin: 0, color: "#334a62" }}>
                Engine: {report.latestRecommendation.engineVersion} • Profile versions:{" "}
                {report.latestRecommendation.profileVersionCount}
              </p>
              <ul style={{ marginTop: "12px", paddingLeft: "20px", color: "#334a62", lineHeight: 1.8 }}>
                {report.latestRecommendation.items.slice(0, 5).map((item) => (
                  <li key={item.career.id}>
                    {item.career.title} • {item.fitScore}% • {item.fitLabel}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p style={{ margin: 0, color: "#334a62" }}>No recommendation snapshot yet.</p>
          )}
        </Card>

        <Card title="Completed proof sessions">
          {report.proofSessions.length ? (
            <div style={{ display: "grid", gap: "14px" }}>
              {report.proofSessions.map((session) => (
                <article key={session.id} style={{ border: "1px solid #d8e1eb", borderRadius: "12px", padding: "14px" }}>
                  <p style={{ margin: 0, fontSize: "12px", color: "#4b6480", textTransform: "uppercase" }}>
                    {session.career.title} • {session.result?.readinessBand || "No result"}
                  </p>
                  <p style={{ margin: "8px 0 0", color: "#334a62" }}>{session.result?.schoolSummary || "No school summary available."}</p>
                </article>
              ))}
            </div>
          ) : (
            <p style={{ margin: 0, color: "#334a62" }}>No completed proof sessions yet.</p>
          )}
        </Card>
      </section>
    </main>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }): JSX.Element {
  return (
    <article style={{ background: "#fff", border: "1px solid #d8e1eb", borderRadius: "14px", padding: "18px" }}>
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      {children}
    </article>
  );
}
