import { api } from "./client/services/api.js";
import { escapeHtml } from "./client/utils/format.js";
import { renderGuestView } from "./client/views/guestView.js";
import { renderSchoolView } from "./client/views/schoolView.js";
import { renderStudentView } from "./client/views/studentView.js";

const root = document.getElementById("app");

const state = {
  appConfig: null,
  session: null,
  notice: "",
  noticeTone: "",
  authMode: "login",
  authDraft: {},
  activeStudentTab: "dashboard",
  activeSchoolTab: "overview",
  dashboard: null,
  schoolOverview: null,
  selectedSchoolStudent: null,
  careers: [],
  filteredCareers: [],
  careerCategories: [],
  careerSearch: "",
  careerCategory: "",
  selectedCareer: null,
  profileQuestionSet: null,
  profileDraft: null,
  currentProofSession: null,
  loading: true
};

function setState(partial) {
  Object.assign(state, partial);
  renderApp();
}

function showNotice(message, tone = "") {
  setState({
    notice: message,
    noticeTone: tone
  });
}

function clearNotice() {
  if (state.notice) {
    setState({
      notice: "",
      noticeTone: ""
    });
  }
}

function extractFormData(form) {
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
}

function buildCareerCategories(careers) {
  return [...new Set(careers.map((career) => career.category))].sort();
}

function applyCareerFilter() {
  const searchTerm = state.careerSearch.toLowerCase().trim();
  const categoryTerm = state.careerCategory.toLowerCase().trim();

  const filtered = state.careers.filter((career) => {
    const searchMatches =
      !searchTerm ||
      career.title.toLowerCase().includes(searchTerm) ||
      career.category.toLowerCase().includes(searchTerm) ||
      career.summary.toLowerCase().includes(searchTerm);
    const categoryMatches = !categoryTerm || career.category.toLowerCase() === categoryTerm;
    return searchMatches && categoryMatches;
  });

  setState({
    filteredCareers: filtered
  });
}

function getAuthModeForForm(formId) {
  if (formId === "register-individual-form") {
    return "individual";
  }

  if (formId === "register-school-form") {
    return "school_admin";
  }

  if (formId === "register-school-student-form") {
    return "school_student";
  }

  return "login";
}

function renderTopBar() {
  if (!state.session?.authenticated) {
    return "";
  }

  return `
    <div class="global-topbar">
      <div>
        <p class="eyebrow">Signed in as</p>
        <strong>${escapeHtml(state.session.user.fullName)}</strong>
      </div>
      <div class="actions">
        ${
          state.session.tenant
            ? `<span class="score-chip">${escapeHtml(state.session.tenant.slug)}</span>`
            : `<span class="score-chip">Individual</span>`
        }
        <button class="button button--secondary" data-action="logout">Logout</button>
      </div>
    </div>
  `;
}

function renderLoading() {
  root.innerHTML = `
    <div class="app-shell">
      <div class="panel empty-state">
        <h1>Loading Career Reality</h1>
        <p>Preparing auth, career library, and role-aware dashboard...</p>
      </div>
    </div>
  `;
}

function renderApp() {
  if (state.loading) {
    renderLoading();
    return;
  }

  let content = renderGuestView(state);

  if (state.session?.authenticated) {
    if (state.session.user.role === "school_admin") {
      content = renderSchoolView(state);
    } else {
      content = renderStudentView(state);
    }
  }

  root.innerHTML = `
    ${renderTopBar()}
    ${content}
  `;
}

async function loadCareerLibrary() {
  const payload = await api.getCareers({ limit: 200 });
  const careers = payload.careers || [];

  setState({
    careers,
    filteredCareers: careers,
    careerCategories: buildCareerCategories(careers)
  });

  return careers;
}

async function selectCareer(careerId) {
  const payload = await api.getCareer(careerId);
  setState({
    selectedCareer: payload.career
  });
}

