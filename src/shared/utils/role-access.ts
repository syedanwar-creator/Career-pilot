import type { AccessRole, AuthUser, BackendRole, SessionPayload } from "@/shared/types";

export function getAccessRole(role: BackendRole): AccessRole {
  return role === "school_admin" ? "admin" : "student";
}

export function isAdminUser(user: AuthUser | null | undefined): boolean {
  return Boolean(user && getAccessRole(user.role) === "admin");
}

export function getDefaultPrivateRoute(session: Pick<SessionPayload, "user"> | { user: AuthUser | null }): string {
  return isAdminUser(session.user) ? "/admin/overview" : "/dashboard";
}
