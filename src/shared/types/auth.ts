export type BackendRole = "school_admin" | "student_school" | "student_individual";
export type AccessRole = "admin" | "student";
export type NoticeTone = "success" | "warning" | "danger" | "info";

export interface TenantSummary {
  id: string;
  name: string;
  slug: string;
  joinCode?: string;
  type?: string;
  createdAt?: string;
}

export interface AuthUser {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  grade: string;
  role: BackendRole;
  tenantId: string | null;
}

export interface DemoAccount {
  label: string;
  roleLabel: string;
  description: string;
  email: string;
  password: string;
  tenantSlug: string;
}

export interface AppRuntimeConfig {
  geminiConfigured: boolean;
  careerCount: number;
  demoAccounts: DemoAccount[];
}

export interface SessionPayload {
  authenticated: boolean;
  user: AuthUser | null;
  tenant: TenantSummary | null;
  geminiConfigured: boolean;
  careerCount: number;
}

export interface ProfileSettings {
  fullName: string;
  email: string;
  grade: string;
  role: BackendRole;
  tenant: TenantSummary | null;
}

export interface NoticeState {
  id: string;
  message: string;
  tone: NoticeTone;
}
