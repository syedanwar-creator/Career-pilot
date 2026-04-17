import { memo } from "react";

import type { ProfileAnalysis } from "@/features/dashboard/types";
import { Card } from "@/shared/components";

interface ProfileInsightCardsProps {
  analysis: ProfileAnalysis;
}

const traitDescriptions: Record<string, string> = {
  Analytical: "Breaks problems into steps and tends to think before acting.",
  Creativity: "Generates alternatives and stays open to non-obvious ideas.",
  Empathy: "Reads people well and is likely to be considerate in group settings.",
  Resilience: "Recovers from setbacks without losing forward motion.",
  Communication: "Can express thoughts clearly and work through conversations.",
  Discipline: "Can follow structure, routines, and expectations with consistency.",
  Leadership: "Shows readiness to guide, influence, or take ownership when needed.",
  Independence: "Can move forward without constant reassurance or supervision.",
  Adaptability: "Can adjust when plans, people, or environments change.",
  "Physical Stamina": "Has more comfort with active, demanding, or field-based work."
};

export const ProfileInsightCards = memo(function ProfileInsightCards({
  analysis
}: ProfileInsightCardsProps): JSX.Element {
  const dominantTraits = analysis.dominantTraits.map((item) => ({
    name: item,
    score: analysis.personalityScores[item.charAt(0).toLowerCase() + item.slice(1).replace(/\s+/g, "")] || 0,
    description: traitDescriptions[item] || "This trait appears repeatedly in the student profile."
  }));

  const cautionAreas = analysis.cautionAreas.map((item) => ({
    name: item,
    score: analysis.personalityScores[item.charAt(0).toLowerCase() + item.slice(1).replace(/\s+/g, "")] || 0,
    description:
      traitDescriptions[item] || "This area may need more practice, structure, or real-world exposure."
  }));

  return (
    <div className="grid grid--three profile-insight-grid">
      <Card className="profile-insight-card profile-insight-card--summary">
        <p className="eyebrow">Character summary</p>
        <h3>{analysis.summary}</h3>
        <p>{analysis.characterReadout}</p>
        {analysis.workPreferences.length ? (
          <div className="stack">
            <p className="eyebrow">Detailed readout</p>
            <ul className="list">
              {analysis.workPreferences.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </Card>
      <Card className="profile-insight-card">
        <p className="eyebrow">Dominant traits</p>
        <div className="profile-trait-list">
          {dominantTraits.map((item) => (
            <article key={item.name} className="profile-trait-item">
              <div className="profile-trait-item__header">
                <strong>{item.name}</strong>
                <span className="pill pill--success">{item.score}%</span>
              </div>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </Card>
      <Card className="profile-insight-card">
        <p className="eyebrow">Caution areas</p>
        <div className="profile-trait-list">
          {cautionAreas.map((item) => (
            <article key={item.name} className="profile-trait-item profile-trait-item--caution">
              <div className="profile-trait-item__header">
                <strong>{item.name}</strong>
                <span className="pill pill--warning">{item.score}%</span>
              </div>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
});
