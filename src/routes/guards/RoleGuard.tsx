import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import type { AccessRole } from "@/shared/types";
import { getAccessRole, getDefaultPrivateRoute } from "@/shared/utils";
import { useAuthStore } from "@/store";

interface RoleGuardProps {
  role: AccessRole;
  children?: ReactNode;
}

export function RoleGuard({ children, role }: RoleGuardProps): JSX.Element {
  const session = useAuthStore((state) => state.session);

  if (!session?.user) {
    return <>{children}</>;
  }

  if (getAccessRole(session.user.role) !== role) {
    return <Navigate replace to={getDefaultPrivateRoute(session)} />;
  }

  return <>{children}</>;
}
