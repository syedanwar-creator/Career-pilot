import Link from "next/link";

import { getLatestStudentReport } from "@/lib/api";
import { requireStudent } from "@/lib/session";

import { CreateParentShareButton, GenerateStudentReportButton, RevokeShareButton } from "./ReportActions";

export const dynamic = "force-dynamic";

export default async function StudentReportPage(): Promise<JSX.Element> {
  const session = await requireStudent();
  const response = await getLatestStudentReport();
  const report = response.report;

  return (
    <main style={{ maxWidth: "1040px", margin: "0 auto", padding: "48px 24px" }}>
      <p style={{ textTransform: "uppercase", letterSpacing: "0.08em", color: "#4b6480", fontSize: "12px" }}>
        Student report
      </p>
      <h1 style={{ marginTop: "8px", fontSize: "36px" }}>Career readiness report</h1>
      <p style={{ color: "#334a62", lineHeight: 1.6 }}>
        This is the durable report snapshot for {session.user.fullName}. Generate a fresh report whenever profile,
        recommendation, or proof evidence changes.
      </p>
      <p style={{ marginTop: "12px" }}>
        <Link href="/student/dashboard">Back to dashboard</Link>
      </p>

      <section style={{ marginTop: "24px", display: "grid", gap: "16px" }}>
        <Card title="Generate and export">
          <p style={{ marginTop: 0, color: "#334a62" }}>
            Reports are persisted server-side and a private export file is generated with each snapshot.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <GenerateStudentReportButton />
            {report?.status === "ready" ? <CreateParentShareButton /> : null}
          </div>
          {report ? (
            <p style={{ marginBottom: 0, color: "#334a62" }}>
              Status: {report.status} • Version: {report.version} • Export: {report.fileUrl || "Not prepared"}
            </p>
          ) : (
            <p style={{ marginBottom: 0, color: "#334a62" }}>No report snapshot exists yet.</p>
          )}
        </Card>

        {report?.report ? (
          <>
            <Card title="Summary">
              <p style={{ marginTop: 0, color: "#334a62" }}>
                Top recommendation: {report.report.topRecommendationTitle || "Not available"} • Proof readiness:{" "}
                {report.report.proofReadinessBand || "Not available"} • Confidence:{" "}
                {report.report.proofConfidenceScore ?? "Not available"}
              </p>
              <p style={{ marginBottom: 0, color: "#334a62" }}>
                Profile status: {report.report.profileCompletionStatus || "missing"} • Generated at:{" "}
                {new Date(report.report.generatedAt).toLocaleString()}
              </p>
            </Card>

            <Card title="Recommendation highlights">
              <ul style={{ margin: 0, paddingLeft: "20px", color: "#334a62", lineHeight: 1.8 }}>
                {report.report.recommendationHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>

            <Card title="Parent summary">
              <p style={{ margin: 0, color: "#334a62", lineHeight: 1.7 }}>
                {report.report.parentSummary || "A parent summary will appear after a completed proof session."}
              </p>
            </Card>

            <Card title="Next steps">
              <ul style={{ margin: 0, paddingLeft: "20px", color: "#334a62", lineHeight: 1.8 }}>
                {report.report.nextSteps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>

            <Card title="Active share links">
              {report.shares.length ? (
                <div style={{ display: "grid", gap: "12px" }}>
                  {report.shares.map((share) => (
                    <article
                      key={share.id}
                      style={{ border: "1px solid #d8e1eb", borderRadius: "12px", padding: "14px" }}
                    >
                      <p style={{ margin: 0, color: "#334a62" }}>
                        Expires {new Date(share.expiresAt).toLocaleString()} • {share.isActive ? "Active" : "Inactive"}
                      </p>
                      <p style={{ margin: "8px 0", color: "#667085", fontSize: "14px" }}>
                        Public URL is only shown once at creation time for security. Create a new link if you need to
                        reshare it.
                      </p>
                      {share.revokedAt ? (
                        <p style={{ margin: 0, color: "#334a62" }}>
                          Revoked {new Date(share.revokedAt).toLocaleString()}
                        </p>
                      ) : (
                        <RevokeShareButton shareId={share.id} />
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                <p style={{ margin: 0, color: "#334a62" }}>No parent share links have been created yet.</p>
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
