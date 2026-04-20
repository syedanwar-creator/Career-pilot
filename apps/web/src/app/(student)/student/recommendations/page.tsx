import Link from "next/link";

import { getLatestRecommendations } from "@/lib/api";
import { AppPage, Hero, SurfaceCard } from "@/components/page-chrome";
import { requireStudent } from "@/lib/session";

import { RecomputeRecommendationsButton } from "./RecomputeRecommendationsButton";

export const dynamic = "force-dynamic";

export default async function StudentRecommendationsPage(): Promise<JSX.Element> {
  await requireStudent();
  const response = await getLatestRecommendations();
  const snapshot = response.snapshot;

  return (
    <AppPage>
      <Hero
        eyebrow="Student recommendations"
        title="Career matches with evidence"
        subtitle={<p style={{ margin: 0 }}>Review the latest ranked snapshot derived from your submitted profile.</p>}
      />

      <div className="section-stack">
        <SurfaceCard>
        <RecomputeRecommendationsButton />
        <p className="muted-text" style={{ margin: 0 }}>
          This uses deterministic scoring so the match logic remains inspectable and versioned.
        </p>
        </SurfaceCard>

      {!snapshot ? (
        <SurfaceCard title="No recommendation snapshot yet">
          <p className="muted-text">
            Submit the profile first, then recompute recommendations to persist the first ranked snapshot.
          </p>
          <Link href="/student/profile">Go to profile</Link>
        </SurfaceCard>
      ) : (
        <>
          <SurfaceCard>
            <p className="muted-text" style={{ margin: 0 }}>
              Snapshot created {new Date(snapshot.createdAt).toLocaleString()} using `{snapshot.engineVersion}` and
              profile version count `{snapshot.profileVersionCount}`.
            </p>
            <p className="muted-text" style={{ margin: "12px 0 0" }}>
              Input summary: {snapshot.inputSummary.join(", ") || "No captured summary"}
            </p>
          </SurfaceCard>

          <div className="panel-grid panel-grid--cards">
            {snapshot.items.map((item) => (
              <SurfaceCard key={item.career.id}>
                <p className="app-eyebrow">
                  Rank {item.rank} • {item.fitLabel} fit • score {item.fitScore}
                </p>
                <h2 style={{ margin: "10px 0 8px", fontSize: "2rem", lineHeight: 1 }}>{item.career.title}</h2>
                <p className="muted-text" style={{ margin: 0 }}>{item.explanation}</p>

                <section style={{ marginTop: "14px" }}>
                  <h3 style={{ marginBottom: "8px" }}>Reasons</h3>
                  <ul className="content-list">
                    {item.reasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                </section>

                <section style={{ marginTop: "14px" }}>
                  <h3 style={{ marginBottom: "8px" }}>Evidence from profile</h3>
                  <p className="muted-text" style={{ margin: 0 }}>
                    {item.evidenceInputs.join(", ") || "No direct evidence captured"}
                  </p>
                </section>

                <p style={{ marginTop: "14px" }}>
                  <Link href={`/student/careers/${item.career.slug}`}>Open career detail</Link>
                </p>
              </SurfaceCard>
            ))}
          </div>
        </>
      )}
      </div>
    </AppPage>
  );
}
