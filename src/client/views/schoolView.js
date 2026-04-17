import { renderCareerDetail, renderCareerGrid } from "../components/shared.js";
import { escapeHtml, formatDate, getProofReadinessState } from "../utils/format.js";

function renderSchoolTabs(activeTab) {
  const tabs = [
    ["overview", "School Overview"],
    ["students", "Students"],
    ["careers", "Career Library"]
  ];

  return `
    <nav class="tab-nav">
      ${tabs
        .map(
          ([id, label]) => `
            <button class="tab-button ${activeTab === id ? "tab-button--active" : ""}" data-action="set-school-tab" data-tab="${id}">
              ${escapeHtml(label)}
            </button>
          `
        )
        .join("")}
    </nav>
  `;
}

function renderSchoolHeader(state) {
  const overview = state.schoolOverview;

  return `
    <header class="panel hero hero--student">
      <div class="hero__copy">
        <p class="eyebrow">School Tenant Workspace</p>
        <h1>${escapeHtml(state.session.tenant?.name || "School")}</h1>
        <p>
          Keep students under one roof, guide them through AI profiling, review career proof points, and support the
          right career path with actual evidence instead of assumptions.
        </p>
      </div>
      <div class="hero__stats">
        <div class="stat-card">
          <strong>${overview?.stats?.totalStudents || 0}</strong>
          <span>Managed students</span>
        </div>
        <div class="stat-card">
          <strong>${overview?.stats?.completedProfiles || 0}</strong>
          <span>Completed profiles</span>
        </div>
        <div class="stat-card">
          <strong>${overview?.stats?.totalPoints || 0}</strong>
          <span>Total proof points</span>
        </div>
      </div>
    </header>
  `;
}

function renderOverviewTab(state) {
  const overview = state.schoolOverview;

  return `
    <section class="stack">
      <section class="panel stack">
        <div class="section-header">
          <div>
            <p class="eyebrow">Tenant Control</p>
            <h2>School overview</h2>
          </div>
        </div>
        <div class="feature-grid">
          <article class="info-card">
            <p class="eyebrow">Tenant slug</p>
            <h3>${escapeHtml(overview?.tenant?.slug || "Not available")}</h3>
            <p>Students can self-join using the tenant slug or the join code.</p>
          </article>
          <article class="info-card">
            <p class="eyebrow">Join code</p>
            <h3>${escapeHtml(overview?.tenant?.joinCode || "Not available")}</h3>
            <p>Share this code with students if you want them to register under your school workspace.</p>
          </article>
          <article class="info-card">
            <p class="eyebrow">School readiness</p>
            <h3>${overview?.stats?.proofCount || 0} students with proof records</h3>
            <p>Use proof reports to guide mentoring, parent meetings, and career support interventions.</p>
          </article>
        </div>
      </section>

      <section class="panel stack">
        <div class="section-header">
          <div>
            <p class="eyebrow">Student ranking</p>
            <h2>Students under one roof</h2>
          </div>
        </div>
        <div class="card-grid">
          ${(overview?.students || [])
            .slice(0, 6)
            .map(
              (item) => `
                <article class="data-card">
                  <div class="data-card__header">
                    <div>
                      <p class="eyebrow">${escapeHtml(item.student.grade || "Grade not set")}</p>
                      <h3>${escapeHtml(item.student.fullName)}</h3>
                    </div>
                    <span class="score-chip">${item.totalPoints} pts</span>
                  </div>
                  <p>${item.profileCompleted ? "AI profile completed." : "Profile still pending."}</p>
                  <ul class="list">
                    <li>Top recommendation: ${escapeHtml(item.topRecommendation?.title || "Not generated yet")}</li>
                    <li>Latest proof: ${escapeHtml(item.latestProof?.careerTitle || "No completed proof yet")}</li>
                  </ul>
                  <button class="button button--secondary" data-action="view-student-detail" data-student-id="${item.student.id}">Open student</button>
                </article>
              `
            )
            .join("")}
        </div>
      </section>
    </section>
  `;
}

