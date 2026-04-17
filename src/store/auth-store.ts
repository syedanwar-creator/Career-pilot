import { create } from "zustand";

import type { AuthUser, SessionPayload, TenantSummary } from "@/shared/types";

export type AuthStatus = "idle" | "bootstrapping" | "authenticated" | "anonymous";

interface AuthState {
  status: AuthStatus;
  session: SessionPayload | null;
  setBootstrapping: () => void;
  setSession: (session: SessionPayload) => void;
  setAnonymous: () => void;
  updateUser: (partial: Partial<Pick<AuthUser, "fullName" | "grade">>) => void;
  updateTenant: (tenant: TenantSummary | null) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  status: "idle",
  session: null,
  setBootstrapping: () =>
    set((state) => ({
      ...state,
      status: "bootstrapping"
    })),
  setSession: (session) =>
    set(() => ({
      session,
      status: session.authenticated ? "authenticated" : "anonymous"
    })),
  setAnonymous: () =>
    set(() => ({
      status: "anonymous",
      session: {
        authenticated: false,
        user: null,
        tenant: null,
        geminiConfigured: false,
        careerCount: 0
      }
    })),
  updateUser: (partial) =>
    set((state) => ({
      ...state,
      session:
        state.session && state.session.user
          ? {
              ...state.session,
              user: {
                ...state.session.user,
                ...partial
              }
            }
          : state.session
    })),
  updateTenant: (tenant) =>
    set((state) => ({
      ...state,
      session: state.session
        ? {
            ...state.session,
            tenant
          }
        : state.session
    })),
  clearSession: () =>
    set(() => ({
      status: "anonymous",
      session: {
        authenticated: false,
        user: null,
        tenant: null,
        geminiConfigured: false,
        careerCount: 0
      }
    }))
}));
