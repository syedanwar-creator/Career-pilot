import type { AppRuntimeConfig, SessionPayload } from "@/shared/types";

export type RegisterAccountType = "individual" | "school_admin" | "school_student";
export type RegisterMode = "individual" | "school_admin" | "school_student";

export interface LoginPayload {
  email: string;
  password: string;
  tenantSlug?: string;
}

export interface IndividualRegisterPayload {
  accountType: "individual";
  fullName: string;
  email: string;
  grade: string;
  password: string;
}

export interface SchoolAdminRegisterPayload {
  accountType: "school_admin";
  fullName: string;
  email: string;
  schoolName: string;
  tenantSlug: string;
  password: string;
}

export interface SchoolStudentRegisterPayload {
  accountType: "school_student";
  fullName: string;
  email: string;
  grade: string;
  tenantSlug: string;
  joinCode: string;
  password: string;
}

export type RegisterPayload =
  | IndividualRegisterPayload
  | SchoolAdminRegisterPayload
  | SchoolStudentRegisterPayload;

export interface AuthMutationResponse {
  geminiConfigured: boolean;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  ok: true;
  message: string;
  resetToken?: string;
  resetUrl?: string;
}

export interface ResetPasswordPayload {
  password: string;
}

export interface SessionBootstrapResult {
  appConfig: AppRuntimeConfig;
  session: SessionPayload;
}
