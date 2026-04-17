import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { routePaths } from "@/routes/paths";
import { ContentPageSkeleton } from "@/shared/components/Skeletons";
import { useAuthStore } from "@/store";

interface AuthGuardProps {
  children?: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): JSX.Element {
  const location = useLocation();
  const session = useAuthStore((state) => state.session);
  const status = useAuthStore((state) => state.status);

  if (status === "idle" || status === "bootstrapping") {
    return <ContentPageSkeleton />;
  }

  if (!session?.authenticated) {
    const redirectTo = `${location.pathname}${location.search}${location.hash}`;
    return <Navigate replace to={`${routePaths.login}?redirectTo=${encodeURIComponent(redirectTo)}`} />;
  }

  return <>{children}</>;
}
