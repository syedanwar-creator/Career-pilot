import { memo, useMemo } from "react";
import { Link } from "react-router-dom";

import type { Career } from "@/features/dashboard/types";
import { routePaths } from "@/routes/paths";
import { Card } from "@/shared/components";
import { formatLpa, labelize } from "@/shared/utils";

interface CareerDetailProps {
  career: Career;
}

export const CareerDetail = memo(function CareerDetail({ career }: CareerDetailProps): JSX.Element {
  const salaryProgressMax = useMemo(() => Math.max(...Object.values(career.salaryProgressionLakhsINR), 1), [career]);

  return (
    <div className="stack">
      <div className="actions">
        <Link className="text-link" to={routePaths.dashboardCareers}>
          Back to careers
        </Link>
      </div>

      <Card className="stack">
        <div className="card__header">
          <div>
            <p className="eyebrow">{career.category}</p>
            <h1>{career.title}</h1>
          </div>
          <div className="actions">
            <span className="pill">Resilience {career.crisisResilience.score}%</span>
            <span className="pill">Demand {career.futureOutlook.demandScore}%</span>
          </div>
        </div>
        <p>{career.summary}</p>
      </Card>

      <div className="grid grid--three">
        <Card>
          <p className="eyebrow">How to become one</p>
          <ol className="list list--ordered">
            {career.howToBecome.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </Card>
        <Card>
          <p className="eyebrow">Positives</p>
          <ul className="list">
            {career.positives.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <p className="eyebrow">Challenges</p>
          <ul className="list">
            {career.challenges.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid grid--cards">
        <Card>
          <p className="eyebrow">Negatives</p>
          <ul className="list">
            {career.negatives.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <p className="eyebrow">Career reality</p>
          <ul className="list">
            <li>Training route: {career.trainingRoute}</li>
            <li>Practical path: {career.practiceRoute}</li>
            <li>Pressure areas: {career.demandTags.map((item) => labelize(item)).join(", ")}</li>
            <li>Work setting: {career.realWorldReality.workSettings}</li>
            <li>
              Crisis resilience: {career.crisisResilience.label} - {career.crisisResilience.explanation}
            </li>
          </ul>
        </Card>
      </div>

      <Card>
        <p className="eyebrow">Salary progression</p>
        <div className="stack">
          {Object.entries(career.salaryProgressionLakhsINR).map(([level, value]) => (
            <div key={level} className="metric-row">
              <div className="metric-row__top">
                <span>{labelize(level)}</span>
                <strong>{formatLpa(value)}</strong>
              </div>
              <progress
                aria-label={`${labelize(level)} salary progression`}
                className="metric-progress"
                max={salaryProgressMax}
                value={value}
              />
            </div>
          ))}
        </div>
      </Card>

      <div className="actions">
        <Link className="button button--secondary" to={routePaths.dashboardCareers}>
          View another career
        </Link>
        <Link className="button button--primary" to={`${routePaths.dashboardProof}?careerId=${career.id}`}>
          Prove I am ready
        </Link>
      </div>
    </div>
  );
});
