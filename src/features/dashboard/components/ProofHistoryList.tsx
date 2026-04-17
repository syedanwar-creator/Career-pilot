import { memo } from "react";
import { Link, createSearchParams } from "react-router-dom";

import type { ProofSession } from "@/features/dashboard/types";
import { routePaths } from "@/routes/paths";
import { Card } from "@/shared/components";
import { formatDate, getProofReadinessState } from "@/shared/utils";

interface ProofHistoryListProps {
  sessions: ProofSession[];
}

const technologyKeywords = [
  "technology",
  "software",
  "engineer",
  "developer",
  "data",
  "computer",
  "digital",
  "ai",
  "tech"
];

function isTechnologyProofSession(session: ProofSession): boolean {
  const haystack = [
    session.careerTitle,
    session.evaluation?.narrative,
    session.evaluation?.parentSummary,
    session.evaluation?.schoolSummary
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return technologyKeywords.some((keyword) => haystack.includes(keyword));
}

function getCareerHelpCta(score: number): string {
  return score < 65
    ? "Dont worry .I will help you with your career"
    : "I will help you to get placed in company like Amazon ,netflix ,google";
}

export const ProofHistoryList = memo(function ProofHistoryList({ sessions }: ProofHistoryListProps): JSX.Element {
  if (!sessions.length) {
    return (
      <div className="empty-state">
        <h2>No proof sessions yet</h2>
        <p>Start a proof session from the careers page to collect evidence here.</p>
      </div>
    );
  }

  return (
    <div className="stack">
      {sessions.map((session) => {
        const score = session.evaluation?.overallScore || 0;
        const readiness = getProofReadinessState(score);
        const isTechnology = isTechnologyProofSession(session);

        return (
          <Card key={session.id}>
            <div className="card__header">
              <div>
                <p className="eyebrow">{session.careerTitle}</p>
                <h3>{session.evaluation?.points || 0} points</h3>
              </div>
              <div className="actions">
                <span className={`pill pill--${readiness.tone}`}>
                  {readiness.label} {score}%
                </span>
                <span className="pill">{formatDate(session.completedAt)}</span>
              </div>
            </div>
            <div className={`status-callout status-callout--${readiness.tone}`}>
              <strong>{readiness.label}</strong>
              <p>{readiness.message}</p>
            </div>
            <p>{session.evaluation?.narrative}</p>
            <ul className="list">
              <li>Readiness band: {session.evaluation?.readinessBand}</li>
              <li>Parent summary: {session.evaluation?.parentSummary}</li>
              <li>School summary: {session.evaluation?.schoolSummary}</li>
            </ul>
            <div className="actions">
              <Link
                className={`button proof-help-button ${score < 65 ? "proof-help-button--support" : "proof-help-button--placement"}`}
                to={{
                  pathname: routePaths.dashboardCareerHelp,
                  search: createSearchParams({
                    score: String(score),
                    career: session.careerTitle,
                    technology: isTechnology ? "1" : "0"
                  }).toString()
                }}
              >
                {getCareerHelpCta(score)}
              </Link>
            </div>
          </Card>
        );
      })}
    </div>
  );
});
