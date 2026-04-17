import { escapeHtml, formatDate, formatLpa, getProofReadinessState, getScoreTone, labelize } from "../utils/format.js";

function renderBar(label, value, max = 100, suffix = "%") {
  const width = Math.max(6, Math.min((value / max) * 100, 100));
  return `
    <div class="metric-row">
      <div class="metric-row__top">
        <span>${escapeHtml(label)}</span>
        <strong>${value}${suffix}</strong>
      </div>
      <div class="metric-bar">
        <span style="width:${width}%"></span>
      </div>
    </div>
  `;
}

function renderProofStatus(evaluation) {
  const readiness = getProofReadinessState(evaluation?.overallScore);

  return `
    <div class="proof-status ${readiness.tone}">
      <strong>${escapeHtml(readiness.label)}</strong>
      <p>${escapeHtml(readiness.message)}</p>
    </div>
  `;
}

export function renderRecommendationsCards(recommendations = [], limit = 6) {
  return `
    <div class="card-grid">
      ${recommendations
        .slice(0, limit)
        .map(
          (item) => `
            <article class="data-card">
              <div class="data-card__header">
                <div>
                  <p class="eyebrow">Recommended Career</p>
                  <h3>${escapeHtml(item.title)}</h3>
                </div>
                <span class="score-chip ${getScoreTone(item.fitScore)}">${item.fitScore}%</span>
              </div>
              <p>${escapeHtml(item.summary)}</p>
              <ul class="list">
                ${item.reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}
              </ul>
              <button class="button button--secondary" data-action="open-career" data-career-id="${item.id}">View details</button>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

export function renderCareerGrid(careers = [], selectedCareerId = "") {
  return `
    <div class="card-grid card-grid--compact">
      ${careers
        .map(
          (career) => `
            <article class="career-card ${career.id === selectedCareerId ? "career-card--active" : ""}">
              <div class="career-card__top">
                <div>
                  <p class="eyebrow">${escapeHtml(career.category)}</p>
                  <h3>${escapeHtml(career.title)}</h3>
                </div>
                ${
                  typeof career.fitScore === "number"
                    ? `<span class="score-chip ${getScoreTone(career.fitScore)}">${career.fitScore}%</span>`
                    : ""
                }
              </div>
              <p>${escapeHtml(career.summary || career.overview)}</p>
              <div class="mini-meta">
                <span>Resilience ${career.crisisResilience?.score || career.crisisResilience || "NA"}%</span>
                <span>Demand ${career.futureOutlook?.demandScore || "NA"}%</span>
              </div>
              <button class="button button--secondary" data-action="open-career" data-career-id="${career.id}">Open career</button>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

export function renderCareerDetail(career, options = {}) {
  if (!career) {
    return `
      <div class="panel detail-panel">
        <p class="eyebrow">Career Detail</p>
        <h2>Select a career</h2>
        <p>Pick any career card to view the full real-world details, salary progression, readiness expectations, and proof path.</p>
      </div>
    `;
  }

  const salaryEntries = Object.entries(career.salaryProgressionLakhsINR || {});

  return `
    <div class="panel detail-panel stack">
      <div class="section-header">
        <div>
          <p class="eyebrow">${escapeHtml(career.category)}</p>
          <h2>${escapeHtml(career.title)}</h2>
        </div>
        <div class="score-group">
          <span class="score-chip ${getScoreTone(career.crisisResilience.score)}">Resilience ${career.crisisResilience.score}%</span>
          <span class="score-chip ${getScoreTone(career.futureOutlook.demandScore)}">Demand ${career.futureOutlook.demandScore}%</span>
        </div>
      </div>

      <p>${escapeHtml(career.summary)}</p>

      <div class="feature-grid">
        <article class="info-card">
          <p class="eyebrow">How To Become One</p>
          <ol class="ordered-list">
            ${career.howToBecome.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ol>
        </article>
        <article class="info-card">
          <p class="eyebrow">World Crisis Resilience</p>
          <h3>${escapeHtml(career.crisisResilience.label)}</h3>
          <p>${escapeHtml(career.crisisResilience.explanation)}</p>
          <ul class="list">
            <li>Demand score: ${career.futureOutlook.demandScore}%</li>
            <li>Automation risk: ${career.futureOutlook.automationRisk}%</li>
            <li>Work reality: ${escapeHtml(career.realWorldReality.workSettings)}</li>
          </ul>
        </article>
      </div>

      <div class="feature-grid">
        <article class="info-card">
          <p class="eyebrow">Positives</p>
          <ul class="list">
            ${career.positives.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </article>
        <article class="info-card">
          <p class="eyebrow">Challenges</p>
          <ul class="list">
            ${career.challenges.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </article>
        <article class="info-card">
          <p class="eyebrow">Negatives</p>
          <ul class="list">
            ${career.negatives.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </article>
      </div>

      <article class="info-card">
        <p class="eyebrow">Salary Graph In INR (Approx LPA)</p>
        <div class="salary-chart">
          ${salaryEntries
            .map(([level, amount]) => {
              const width = Math.max(8, Math.min((amount / 60) * 100, 100));
              return `
                <div class="salary-row">
                  <div class="salary-row__meta">
                    <span>${escapeHtml(labelize(level))}</span>
                    <strong>${formatLpa(amount)}</strong>
                  </div>
                  <div class="salary-bar"><span style="width:${width}%"></span></div>
                </div>
              `;
            })
            .join("")}
        </div>
      </article>

      <article class="info-card">
        <p class="eyebrow">Career Reality</p>
        <ul class="list">
          <li>Training route: ${escapeHtml(career.trainingRoute)}</li>
          <li>Practical path: ${escapeHtml(career.practiceRoute)}</li>
          <li>Pressure areas: ${career.demandTags.map((item) => escapeHtml(labelize(item))).join(", ")}</li>
          <li>Fit signals: ${career.interestTags.map((item) => escapeHtml(labelize(item))).join(", ")}</li>
        </ul>
      </article>

      ${
        options.showProofButton
          ? `<div class="actions"><button class="button button--primary" data-action="start-proof" data-career-id="${career.id}">Prove I Am Ready For This Career</button></div>`
          : ""
      }
    </div>
  `;
}

export function renderProofSummary(session) {
  if (!session?.evaluation) {
    return "";
  }

  const readiness = getProofReadinessState(session.evaluation.overallScore);

  return `
    <article class="info-card">
      <p class="eyebrow">Latest Career Proof Result</p>
      <div class="data-card__header">
        <div>
          <h3>${escapeHtml(session.careerTitle)}</h3>
          <p>Completed on ${formatDate(session.completedAt)}</p>
        </div>
        <div class="score-group">
          <span class="score-chip ${readiness.tone}">${session.evaluation.points} pts</span>
          <span class="score-chip ${readiness.tone}">${session.evaluation.overallScore}% readiness</span>
        </div>
      </div>
      ${renderProofStatus(session.evaluation)}
      <p>${escapeHtml(session.evaluation.narrative)}</p>
      <div class="feature-grid">
        <article class="info-card info-card--muted">
          <p class="eyebrow">Parent Proof</p>
          <p>${escapeHtml(session.evaluation.parentSummary)}</p>
        </article>
        <article class="info-card info-card--muted">
          <p class="eyebrow">School Support</p>
          <p>${escapeHtml(session.evaluation.schoolSummary)}</p>
        </article>
      </div>
      <div class="stack">
        ${Object.entries(session.evaluation.dimensionScores || {})
          .map(([dimension, score]) => renderBar(labelize(dimension), score))
          .join("")}
      </div>
    </article>
  `;
}
