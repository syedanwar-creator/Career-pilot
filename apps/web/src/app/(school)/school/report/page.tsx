import Link from "next/link";
import { notFound } from "next/navigation";

import { getLatestSchoolReport } from "@/lib/api";
import { requireSchoolAdmin } from "@/lib/session";

import { GenerateSchoolReportButton } from "./GenerateSchoolReportButton";

export const dynamic = "force-dynamic";

export default async function SchoolReportPage(): Promise<JSX.Element> {
  const session = await requireSchoolAdmin();
  const tenantId = session.activeMembership?.tenant.id;

  if (!tenantId) {
    notFound();
  }

  const response = await getLatestSchoolReport(tenantId);
  const report = response?.report || null;

  return (
    <main style={{ maxWidth: "1040px", margin: "0 auto", padding: "48px 24px" }}>
      <p style={{ textTransform: "uppercase", letterSpacing: "0.08em", color: "#4b6480", fontSize: "12px" }}>
        School report
      </p>
      <h1 style={{ marginTop: "8px", fontSize: "36px" }}>School readiness snapshot</h1>
      <p style={{ color: "#334a62", lineHeight: 1.6 }}>
        Durable school reporting aggregates student progress, recommendation coverage, and proof readiness into one
        exportable snapshot.
      </p>
      <p style={{ marginTop: "12px" }}>
        <Link href="/school/dashboard">Back to dashboard</Link>
      </p>

      <section style={{ marginTop: "24px", display: "grid", gap: "16px" }}>
        <Card title="Generate and export">
          <p style={{ marginTop: 0, color: "#334a62" }}>
            Generate a fresh school report after onboarding or recommendation activity changes.
          </p>
          <GenerateSchoolReportButton tenantId={tenantId} />
          {report ? (
            <p style={{ marginBottom: 0, color: "#334a62" }}>
              Status: {report.status} • Version: {report.version} • Export: {report.fileUrl || "Not prepared"}
            </p>
          ) : (
            <p style={{ marginBottom: 0, color: "#334a62" }}>No school report has been generated yet.</p>
          )}
        </Card>

        {report?.report ? (
          <>
            <Card title="Coverage">
              <div
                style={{
                  display: "grid",
                  gap: "16px",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))"
                }}
              >
                <Metric label="Students" value={String(report.report.totals.students)} />
                <Metric label="Profiles Submitted" value={String(report.report.totals.profilesSubmitted)} />
                <Metric label="Recommendations Ready" value={String(report.report.totals.recommendationsReady)} />
                <Metric label="Proof Sessions" value={String(report.report.totals.proofSessionsCompleted)} />
              </div>
            </Card>

            <Card title="Readiness bands">
              {Object.keys(report.report.readinessBandBreakdown).length ? (
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#334a62", lineHeight: 1.8 }}>
                  {Object.entries(report.report.readinessBandBreakdown).map(([band, count]) => (
                    <li key={band}>
                      {band}: {count}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ margin: 0, color: "#334a62" }}>No proof results have been captured yet.</p>
              )}
            </Card>

            <Card title="Top career interests">
              {report.report.topCareerTitles.length ? (
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#334a62", lineHeight: 1.8 }}>
                  {report.report.topCareerTitles.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ margin: 0, color: "#334a62" }}>No recommendation leaders yet.</p>
              )}
            </Card>

            <Card title="Students needing attention">
              {report.report.studentsNeedingAttention.length ? (
                <div style={{ display: "grid", gap: "12px" }}>
                  {report.report.studentsNeedingAttention.map((student) => (
                    <article
                      key={student.id}
                      style={{ border: "1px solid #d8e1eb", borderRadius: "12px", padding: "14px" }}
                    >
                      <p style={{ margin: 0, fontWeight: 600 }}>{student.fullName}</p>
                      <p style={{ margin: "8px 0 0", color: "#334a62" }}>{student.reason}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <p style={{ margin: 0, color: "#334a62" }}>No students are currently flagged for attention.</p>
              )}
            </Card>
          </>
        ) : null}
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

function Metric({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <article style={{ border: "1px solid #d8e1eb", borderRadius: "12px", padding: "14px" }}>
      <p style={{ margin: 0, fontSize: "12px", color: "#4b6480", textTransform: "uppercase" }}>{label}</p>
      <p style={{ margin: "8px 0 0", fontSize: "28px" }}>{value}</p>
    </article>
  );
}