function renderStudentsTab(state) {
  const overview = state.schoolOverview;
  const detail = state.selectedSchoolStudent;

  return `
    <section class="layout-two-col">
      <div class="stack">
        <section class="panel stack">
          <div class="section-header">
            <div>
              <p class="eyebrow">Create Student</p>
              <h2>Onboard a student into this tenant</h2>
            </div>
          </div>
          <form id="school-student-create-form" class="stack">
            <label class="field">
              <span>Student full name</span>
              <input class="input" type="text" name="fullName" required />
            </label>
            <label class="field">
              <span>Student email</span>
              <input class="input" type="email" name="email" required />
            </label>
            <label class="field">
              <span>Grade / stage</span>
              <input class="input" type="text" name="grade" />
            </label>
            <label class="field">
              <span>Temporary password</span>
              <input class="input" type="text" name="password" required />
            </label>
            <button class="button button--primary" type="submit">Create student account</button>
          </form>
        </section>

        <section class="panel stack">
          <div class="section-header">
            <div>
              <p class="eyebrow">Managed students</p>
              <h2>School student list</h2>
            </div>
          </div>
          <div class="card-grid card-grid--compact">
            ${(overview?.students || [])
              .map(
                (item) => `
                  <article class="career-card">
                    <div class="career-card__top">
                      <div>
                        <p class="eyebrow">${escapeHtml(item.student.grade || "Grade not set")}</p>
                        <h3>${escapeHtml(item.student.fullName)}</h3>
                      </div>
                      <span class="score-chip">${item.totalPoints} pts</span>
                    </div>
                    <p>Top recommendation: ${escapeHtml(item.topRecommendation?.title || "Not available yet")}</p>
                    <ul class="list">
                      <li>Profile completed: ${item.profileCompleted ? "Yes" : "No"}</li>
                      <li>Latest proof: ${escapeHtml(item.latestProof?.careerTitle || "No proof")}</li>
                    </ul>
                    <button class="button button--secondary" data-action="view-student-detail" data-student-id="${item.student.id}">View full report</button>
                  </article>
                `
              )
              .join("")}
          </div>
        </section>
      </div>

      <div>
        ${
          detail
            ? `
              <section class="panel stack">
                <div class="section-header">
                  <div>
                    <p class="eyebrow">Student report</p>
                    <h2>${escapeHtml(detail.student.fullName)}</h2>
                  </div>
                </div>
                ${
                  detail.profile
                    ? `
                      <article class="info-card">
                        <p class="eyebrow">AI Profile Summary</p>
                        <h3>${escapeHtml(detail.profile.analysis.summary)}</h3>
                        <p>${escapeHtml(detail.profile.analysis.characterReadout)}</p>
                      </article>
                    `
                    : `<article class="empty-state"><p>This student has not completed the AI profile yet.</p></article>`
                }
                <article class="info-card">
                  <p class="eyebrow">Top recommendations</p>
                  <ul class="list">
                    ${(detail.recommendations || []).slice(0, 5).map((item) => `<li>${escapeHtml(item.title)} - ${item.fitScore}%</li>`).join("")}
                  </ul>
                </article>
                <article class="info-card">
                  <p class="eyebrow">Proof reports</p>
                  ${
                    detail.proofSessions?.length
                      ? detail.proofSessions
                          .slice(0, 3)
                          .map((session) => {
                            const readiness = getProofReadinessState(session.evaluation.overallScore);

                            return `
                              <div class="proof-history-card">
                                <strong>${escapeHtml(session.careerTitle)} - ${session.evaluation.points} pts (${session.evaluation.overallScore}% readiness)</strong>
                                <div class="proof-status ${readiness.tone}">
                                  <strong>${escapeHtml(readiness.label)}</strong>
                                  <p>${escapeHtml(readiness.message)}</p>
                                </div>
                                <p>${escapeHtml(session.evaluation.schoolSummary)}</p>
                                <small>${formatDate(session.completedAt)}</small>
                              </div>
                            `;
                          })
                          .join("")
                      : `<p>No completed proof sessions yet.</p>`
                  }
                </article>
              </section>
            `
            : `
              <section class="panel empty-state">
                <h2>Select a student</h2>
                <p>Choose any student from the school list to review AI profile analysis, top career recommendations, and proof-based points.</p>
              </section>
            `
        }
      </div>
    </section>
  `;
}

function renderCareersTab(state) {
  return `
    <section class="stack">
      <section class="panel stack">
        <div class="section-header">
          <div>
            <p class="eyebrow">Career library</p>
            <h2>Explore the same 150+ careers visible to students</h2>
          </div>
        </div>
        <div class="field-grid">
          <label class="field">
            <span>Search</span>
            <input class="input" type="text" id="career-search" value="${escapeHtml(state.careerSearch || "")}" placeholder="Search a career" />
          </label>
          <label class="field">
            <span>Category</span>
            <select class="input" id="career-category">
              <option value="">All categories</option>
              ${state.careerCategories
                .map(
                  (category) => `
                    <option value="${escapeHtml(category)}" ${state.careerCategory === category ? "selected" : ""}>${escapeHtml(category)}</option>
                  `
                )
                .join("")}
            </select>
          </label>
        </div>
      </section>

      <section class="layout-two-col">
        <div class="panel stack">
          ${renderCareerGrid(state.filteredCareers, state.selectedCareer?.id)}
        </div>
        ${renderCareerDetail(state.selectedCareer, { showProofButton: false })}
      </section>
    </section>
  `;
}

export function renderSchoolView(state) {
  const activeTab = state.activeSchoolTab || "overview";
  let content = renderOverviewTab(state);

  if (activeTab === "students") {
    content = renderStudentsTab(state);
  } else if (activeTab === "careers") {
    content = renderCareersTab(state);
  }

  return `
    <div class="app-shell">
      ${renderSchoolHeader(state)}
      ${
        state.notice
          ? `<div class="notice ${state.noticeTone || ""}">${escapeHtml(state.notice)}</div>`
          : ""
      }
      ${renderSchoolTabs(activeTab)}
      ${content}
    </div>
  `;
}
