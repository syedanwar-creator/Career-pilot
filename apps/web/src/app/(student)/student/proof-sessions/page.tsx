import Link from "next/link";

import { getProofSessions } from "@/lib/api";
import { requireStudent } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function ProofSessionsPage(): Promise<JSX.Element> {
  await requireStudent();
  const response = await getProofSessions();

  return (
    <main style={{ maxWidth: "960px", margin: "0 auto", padding: "48px 24px" }}>
      <p style={{ textTransform: "uppercase", letterSpacing: "0.08em", color: "#4b6480", fontSize: "12px" }}>
        Student
      </p>
      <h1 style={{ marginTop: "8px", fontSize: "36px" }}>Proof sessions</h1>
      <p style={{ color: "#334a62", lineHeight: 1.6 }}>
        These sessions test readiness through AI-generated scenario questions, not technical trivia.
      </p>

      <div style={{ marginTop: "24px", display: "grid", gap: "16px" }}>
        {response.sessions.length ? (
          response.sessions.map((session) => (
            <article key={session.id} style={{ background: "#fff", border: "1px solid #d8e1eb", borderRadius: "14px", padding: "18px" }}>
              <p style={{ margin: 0, fontSize: "12px", color: "#4b6480", textTransform: "uppercase" }}>
                {session.status.replace("_", " ")} • {session.questionSource}
              </p>
              <h2 style={{ margin: "10px 0 8px", fontSize: "24px" }}>{session.career.title}</h2>
              <p style={{ margin: 0, color: "#334a62", lineHeight: 1.6 }}>{session.career.summary}</p>
              <p style={{ marginTop: "12px", color: "#4b6480" }}>
                Answers: {session.answerCount}/{session.questionSet.questions.length}
                {session.result ? ` • ${session.result.readinessBand} • ${session.result.overallScore}%` : ""}
              </p>
              <p style={{ marginTop: "12px" }}>
                <Link href={`/student/proof-sessions/${session.id}`}>Open proof session</Link>
              </p>
            </article>
          ))
        ) : (
          <section style={{ background: "#fff", border: "1px solid #d8e1eb", borderRadius: "14px", padding: "18px" }}>
            <h2 style={{ marginTop: 0 }}>No proof sessions yet</h2>
            <p style={{ color: "#334a62", lineHeight: 1.6 }}>
              Start from any career detail page to generate a scenario-based proof session.
            </p>
            <Link href="/student/careers">Browse careers</Link>
          </section>
        )}
      </div>
    </main>
  );
}
