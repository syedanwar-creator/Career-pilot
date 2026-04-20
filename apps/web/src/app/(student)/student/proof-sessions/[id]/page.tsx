import Link from "next/link";
import { notFound } from "next/navigation";

import { getProofSession } from "@/lib/api";
import { requireStudent } from "@/lib/session";

import { ProofSessionForm } from "./ProofSessionForm";

export const dynamic = "force-dynamic";

export default async function ProofSessionDetailPage({ params }: { params: { id: string } }): Promise<JSX.Element> {
  await requireStudent();
  const response = await getProofSession(params.id);

  if (!response) {
    notFound();
  }

  const session = response.session;

  return (
    <main style={{ maxWidth: "960px", margin: "0 auto", padding: "48px 24px" }}>
      <p style={{ textTransform: "uppercase", letterSpacing: "0.08em", color: "#4b6480", fontSize: "12px" }}>
        Proof session
      </p>
      <h1 style={{ marginTop: "8px", fontSize: "36px" }}>{session.career.title}</h1>
      <p style={{ color: "#334a62", lineHeight: 1.6 }}>{session.questionSet.introduction}</p>
      <p style={{ marginTop: "12px" }}>
        <Link href="/student/proof-sessions">Back to proof sessions</Link>
      </p>

      {session.result ? (
        <section style={{ marginTop: "24px", display: "grid", gap: "16px" }}>
          <article style={{ background: "#fff", border: "1px solid #d8e1eb", borderRadius: "14px", padding: "18px" }}>
            <p style={{ margin: 0, fontSize: "12px", color: "#4b6480", textTransform: "uppercase" }}>
              {session.result.source} • {session.result.readinessBand}
            </p>
            <h2 style={{ margin: "10px 0 8px", fontSize: "30px" }}>{session.result.overallScore}% readiness</h2>
            <p style={{ margin: 0, color: "#334a62", lineHeight: 1.6 }}>{session.result.narrative}</p>
          </article>

          <Panel title="Strengths" items={session.result.strengths} />
          <Panel title="Risks" items={session.result.risks} />
          <Panel title="Next steps" items={session.result.nextSteps} />

          <article style={{ background: "#fff", border: "1px solid #d8e1eb", borderRadius: "14px", padding: "18px" }}>
            <h2 style={{ marginTop: 0 }}>Dimension scores</h2>
            <pre style={{ margin: 0, overflowX: "auto" }}>{JSON.stringify(session.result.dimensionScores, null, 2)}</pre>
          </article>
        </section>
      ) : (
        <section style={{ marginTop: "24px" }}>
          <ProofSessionForm session={session} />
        </section>
      )}
    </main>
  );
}

function Panel({ title, items }: { title: string; items: string[] }): JSX.Element {
  return (
    <article style={{ background: "#fff", border: "1px solid #d8e1eb", borderRadius: "14px", padding: "18px" }}>
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      <ul style={{ margin: 0, paddingLeft: "20px", color: "#334a62", lineHeight: 1.8 }}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
