import type { AccessRole } from "./auth";

export type RouteSection = "public" | "dashboard" | "settings" | "admin";

export interface RouteMeta {
  id: string;
  label: string;
  icon: string;
  parent?: string;
  section: RouteSection;
  nav?: boolean;
  requiresAuth?: boolean;
  role?: AccessRole;
}
