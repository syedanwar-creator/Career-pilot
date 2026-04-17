export interface AppConfig {
  apiBaseUrl: string;
  appName: string;
  isDevelopment: boolean;
}

function normalizeBaseUrl(value: string | undefined): string {
  return String(value || "").replace(/\/$/, "");
}

export const appConfig: AppConfig = Object.freeze({
  apiBaseUrl: normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL),
  appName: import.meta.env.VITE_APP_NAME || "Career Reality Platform",
  isDevelopment: import.meta.env.DEV
});
