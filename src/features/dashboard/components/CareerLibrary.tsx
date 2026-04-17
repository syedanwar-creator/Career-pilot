import { memo } from "react";
import { Link } from "react-router-dom";

import type { Career } from "@/features/dashboard/types";
import { buildDashboardCareerDetailPath } from "@/routes/paths";
import { Card, EmptyState, Field } from "@/shared/components";
import { labelize } from "@/shared/utils";

interface CareerLibraryProps {
  categories: string[];
  careers: Career[];
  category: string;
  search: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export const CareerLibrary = memo(function CareerLibrary({
  categories,
  careers,
  category,
  onCategoryChange,
  onSearchChange,
  search
}: CareerLibraryProps): JSX.Element {
  return (
    <div className="stack">
      <Card className="career-library-hero">
        <div className="career-library-hero__copy">
          <div>
            <p className="eyebrow">Career explorer</p>
            <h1>Choose a career to inspect in depth</h1>
          </div>
          <p>
            Start with the library view, then open a dedicated career profile to see the full real-world path,
            salary progression, challenges, and the proof-based readiness flow.
          </p>
        </div>
        <div className="career-library-hero__stats" aria-label="Career library summary">
          <div className="career-library-stat">
            <strong>{careers.length}</strong>
            <span>Careers shown</span>
          </div>
          <div className="career-library-stat">
            <strong>{categories.length}</strong>
            <span>Categories</span>
          </div>
        </div>
        <div className="form-row">
          <Field htmlFor="career-search" label="Search">
            <input
              id="career-search"
              className="input"
              value={search}
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

      <Card className="stack">
        <div className="card__header">
          <div>
            <p className="eyebrow">{careers.length} careers shown</p>
            <h2>Career cards</h2>
          </div>
        </div>

        {careers.length ? (
          <div className="career-library-grid">
            {careers.map((career) => (
              <Link
                key={career.id}
                aria-label={`Open ${career.title} career profile`}
                className="career-library-card"
                to={buildDashboardCareerDetailPath(career.id)}
              >
                <div className="career-library-card__top">
                  <div>
                    <p className="eyebrow">{career.category}</p>
                    <h3>{career.title}</h3>
                  </div>
                  <span className="pill">Demand {career.futureOutlook.demandScore}%</span>
                </div>

                <p className="career-library-card__summary">{career.summary}</p>

                <div className="career-library-card__footer">
                  <div className="career-library-card__tags" aria-label="Career tags">
                    {(career.interestTags.length ? career.interestTags : career.demandTags).slice(0, 2).map((tag) => (
                      <span key={tag} className="career-library-card__tag">
                        {labelize(tag)}
                      </span>
                    ))}
                  </div>
                  <span className="career-library-card__cta">Open career profile</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No careers match this filter"
            description="Try a different keyword or clear the category to browse more career paths."
          />
        )}
      </Card>
    </div>
  );
});
