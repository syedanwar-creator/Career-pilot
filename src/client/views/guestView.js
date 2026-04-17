import { escapeHtml } from "../utils/format.js";

const authModes = [
  {
    id: "login",
    label: "Login",
    eyebrow: "Sign In",
    title: "Access your workspace",
    description: "Use this path when you already have an account. School users can add their tenant slug when signing in."
  },
  {
    id: "individual",
    label: "Solo Student",
    eyebrow: "Individual",
    title: "Create an independent student account",
    description: "Best for students exploring careers on their own without being attached to a school tenant."
  },
  {
    id: "school_admin",
    label: "School Admin",
    eyebrow: "School Tenant",
    title: "Create and manage a school workspace",
    description: "Set up your school tenant, manage students in one place, and review evidence-backed career progress."
  },
  {
    id: "school_student",
    label: "Join School",
    eyebrow: "School Student",
    title: "Register under an existing school",
    description: "Use your school's tenant slug or join code to join the correct workspace and keep your records under that school."
  }
];

function renderAuthModeSwitcher(activeMode) {
  return authModes
    .map(
      (mode) => `
        <button
          class="auth-mode ${activeMode === mode.id ? "auth-mode--active" : ""}"
          type="button"
          data-action="set-auth-mode"
          data-mode="${mode.id}"
        >
          ${escapeHtml(mode.label)}
        </button>
      `
    )
    .join("");
}

function renderActiveAuthForm(activeMode, draft = {}) {
  if (activeMode === "individual") {
    return `
      <form id="register-individual-form" class="stack">
        <input type="hidden" name="accountType" value="individual" />
        <div class="field-grid">
          <label class="field">
            <span>Full name</span>
            <input class="input" type="text" name="fullName" value="${escapeHtml(draft.fullName || "")}" required />
          </label>
          <label class="field">
            <span>Email</span>
            <input class="input" type="email" name="email" value="${escapeHtml(draft.email || "")}" required />
          </label>
        </div>
        <div class="field-grid">
          <label class="field">
            <span>Grade / stage</span>
            <input class="input" type="text" name="grade" value="${escapeHtml(draft.grade || "")}" placeholder="Grade 10 or early college" />
          </label>
          <label class="field">
            <span>Password</span>
            <input class="input" type="password" name="password" value="${escapeHtml(draft.password || "")}" minlength="6" required />
          </label>
        </div>
        <p class="helper-text">This account stays independent and does not require any school tenant slug.</p>
        <button class="button button--primary" type="submit">Create individual account</button>
      </form>
    `;
  }

  if (activeMode === "school_admin") {
    return `
      <form id="register-school-form" class="stack">
        <input type="hidden" name="accountType" value="school_admin" />
        <div class="field-grid">
          <label class="field">
            <span>School admin name</span>
            <input class="input" type="text" name="fullName" value="${escapeHtml(draft.fullName || "")}" required />
          </label>
          <label class="field">
            <span>Admin email</span>
            <input class="input" type="email" name="email" value="${escapeHtml(draft.email || "")}" required />
          </label>
        </div>
        <div class="field-grid">
          <label class="field">
            <span>School name</span>
            <input class="input" type="text" name="schoolName" value="${escapeHtml(draft.schoolName || "")}" required />
          </label>
          <label class="field">
            <span>Tenant slug</span>
            <input class="input" type="text" name="tenantSlug" value="${escapeHtml(draft.tenantSlug || "")}" placeholder="greenfield-high-school" required />
          </label>
        </div>
        <label class="field">
          <span>Password</span>
          <input class="input" type="password" name="password" value="${escapeHtml(draft.password || "")}" minlength="6" required />
        </label>
        <p class="helper-text">Your tenant slug becomes the school's shared doorway for admins and students.</p>
        <button class="button button--primary" type="submit">Create school tenant</button>
      </form>
    `;
  }

  if (activeMode === "school_student") {
    return `
      <form id="register-school-student-form" class="stack">
        <input type="hidden" name="accountType" value="school_student" />
        <div class="field-grid">
          <label class="field">
            <span>Student name</span>
            <input class="input" type="text" name="fullName" value="${escapeHtml(draft.fullName || "")}" required />
          </label>
          <label class="field">
            <span>Email</span>
            <input class="input" type="email" name="email" value="${escapeHtml(draft.email || "")}" required />
          </label>
        </div>
        <div class="field-grid">
          <label class="field">
            <span>Grade / stage</span>
            <input class="input" type="text" name="grade" value="${escapeHtml(draft.grade || "")}" placeholder="Grade 10" />
          </label>
          <label class="field">
            <span>Password</span>
            <input class="input" type="password" name="password" value="${escapeHtml(draft.password || "")}" minlength="6" required />
          </label>
        </div>
        <div class="field-grid">
          <label class="field">
            <span>School tenant slug</span>
            <input class="input" type="text" name="tenantSlug" value="${escapeHtml(draft.tenantSlug || "")}" placeholder="sunrise-public-school" />
          </label>
          <label class="field">
            <span>Join code (optional)</span>
            <input class="input" type="text" name="joinCode" value="${escapeHtml(draft.joinCode || "")}" placeholder="SUNR-2026" />
          </label>
        </div>
        <p class="helper-text">Use either the tenant slug or the join code shared by your school.</p>
        <button class="button button--primary" type="submit">Join school workspace</button>
      </form>
    `;
  }

  return `
    <form id="login-form" class="stack">
      <div class="field-grid">
        <label class="field">
          <span>Email</span>
          <input class="input" type="email" name="email" value="${escapeHtml(draft.email || "")}" placeholder="student@school.com" required />
        </label>
        <label class="field">
          <span>Password</span>
          <input class="input" type="password" name="password" value="${escapeHtml(draft.password || "")}" placeholder="Enter password" required />
        </label>
      </div>
      <label class="field">
        <span>School tenant slug (only for school accounts)</span>
        <input
          class="input"
          type="text"
          name="tenantSlug"
          value="${escapeHtml(draft.tenantSlug || "")}"
          placeholder="Leave blank for individual student login"
        />
      </label>
      <p class="helper-text">School admins and school students should add the tenant slug. Individual students can leave it empty.</p>
      <button class="button button--primary" type="submit">Sign in</button>
    </form>
  `;
}

