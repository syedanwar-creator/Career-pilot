import { renderCareerDetail, renderCareerGrid, renderProofSummary, renderRecommendationsCards } from "../components/shared.js";
import { escapeHtml, formatDate, getProofReadinessState, labelize } from "../utils/format.js";

function renderStudentTabs(activeTab) {
  const tabs = [
    ["dashboard", "Dashboard"],
    ["profile", "AI Profile Studio"],
    ["careers", "Career Explorer"],
    ["proof", "Proof Center"]
  ];

  return `
    <nav class="tab-nav">
      ${tabs
        .map(
          ([id, label]) => `
            <button class="tab-button ${activeTab === id ? "tab-button--active" : ""}" data-action="set-student-tab" data-tab="${id}">
              ${escapeHtml(label)}
            </button>
          `
        )
        .join("")}
    </nav>
  `;
}

function renderStudentHeader(state) {
  const dashboard = state.dashboard || {};
  const latestProof = dashboard.proofSessions?.[0];
  const recommendations = dashboard.recommendations || [];

  return `
    <header class="panel hero hero--student">
      <div class="hero__copy">
        <p class="eyebrow">Student Workspace</p>
        <h1>${escapeHtml(state.session.user.fullName)}</h1>
        <p>
          This dashboard uses your AI profile interview, personality signals, and proof sessions to recommend careers and
          help you build evidence for parents and school mentors.
        </p>
      </div>
      <div class="hero__stats">
        <div class="stat-card">
          <strong>${recommendations.length}</strong>
          <span>Top recommendations ready</span>
        </div>
        <div class="stat-card">
          <strong>${dashboard.totalPoints || 0}</strong>
          <span>Career proof points</span>
        </div>
        <div class="stat-card">
          <strong>${latestProof?.evaluation?.overallScore || "--"}${latestProof ? "%" : ""}</strong>
          <span>Latest readiness score</span>
        </div>
      </div>
    </header>
  `;
}

