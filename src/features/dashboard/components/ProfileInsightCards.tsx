import { memo } from "react";

import type { ProfileAnalysis } from "@/features/dashboard/types";
import { Card } from "@/shared/components";

interface ProfileInsightCardsProps {
  analysis: ProfileAnalysis;
}

export const ProfileInsightCards = memo(function ProfileInsightCards({
  analysis
}: ProfileInsightCardsProps): JSX.Element {
  return (
    <div className="grid grid--three">
      <Card>
        <p className="eyebrow">Character summary</p>
        <h3>{analysis.summary}</h3>
        <p>{analysis.characterReadout}</p>
      </Card>
      <Card>
        <p className="eyebrow">Dominant traits</p>
        <ul className="list">
          {analysis.dominantTraits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>
      <Card>
        <p className="eyebrow">Caution areas</p>
        <ul className="list">
          {analysis.cautionAreas.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
});
