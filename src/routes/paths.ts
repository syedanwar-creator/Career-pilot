export const routePaths = {
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password/:token",
  dashboard: "/dashboard",
  settings: "/settings",
  admin: "/admin",
  dashboardProfile: "/dashboard/profile",
  dashboardCareers: "/dashboard/careers",
  dashboardCareerDetail: "/dashboard/careers/:careerId",
  dashboardProof: "/dashboard/proof",
  dashboardCareerHelp: "/dashboard/career-help",
  settingsProfile: "/settings/profile",
  settingsSecurity: "/settings/security",
  adminOverview: "/admin/overview",
  adminStudents: "/admin/students",
  adminCareers: "/admin/careers"
} as const;

export function buildDashboardCareerDetailPath(careerId: string): string {
  return `/dashboard/careers/${careerId}`;
}

export const dashboardNavItems = [
  { to: routePaths.dashboard, label: "Overview", end: true },
  { to: routePaths.dashboardProfile, label: "Profile Studio" },
  { to: routePaths.dashboardCareers, label: "Careers" },
  { to: routePaths.dashboardProof, label: "Proof Center" }
] as const;

export const settingsNavItems = [
  { to: routePaths.settingsProfile, label: "Profile" },
  { to: routePaths.settingsSecurity, label: "Security" }
] as const;

export const adminNavItems = [
  { to: routePaths.adminOverview, label: "Overview" },
  { to: routePaths.adminStudents, label: "Students" },
  { to: routePaths.adminCareers, label: "Careers" }
] as const;