function renderProfileStudio(state) {
  const profile = state.dashboard?.profile;
  const basicInfo = state.profileDraft || profile?.basicInfo || {};
  const analysis = profile?.analysis;
  const questionSet = state.profileQuestionSet;

  return `
    <section class="panel stack">
      <div class="section-header">
        <div>
          <p class="eyebrow">Requirement 2</p>
          <h2>AI-driven student profile creation</h2>
        </div>
        <p>
          The system gathers profile basics, requests AI-generated random assessment questions, and then analyzes the
          student’s character and personality for career matching.
        </p>
      </div>

      <form id="profile-form" class="stack">
        <div class="field-grid">
          <label class="field">
            <span>Age range</span>
            <input class="input" type="text" name="ageRange" value="${escapeHtml(basicInfo.ageRange || "")}" placeholder="14-16" />
          </label>
          <label class="field">
            <span>Grade / stage</span>
            <input class="input" type="text" name="grade" value="${escapeHtml(basicInfo.grade || state.session.user.grade || "")}" />
          </label>
        </div>

        <label class="field">
          <span>Favorite subjects</span>
          <input class="input" type="text" name="favoriteSubjects" value="${escapeHtml(basicInfo.favoriteSubjects || "")}" placeholder="Math, Biology, History" />
        </label>

        <label class="field">
          <span>Favorite activities</span>
          <textarea class="textarea" name="favoriteActivities" rows="2" placeholder="Clubs, sports, hobbies, practical activities">${escapeHtml(
            basicInfo.favoriteActivities || ""
          )}</textarea>
        </label>

        <label class="field">
          <span>Topics you are curious about</span>
          <textarea class="textarea" name="topicsCuriousAbout" rows="2" placeholder="Technology, health, travel, design, law">${escapeHtml(
            basicInfo.topicsCuriousAbout || ""
          )}</textarea>
        </label>

        <label class="field">
          <span>Your current strengths</span>
          <textarea class="textarea" name="personalStrengths" rows="2" placeholder="What people say you are good at">${escapeHtml(
            basicInfo.personalStrengths || ""
          )}</textarea>
        </label>

        <label class="field">
          <span>Things you avoid or dislike</span>
          <textarea class="textarea" name="avoidsOrDislikes" rows="2" placeholder="What drains you or feels like a bad fit">${escapeHtml(
            basicInfo.avoidsOrDislikes || ""
          )}</textarea>
        </label>

        <div class="actions">
          <button class="button button--secondary" type="button" data-action="generate-profile-questions">Generate AI question set</button>
          <button class="button button--primary" type="submit" ${questionSet ? "" : "disabled"}>Submit profile and analyze</button>
        </div>

        ${
          questionSet
            ? `
              <section class="stack">
                <div class="section-header">
                  <div>
                    <p class="eyebrow">${escapeHtml(questionSet.source || "AI")}</p>
                    <h3>Random assessment questions</h3>
                  </div>
                </div>
                ${questionSet.questions
                  .map(
                    (question, index) => `
                      <article class="question-card">
                        <p class="eyebrow">${escapeHtml(labelize(question.dimension))}</p>
                        <h3>Q${index + 1}. ${escapeHtml(question.question)}</h3>
                        <p>${escapeHtml(question.whyItMatters || "")}</p>
                        <div class="option-grid">
                          ${question.options
                            .map(
                              (option, optionIndex) => `
                                <label class="option-card">
                                  <input type="radio" name="question-${question.id}" value="${optionIndex}" required />
                                  <span>${escapeHtml(option)}</span>
                                </label>
                              `
                            )
                            .join("")}
                        </div>
                      </article>
                    `
                  )
                  .join("")}
              </section>
            `
            : `
              <div class="empty-state">
                <p>Generate the AI question set first. If no Gemini key is configured, the platform will use a structured fallback interview so the app still works.</p>
              </div>
            `
        }
      </form>

      ${
        analysis
          ? `
            <section class="feature-grid">
              <article class="info-card">
                <p class="eyebrow">Character Readout</p>
                <h3>${escapeHtml(analysis.summary)}</h3>
                <p>${escapeHtml(analysis.characterReadout)}</p>
              </article>
              <article class="info-card">
                <p class="eyebrow">Dominant Traits</p>
                <ul class="list">${analysis.dominantTraits.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
              </article>
              <article class="info-card">
                <p class="eyebrow">Caution Areas</p>
                <ul class="list">${analysis.cautionAreas.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
              </article>
            </section>
          `
          : ""
      }
    </section>
  `;
}

function renderDashboardTab(state) {
  const dashboard = state.dashboard || {};
  const profile = dashboard.profile;
  const latestProof = dashboard.proofSessions?.[0];

  return `
    <section class="stack">
      ${
        profile
          ? `
            <article class="panel info-card">
              <p class="eyebrow">Student Character Summary</p>
              <h2>${escapeHtml(profile.analysis.summary)}</h2>
              <p>${escapeHtml(profile.analysis.characterReadout)}</p>
            </article>
          `
          : `
            <article class="panel empty-state">
              <h2>Complete the AI profile studio first</h2>
              <p>Your dashboard recommendations appear after the profile interview analyzes your interests, character, and personality.</p>
              <button class="button button--primary" data-action="set-student-tab" data-tab="profile">Open profile studio</button>
            </article>
          `
      }

      ${
        dashboard.recommendations?.length
          ? `
            <section class="panel stack">
              <div class="section-header">
                <div>
                  <p class="eyebrow">Requirement 3</p>
                  <h2>Careers recommended from your characteristics</h2>
                </div>
              </div>
              ${renderRecommendationsCards(dashboard.recommendations, 6)}
            </section>
          `
          : ""
      }

      ${latestProof ? renderProofSummary(latestProof) : ""}
    </section>
  `;
}

function renderCareerExplorer(state) {
  return `
    <section class="stack">
      <section class="panel stack">
        <div class="section-header">
          <div>
            <p class="eyebrow">Requirement 4</p>
            <h2>Career explorer with 150+ detailed careers</h2>
          </div>
          <p>
            Search by keyword or category, then open a career to see how to become one, challenges, positives, negatives,
            salary growth, and resilience during major global crises.
          </p>
        </div>

        <div class="field-grid">
          <label class="field">
            <span>Search</span>
            <input class="input" type="text" id="career-search" value="${escapeHtml(state.careerSearch || "")}" placeholder="Search a career title or category" />
          </label>
          <label class="field">
            <span>Category</span>
            <select class="input" id="career-category">
              <option value="">All categories</option>
              ${state.careerCategories
                .map(
                  (category) => `
                    <option value="${escapeHtml(category)}" ${state.careerCategory === category ? "selected" : ""}>
                      ${escapeHtml(category)}
                    </option>
                  `
                )
                .join("")}
            </select>
          </label>
        </div>
      </section>

      <section class="layout-two-col">
        <div class="panel stack">
          <div class="section-header">
            <div>
              <p class="eyebrow">${state.filteredCareers.length} careers shown</p>
              <h2>Career cards</h2>
            </div>
          </div>
          ${renderCareerGrid(state.filteredCareers, state.selectedCareer?.id)}
        </div>

        ${renderCareerDetail(state.selectedCareer, { showProofButton: true })}
      </section>
    </section>
  `;
}

function renderProofCenter(state) {
  const history = state.dashboard?.proofSessions || [];

  return `
    <section class="stack">
      <section class="panel stack">
        <div class="section-header">
          <div>
            <p class="eyebrow">Requirement 5 + 6</p>
            <h2>Career proof center</h2>
          </div>
          <p>
            Each proof session asks 8 mental-readiness questions for a specific career. The result becomes a score,
            a parent-facing summary, and a school-facing support note.
          </p>
        </div>
        <div class="stat-strip">
          <div class="stat-card">
            <strong>${history.length}</strong>
            <span>Completed proof sessions</span>
          </div>
          <div class="stat-card">
            <strong>${state.dashboard?.totalPoints || 0}</strong>
            <span>Total proof points collected</span>
          </div>
          <div class="stat-card">
            <strong>${history[0]?.evaluation?.points || 0}</strong>
            <span>Latest parent-proof points</span>
          </div>
        </div>
      </section>

      ${
        state.currentProofSession
          ? `
            <form id="proof-session-form" class="panel stack">
              <div class="section-header">
                <div>
                  <p class="eyebrow">${escapeHtml(state.currentProofSession.questionSet.source || "AI")}</p>
                  <h2>${escapeHtml(state.currentProofSession.careerTitle)}</h2>
                </div>
              </div>
              <p>${escapeHtml(state.currentProofSession.questionSet.introduction)}</p>
              ${state.currentProofSession.questionSet.questions
                .map(
                  (question, index) => `
                    <article class="question-card">
                      <p class="eyebrow">${escapeHtml(labelize(question.dimension))}</p>
                      <h3>Q${index + 1}. ${escapeHtml(question.question)}</h3>
                      <p>${escapeHtml(question.whyItMatters || "")}</p>
                      <div class="option-grid">
                        ${question.options
                          .map(
                            (option, optionIndex) => `
                              <label class="option-card">
                                <input type="radio" name="proof-${question.id}" value="${optionIndex}" required />
                                <span>${escapeHtml(option)}</span>
                              </label>
                            `
                          )
                          .join("")}
                      </div>
                    </article>
                  `
                )
                .join("")}
              <div class="actions">
                <button class="button button--primary" type="submit">Submit proof session</button>
              </div>
            </form>
          `
          : `
            <article class="panel empty-state">
              <h2>No active proof session</h2>
              <p>Open a career in the explorer and use “Prove I Am Ready For This Career” to begin the 8-question readiness proof.</p>
              <button class="button button--secondary" data-action="set-student-tab" data-tab="careers">Go to career explorer</button>
            </article>
          `
      }

      <section class="panel stack">
        <div class="section-header">
          <div>
            <p class="eyebrow">History</p>
            <h2>Completed proof evidence</h2>
          </div>
        </div>
        ${
          history.length
            ? history
                .map((session) => {
                  const readiness = getProofReadinessState(session.evaluation.overallScore);

                  return `
                    <article class="info-card">
                      <div class="data-card__header">
                        <div>
                          <p class="eyebrow">${escapeHtml(session.careerTitle)}</p>
                          <h3>${session.evaluation.points} points</h3>
                        </div>
                        <div class="score-group">
                          <span class="score-chip ${readiness.tone}">${session.evaluation.overallScore}% readiness</span>
                          <span class="score-chip">${formatDate(session.completedAt)}</span>
                        </div>
                      </div>
                      <div class="proof-status ${readiness.tone}">
                        <strong>${escapeHtml(readiness.label)}</strong>
                        <p>${escapeHtml(readiness.message)}</p>
                      </div>
                      <p>${escapeHtml(session.evaluation.narrative)}</p>
                      <ul class="list">
                        <li>Readiness band: ${escapeHtml(session.evaluation.readinessBand || readiness.label)}</li>
                        <li>Parent summary: ${escapeHtml(session.evaluation.parentSummary)}</li>
                        <li>School summary: ${escapeHtml(session.evaluation.schoolSummary)}</li>
                      </ul>
                    </article>
                  `;
                })
                .join("")
            : `<div class="empty-state"><p>No proof sessions completed yet.</p></div>`
        }
      </section>
    </section>
  `;
}

export function renderStudentView(state) {
  const activeTab = state.activeStudentTab || "dashboard";

  let content = renderDashboardTab(state);

  if (activeTab === "profile") {
    content = renderProfileStudio(state);
  } else if (activeTab === "careers") {
    content = renderCareerExplorer(state);
  } else if (activeTab === "proof") {
    content = renderProofCenter(state);
  }

  return `
    <div class="app-shell">
      ${renderStudentHeader(state)}
      ${
        state.notice
          ? `<div class="notice ${state.noticeTone || ""}">${escapeHtml(state.notice)}</div>`
          : ""
      }
      ${renderStudentTabs(activeTab)}
      ${content}
    </div>
  `;
}
