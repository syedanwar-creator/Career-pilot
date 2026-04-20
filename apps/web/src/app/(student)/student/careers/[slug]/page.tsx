import Link from "next/link";
import { notFound } from "next/navigation";

import { getCareerBySlug } from "@/lib/api";
import { requireStudent } from "@/lib/session";

import { StartProofSessionButton } from "../../proof-sessions/StartProofSessionButton";

export const dynamic = "force-dynamic";

export default async function CareerDetailPage({ params }: { params: { slug: string } }): Promise<JSX.Element> {
  await requireStudent();
  const response = await getCareerBySlug(params.slug);

  if (!response) {
    notFound();
  }

  const career = response.career;

  return (
    <main style={{ maxWidth: "960px", margin: "0 auto", padding: "48px 24px" }}>
      <p style={{ textTransform: "uppercase", letterSpacing: "0.08em", color: "#4b6480", fontSize: "12px" }}>
        {career.category.name}
      </p>
      <h1 style={{ marginTop: "8px", fontSize: "36px" }}>{career.title}</h1>
      <p style={{ color: "#334a62", lineHeight: 1.6 }}>{career.summary}</p>
      <p style={{ marginTop: "12px" }}>
        <Link href="/student/careers">Back to catalog</Link>
      </p>
      <div style={{ marginTop: "16px" }}>
        <StartProofSessionButton careerSlug={career.slug} />
      </div>

      <section style={{ marginTop: "28px", display: "grid", gap: "20px" }}>
        <Panel title="Education path" items={career.educationPath} />
        <Panel title="Skills" items={career.skills} />
        <Panel title="Positives" items={career.positives} />
        <Panel title="Challenges" items={career.challenges} />
        <Panel title="Drawbacks" items={career.drawbacks} />
        <pre
          style={{
            padding: "16px",
            borderRadius: "12px",
            background: "#fff",
            border: "1px solid #d8e1eb",
            overflowX: "auto"
          }}
        >
          {JSON.stringify(
            {
              salaryMeta: career.salaryMeta,
              outlookMeta: career.outlookMeta,
              resilienceMeta: career.resilienceMeta
            },
            null,
            2
          )}
        </pre>
      </section>
    </main>
  );
}

function Panel({ title, items }: { title: string; items: string[] }): JSX.Element {
  return (
    <section style={{ background: "#fff", border: "1px solid #d8e1eb", borderRadius: "14px", padding: "18px" }}>
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      <ul style={{ margin: 0, paddingLeft: "20px", color: "#334a62", lineHeight: 1.8 }}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
