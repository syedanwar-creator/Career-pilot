import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { routePaths } from "@/routes/paths";
import { Card } from "@/shared/components";

function decodeCareerName(value: string | null): string {
  if (!value) {
    return "your selected career";
  }

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export default function DashboardCareerHelpPage(): JSX.Element {
  const [searchParams] = useSearchParams();
  const score = Number(searchParams.get("score") || 0);
  const career = decodeCareerName(searchParams.get("career"));
  const isTechnology = searchParams.get("technology") === "1";
  const isBelowPar = score < 65;

  const headline = useMemo(() => {
    if (isBelowPar) {
      return `We can strengthen your path toward ${career}`;
    }

    return `Next step: turn your ${career} momentum into placements`;
  }, [career, isBelowPar]);

  const summary = isBelowPar
    ? "This is the support layer. Start by building stronger real-world signals, then come back with better proof."
    : "This is the acceleration layer. Build verified signals and sharper visibility before targeting top companies.";

  return (
    <div className="career-help-page">
      <div className="career-help-orb career-help-orb--one" aria-hidden="true" />
      <div className="career-help-orb career-help-orb--two" aria-hidden="true" />

      <Card className="career-help-hero">
        <p className="eyebrow">Career help</p>
        <h1>{headline}</h1>
        <p>{summary}</p>
        <div className="actions">
          <span className={`pill ${isBelowPar ? "pill--danger" : "pill--success"}`}>Current score {score}%</span>
          {isTechnology ? <span className="pill">Technology pathway unlocked</span> : <span className="pill">Career support unlocked</span>}
        </div>
      </Card>

      <section className="career-help-center">
        {isBelowPar ? (
          <div className="career-help-logo-grid">
            <a className="career-help-logo-card" href="https://digri.ai/" rel="noreferrer" target="_blank">
              <img
                alt="Digri"
                className="career-help-logo-image"
                src="https://digri.ai/wp-content/uploads/2023/08/digri-favicon-1.png"
              />
              <strong>Digri</strong>
              <p>Upskill your technology foundation.</p>
            </a>
            <a className="career-help-logo-card" href="https://www.veril.ai/" rel="noreferrer" target="_blank">
              <img alt="Veril AI" className="career-help-logo-image" src="https://www.veril.ai/logo.png" />
              <strong>Veril AI</strong>
              <p>Verify skills and strengthen resume proof.</p>
            </a>
          </div>
        ) : isTechnology ? (
          <div className="career-help-logo-grid">
            <a className="career-help-logo-card" href="https://digri.ai/" rel="noreferrer" target="_blank">
              <img
                alt="Digri"
                className="career-help-logo-image"
                src="https://digri.ai/wp-content/uploads/2023/08/digri-favicon-1.png"
              />
              <strong>Digri</strong>
              <p>Level up and stay sharp for technology roles.</p>
            </a>
            <a className="career-help-logo-card" href="https://www.veril.ai/" rel="noreferrer" target="_blank">
              <img alt="Veril AI" className="career-help-logo-image" src="https://www.veril.ai/logo.png" />
              <strong>Veril AI</strong>
              <p>Show verified skill proof before placement outreach.</p>
            </a>
          </div>
        ) : (
          <Card className="career-help-generic">
            <h2>Support is ready</h2>
            <p>Keep building stronger evidence through practice, reflection, and repeat proof sessions for this path.</p>
          </Card>
        )}
      </section>

      <div className="actions career-help-actions">
        <Link className="button button--secondary" to={routePaths.dashboardProof}>
          Back to proof center
        </Link>
      </div>
    </div>
  );
}
