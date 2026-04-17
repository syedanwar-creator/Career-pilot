import { memo, useMemo } from "react";
import { Link } from "react-router-dom";

import type { Career } from "@/features/dashboard/types";
import { routePaths } from "@/routes/paths";
import { Card, Field } from "@/shared/components";
import { formatLpa, labelize } from "@/shared/utils";

interface CareerExplorerProps {
  categories: string[];
  careers: Career[];
  search: string;
  category: string;
  selectedCareer: Career | null;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSelectCareer: (careerId: string) => void;
}

export const CareerExplorer = memo(function CareerExplorer({
  categories,
  careers,
  category,
  onCategoryChange,
  onSearchChange,
  onSelectCareer,
  search,
  selectedCareer
}: CareerExplorerProps): JSX.Element {
  const salaryProgressMax = useMemo(() => {
    if (!selectedCareer) {
      return 1;
    }

    return Math.max(...Object.values(selectedCareer.salaryProgressionLakhsINR), 1);
  }, [selectedCareer]);

  return (
    <div className="stack">
      <Card>
        <div className="card__header">
          <div>
            <p className="eyebrow">Career explorer</p>
            <h2>Search the full library</h2>
          </div>
        </div>
        <div className="form-row">
          <Field htmlFor="career-search" label="Search">
            <input
              id="career-search"
              className="input"
              value={search}
              placeholder="🔍  Search careers, e.g. Engineer, Doctor..."
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </Field>
          <Field htmlFor="career-category" label="Category">
            <select
              id="career-category"
              className="input"
              value={category}
              onChange={(event) => onCategoryChange(event.target.value)}
            >
              <option value="">All categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Card>

      <div className="split-layout">
        <Card className="stack">
          <div className="card__header">
            <div>
              <p className="eyebrow">{careers.length} careers shown</p>
              <h2>Career cards</h2>
            </div>
          </div>
          <div className="grid grid--cards">
            {careers.map((career) => (
              <button
                key={career.id}
                type="button"
                aria-pressed={selectedCareer?.id === career.id}
                className={`select-card ${selectedCareer?.id === career.id ? "select-card--active" : ""}`}
                onClick={() => onSelectCareer(career.id)}
              >
                <div className="card__header">
                  <div>
                    <p className="eyebrow">{career.category}</p>
                    <h3>{career.title}</h3>
                  </div>
                  <span style={{ display:"inline-flex", alignItems:"center", padding:"3px 9px", borderRadius:"999px", background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.2)", fontSize:"11px", fontWeight:700, color:"#6366f1", flexShrink:0 }}>
                    {career.futureOutlook.demandScore}% demand
                  </span>
                </div>
                <p>{career.summary}</p>
              </button>
            ))}
          </div>
        </Card>

        <Card className="stack">
          {selectedCareer ? (
            <>
              <div className="card__header">
                <div>
                  <p className="eyebrow">{selectedCareer.category}</p>
                  <h2>{selectedCareer.title}</h2>
                </div>
                <div className="actions">
                  <span style={{ display:"inline-flex", alignItems:"center", padding:"4px 10px", borderRadius:"999px", background:"#dcfce7", border:"1px solid #86efac", fontSize:"12px", fontWeight:700, color:"#16a34a" }}>
                    ✓ {selectedCareer.crisisResilience.score}% resilience
                  </span>
                  <span style={{ display:"inline-flex", alignItems:"center", padding:"4px 10px", borderRadius:"999px", background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.2)", fontSize:"12px", fontWeight:700, color:"#6366f1" }}>
                    {selectedCareer.futureOutlook.demandScore}% demand
                  </span>
                </div>
              </div>
              <p>{selectedCareer.summary}</p>
              <div className="grid grid--three">
                <Card>
                  <p className="eyebrow">How to become one</p>
                  <ol className="list list--ordered">
                    {selectedCareer.howToBecome.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </Card>
                <Card>
                  <p className="eyebrow">Challenges</p>
                  <ul className="list">
                    {selectedCareer.challenges.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Card>
                <Card>
                  <p className="eyebrow">Negatives</p>
                  <ul className="list">
                    {selectedCareer.negatives.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Card>
              </div>
              <Card>
                <p className="eyebrow">Salary progression</p>
                <div className="stack">
                  {Object.entries(selectedCareer.salaryProgressionLakhsINR).map(([level, value]) => (
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
              <Card>
                <p className="eyebrow">Career reality</p>
                <ul className="list">
                  <li>Training route: {selectedCareer.trainingRoute}</li>
                  <li>Practical path: {selectedCareer.practiceRoute}</li>
                  <li>Pressure areas: {selectedCareer.demandTags.map((item) => labelize(item)).join(", ")}</li>
                  <li>Work setting: {selectedCareer.realWorldReality.workSettings}</li>
                </ul>
              </Card>
              <div className="actions">
                <Link className="button button--primary" to={`${routePaths.dashboardProof}?careerId=${selectedCareer.id}`}>
                  Prove I am ready
                </Link>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <h2>Select a career</h2>
              <p>Pick any career card to review the full detail set and start a proof session.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
});
