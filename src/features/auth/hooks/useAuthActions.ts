import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { authApi } from "@/features/auth/api";
import { routePaths } from "@/routes/paths";
import { getDefaultPrivateRoute } from "@/shared/utils";
import { useAppStore, useAuthStore, useUiStore } from "@/store";

import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload
} from "../types";

export function useAuthActions(): {
  isSubmitting: boolean;
  login: (payload: LoginPayload, redirectTo?: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  requestPasswordReset: (payload: ForgotPasswordPayload) => Promise<ForgotPasswordResponse>;
  resetPassword: (token: string, payload: ResetPasswordPayload) => Promise<void>;
} {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const setSession = useAuthStore((state) => state.setSession);
  const clearSession = useAuthStore((state) => state.clearSession);
  const setConfig = useAppStore((state) => state.setConfig);
  const showNotice = useUiStore((state) => state.showNotice);

  const syncSession = useCallback(async () => {
    const [config, session] = await Promise.all([authApi.getAppConfig(), authApi.getSession()]);
    setConfig(config);
    setSession(session);
    return session;
  }, [setConfig, setSession]);

  const runMutation = useCallback(async <TResult,>(task: () => Promise<TResult>): Promise<TResult> => {
    setIsSubmitting(true);

    try {
      return await task();
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const login = useCallback(
    async (payload: LoginPayload, redirectTo?: string): Promise<void> =>
      runMutation(async () => {
        await authApi.login(payload);
        const session = await syncSession();
        showNotice("Signed in successfully.", "success");
        navigate(redirectTo || getDefaultPrivateRoute(session), { replace: true });
      }),
    [navigate, runMutation, showNotice, syncSession]
  );

  const register = useCallback(
    async (payload: RegisterPayload): Promise<void> =>
      runMutation(async () => {
        await authApi.register(payload);
        const session = await syncSession();
        showNotice("Account created successfully.", "success");
        navigate(getDefaultPrivateRoute(session), { replace: true });
      }),
    [navigate, runMutation, showNotice, syncSession]
  );

  const logout = useCallback(
    async (): Promise<void> =>
      runMutation(async () => {
        await authApi.logout();
        clearSession();
        showNotice("Logged out successfully.", "success");
        navigate(routePaths.login, { replace: true });
      }),
    [clearSession, navigate, runMutation, showNotice]
  );

  const requestPasswordReset = useCallback(
    async (payload: ForgotPasswordPayload): Promise<ForgotPasswordResponse> =>
      runMutation(async () => {
        const response = await authApi.requestPasswordReset(payload);
        showNotice(response.message, "info");
        return response;
      }),
    [runMutation, showNotice]
  );

  const resetPassword = useCallback(
    async (token: string, payload: ResetPasswordPayload): Promise<void> =>
      runMutation(async () => {
        const response = await authApi.resetPassword(token, payload);
        showNotice(response.message, "success");
        navigate(routePaths.login, { replace: true });
      }),
    [navigate, runMutation, showNotice]
  );

  return {
    isSubmitting,
    login,
    logout,
    register,
    requestPasswordReset,
    resetPassword
  };
}