async function loadStudentWorkspace() {
  const [dashboard, careersPayload] = await Promise.all([api.getDashboard(), api.getCareers({ limit: 200 })]);
  const careers = careersPayload.careers || [];
  const selectedCareerId = dashboard.recommendations?.[0]?.id || careers[0]?.id || null;

  setState({
    dashboard,
    careers,
    filteredCareers: careers,
    careerCategories: buildCareerCategories(careers),
    profileQuestionSet: null,
    currentProofSession: null,
    selectedCareer: selectedCareerId ? careers.find((career) => career.id === selectedCareerId) || null : null
  });

  if (selectedCareerId) {
    await selectCareer(selectedCareerId);
  }
}

async function loadSchoolWorkspace() {
  const [schoolOverview, careersPayload] = await Promise.all([api.getSchoolOverview(), api.getCareers({ limit: 200 })]);
  const careers = careersPayload.careers || [];

  setState({
    schoolOverview,
    careers,
    filteredCareers: careers,
    careerCategories: buildCareerCategories(careers),
    selectedCareer: careers[0] || null,
    selectedSchoolStudent: null
  });
}

async function bootstrap() {
  setState({ loading: true });

  try {
    const [appConfig, session] = await Promise.all([api.getAppConfig(), api.getSession()]);

    setState({
      appConfig,
      session,
      loading: false
    });

    if (session.authenticated) {
      if (session.user.role === "school_admin") {
        await loadSchoolWorkspace();
      } else {
        await loadStudentWorkspace();
      }
    }
  } catch (error) {
    setState({
      loading: false,
      notice: error.message,
      noticeTone: "tone-danger"
    });
  }
}

async function handleAuthSubmit(formId, payload) {
  setState({
    authMode: getAuthModeForForm(formId),
    authDraft: { ...payload }
  });

  if (formId === "login-form") {
    await api.login(payload);
  } else {
    await api.register(payload);
  }

  setState({
    authDraft: {}
  });

  await bootstrap();
  showNotice("Authentication successful.", "tone-success");
}

async function handleProfileQuestionGeneration() {
  const form = document.getElementById("profile-form");

  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  const basicInfo = extractFormData(form);
  const questionSet = await api.generateProfileQuestionSet(basicInfo);

  setState({
    profileQuestionSet: questionSet,
    profileDraft: basicInfo
  });

  showNotice("Profile question set generated. Answer all questions and submit the profile.", "tone-success");
}

async function handleProfileSubmit() {
  const form = document.getElementById("profile-form");

  if (!(form instanceof HTMLFormElement) || !state.profileQuestionSet) {
    return;
  }

  const basicInfo = extractFormData(form);
  const answers = state.profileQuestionSet.questions.map((question) => {
    const value = form.querySelector(`input[name="question-${question.id}"]:checked`)?.value;
    return {
      questionId: question.id,
      optionIndex: Number(value)
    };
  });

  if (answers.some((item) => Number.isNaN(item.optionIndex))) {
    showNotice("Please answer every AI profile question before submitting.", "tone-danger");
    return;
  }

  await api.submitProfile({
    basicInfo,
    questionSet: state.profileQuestionSet,
    answers
  });

  setState({
    profileQuestionSet: null,
    profileDraft: basicInfo
  });

  await loadStudentWorkspace();
  showNotice("Student profile analyzed successfully. Recommendations are now updated.", "tone-success");
}

async function handleStartProof(careerId) {
  const payload = await api.startProofSession(careerId);

  setState({
    currentProofSession: payload.session,
    activeStudentTab: "proof"
  });

  showNotice("Career proof session started. Complete all 8 questions to earn points.", "tone-success");
}

