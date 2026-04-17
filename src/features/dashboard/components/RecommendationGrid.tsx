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
            <span className="pill pill--success">Fit {item.fitScore}%</span>
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