function renderDemoAccounts(demoAccounts = []) {
  if (!demoAccounts.length) {
    return "";
  }

  return `
    <section class="panel support-card stack">
      <div class="section-header section-header--stack">
        <div>
          <p class="eyebrow">Demo Access</p>
          <h2>Login credentials</h2>
        </div>
        <p>These seeded accounts are ready to use so you can check the full flow without creating everything manually.</p>
      </div>
      <div class="credential-list">
        ${demoAccounts
          .map(
            (account) => `
              <article class="credential-card">
                <div class="credential-card__head">
                  <div>
                    <p class="eyebrow">${escapeHtml(account.roleLabel || "Demo")}</p>
                    <h3>${escapeHtml(account.label)}</h3>
                  </div>
                  <button
                    class="button button--secondary"
                    type="button"
                    data-action="use-demo-account"
                    data-email="${escapeHtml(account.email)}"
                    data-password="${escapeHtml(account.password)}"
                    data-tenant-slug="${escapeHtml(account.tenantSlug || "")}"
                  >
                    Use demo
                  </button>
                </div>
                <p>${escapeHtml(account.description || "")}</p>
                <div class="credential-meta"><span>Email</span><code>${escapeHtml(account.email)}</code></div>
                <div class="credential-meta"><span>Password</span><code>${escapeHtml(account.password)}</code></div>
                ${
                  account.tenantSlug
                    ? `<div class="credential-meta"><span>Tenant slug</span><code>${escapeHtml(account.tenantSlug)}</code></div>`
                    : ""
                }
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

export function renderGuestView(state) {
  const activeMode = state.authMode || "login";
  const activeModeMeta = authModes.find((mode) => mode.id === activeMode) || authModes[0];
  const draft = state.authDraft || {};

  return `
    <div class="app-shell app-shell--guest">
      ${
        state.notice
          ? `<div class="notice ${state.noticeTone || ""}">${escapeHtml(state.notice)}</div>`
          : ""
      }

      <section class="guest-shell">
        <div class="guest-sidebar stack">
          <div class="brand-block">
            <div class="brand-block__head">
              <p class="eyebrow">Career Reality Platform</p>
              <h1>One cleaner doorway for schools and students</h1>
              <p>
                Start with the right access path, build an AI-backed student profile, get career recommendations,
                and collect readiness proof that parents and schools can understand.
              </p>
            </div>

            <div class="surface-grid surface-grid--stats">
              <div class="stat-card">
                <strong>${state.appConfig?.careerCount || 0}+</strong>
                <span>Careers with full detail</span>
              </div>
              <div class="stat-card">
                <strong>${state.appConfig?.geminiConfigured ? "Live" : "Ready"}</strong>
                <span>Gemini interview engine</span>
              </div>
              <div class="stat-card">
                <strong>School + Solo</strong>
                <span>Flexible onboarding flow</span>
              </div>
            </div>
          </div>

          <article class="panel support-card stack">
            <div class="section-header section-header--stack">
              <div>
                <p class="eyebrow">Flow</p>
                <h2>How the product moves</h2>
              </div>
              <p>The first screen is now focused on choosing the right entry path instead of overwhelming the student with a large title block.</p>
            </div>

            <div class="flow-list">
              <article class="flow-item">
                <strong>1</strong>
                <div>
                  <h3>Enter the right workspace</h3>
                  <p>Pick login, solo student, school admin, or school student.</p>
                </div>
              </article>
              <article class="flow-item">
                <strong>2</strong>
                <div>
                  <h3>Build the student profile</h3>
                  <p>AI-generated interview questions reveal interests, habits, and personality signals.</p>
                </div>
              </article>
              <article class="flow-item">
                <strong>3</strong>
                <div>
                  <h3>Get the career shortlist</h3>
                  <p>The dashboard recommends careers using personality fit, interests, and stability signals.</p>
                </div>
              </article>
              <article class="flow-item">
                <strong>4</strong>
                <div>
                  <h3>Prove readiness</h3>
                  <p>Students answer real-world readiness questions and collect points they can share with parents and schools.</p>
                </div>
              </article>
            </div>
          </article>

          ${renderDemoAccounts(state.appConfig?.demoAccounts || [])}
        </div>

        <section class="panel auth-hub stack">
          <div class="section-header section-header--stack">
            <div>
              <p class="eyebrow">Access</p>
              <h2>Choose your entry path</h2>
            </div>
            <p>All four account paths now live inside one guided auth area so the landing page feels cleaner and more product-ready.</p>
          </div>

          <div class="auth-switcher">
            ${renderAuthModeSwitcher(activeMode)}
          </div>

          <div class="auth-mode-copy">
            <p class="eyebrow">${escapeHtml(activeModeMeta.eyebrow)}</p>
            <h3>${escapeHtml(activeModeMeta.title)}</h3>
            <p>${escapeHtml(activeModeMeta.description)}</p>
          </div>

          ${renderActiveAuthForm(activeMode, draft)}
        </section>
      </section>
    </div>
  `;
}
