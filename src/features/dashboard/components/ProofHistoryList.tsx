import { memo } from "react";

import type { ProofSession } from "@/features/dashboard/types";
import { Card } from "@/shared/components";
import { formatDate, getProofReadinessState } from "@/shared/utils";

interface ProofHistoryListProps {
  sessions: ProofSession[];
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
        const readiness = getProofReadinessState(session.evaluation?.overallScore || 0);

        return (
          <Card key={session.id}>
            <div className="card__header">
              <div>
                <p className="eyebrow">{session.careerTitle}</p>
                <h3>{session.evaluation?.points || 0} points</h3>
              </div>
              <div className="actions">
                <span className={`pill pill--${readiness.tone}`}>
                  {readiness.label} {session.evaluation?.overallScore || 0}%
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
          </Card>
        );
      })}
    </div>
  );
});
