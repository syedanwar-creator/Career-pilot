import { httpClient } from "@/services";
import type { AppRuntimeConfig, SessionPayload } from "@/shared/types";

import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload
} from "./types";

export const authApi = {
  getAppConfig(): Promise<AppRuntimeConfig> {
    return httpClient.get<AppRuntimeConfig>("/api/app-config");
  },
  getSession(): Promise<SessionPayload> {
    return httpClient.get<SessionPayload>("/api/auth/session");
  },
  login(payload: LoginPayload): Promise<unknown> {
    return httpClient.post("/api/auth/login", payload);
  },
  register(payload: RegisterPayload): Promise<unknown> {
    return httpClient.post("/api/auth/register", payload);
  },
  logout(): Promise<{ ok: boolean }> {
    return httpClient.post<{ ok: boolean }>("/api/auth/logout");
  },
  requestPasswordReset(payload: ForgotPasswordPayload): Promise<ForgotPasswordResponse> {
    return httpClient.post<ForgotPasswordResponse>("/api/auth/forgot-password", payload);
  },
  resetPassword(token: string, payload: ResetPasswordPayload): Promise<{ ok: boolean; message: string }> {
    return httpClient.post<{ ok: boolean; message: string }>(`/api/auth/reset-password/${token}`, payload);
  }
};