async function handleProofSubmit() {
  const form = document.getElementById("proof-session-form");
  const session = state.currentProofSession;

  if (!(form instanceof HTMLFormElement) || !session) {
    return;
  }

  const answers = session.questionSet.questions.map((question) => {
    const value = form.querySelector(`input[name="proof-${question.id}"]:checked`)?.value;
    return {
      questionId: question.id,
      optionIndex: Number(value)
    };
  });

  if (answers.some((item) => Number.isNaN(item.optionIndex))) {
    showNotice("Please answer every proof question before submitting.", "tone-danger");
    return;
  }

  await api.submitProofSession(session.id, answers);
  setState({
    currentProofSession: null
  });
  await loadStudentWorkspace();
  setState({
    activeStudentTab: "proof"
  });
  showNotice("Proof session completed. Points, parent summary, and school summary have been generated.", "tone-success");
}

async function handleCreateSchoolStudent() {
  const form = document.getElementById("school-student-create-form");

  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  const payload = extractFormData(form);
  await api.createSchoolStudent(payload);
  form.reset();
  await loadSchoolWorkspace();
  setState({
    activeSchoolTab: "students"
  });
  showNotice("Student account created inside the school tenant.", "tone-success");
}

async function handleStudentDetail(studentId) {
  const payload = await api.getSchoolStudent(studentId);

  setState({
    selectedSchoolStudent: payload,
    activeSchoolTab: "students"
  });
}

document.addEventListener("submit", async (event) => {
  const form = event.target;

  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  const handledForms = [
    "login-form",
    "register-individual-form",
    "register-school-form",
    "register-school-student-form",
    "profile-form",
    "proof-session-form",
    "school-student-create-form"
  ];

  if (!handledForms.includes(form.id)) {
    return;
  }

  event.preventDefault();
  clearNotice();

  try {
    if (form.id === "profile-form") {
      await handleProfileSubmit();
      return;
    }

    if (form.id === "proof-session-form") {
      await handleProofSubmit();
      return;
    }

    if (form.id === "school-student-create-form") {
      await handleCreateSchoolStudent();
      return;
    }

    await handleAuthSubmit(form.id, extractFormData(form));
  } catch (error) {
    showNotice(error.message, "tone-danger");
  }
});

document.addEventListener("click", async (event) => {
  const actionElement = event.target.closest("[data-action]");

  if (!actionElement) {
    return;
  }

  clearNotice();

  try {
    const action = actionElement.dataset.action;

    if (action === "logout") {
      await api.logout();
      setState({
        authMode: "login",
        authDraft: {}
      });
      await bootstrap();
      showNotice("Logged out successfully.", "tone-success");
      return;
    }

    if (action === "set-auth-mode") {
      setState({
        authMode: actionElement.dataset.mode || "login",
        authDraft: {}
      });
      return;
    }

    if (action === "use-demo-account") {
      setState({
        authMode: "login",
        authDraft: {
          email: actionElement.dataset.email || "",
          password: actionElement.dataset.password || "",
          tenantSlug: actionElement.dataset.tenantSlug || ""
        }
      });
      return;
    }

    if (action === "set-student-tab") {
      setState({ activeStudentTab: actionElement.dataset.tab });
      return;
    }

    if (action === "set-school-tab") {
      setState({ activeSchoolTab: actionElement.dataset.tab });
      return;
    }

    if (action === "generate-profile-questions") {
      await handleProfileQuestionGeneration();
      return;
    }

    if (action === "open-career") {
      await selectCareer(actionElement.dataset.careerId);
      return;
    }

    if (action === "start-proof") {
      await handleStartProof(actionElement.dataset.careerId);
      return;
    }

    if (action === "view-student-detail") {
      await handleStudentDetail(actionElement.dataset.studentId);
    }
  } catch (error) {
    showNotice(error.message, "tone-danger");
  }
});

document.addEventListener("input", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) {
    return;
  }

  if (target.id === "career-search") {
    state.careerSearch = target.value;
    applyCareerFilter();
  }

  if (target.id === "career-category") {
    state.careerCategory = target.value;
    applyCareerFilter();
  }
});

bootstrap();
