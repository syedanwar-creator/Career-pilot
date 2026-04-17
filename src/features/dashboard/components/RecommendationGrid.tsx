import { memo } from "react";

import type { Recommendation } from "@/features/dashboard/types";
import { Button, Card } from "@/shared/components";

interface RecommendationGridProps {
  items: Recommendation[];
  onOpenCareer: (careerId: string) => void;
}

export const RecommendationGrid = memo(function RecommendationGrid({
  items,
  onOpenCareer
}: RecommendationGridProps): JSX.Element {
  return (
    <div className="grid grid--cards">
      {items.map((item) => (
        <Card key={item.id}>
          <div className="card__header">
            <div>
              <p className="eyebrow">Recommended career</p>
              <h3>{item.title}</h3>
            </div>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              padding: "4px 10px", borderRadius: "999px",
              background: "#dcfce7", border: "1px solid #86efac",
              fontSize: "12px", fontWeight: 700, color: "#16a34a",
              letterSpacing: "0.01em", flexShrink: 0,
            }}>
              <span style={{ fontSize: "11px", fontWeight: 900 }}>✓</span>
              Fit {item.fitScore}%
            </span>
          </div>
          <p>{item.summary}</p>
          <ul className="list">
            {item.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
          <Button variant="secondary" onClick={() => onOpenCareer(item.id)}>
            View details
          </Button>
        </Card>
      ))}
    </div>
  );
});
