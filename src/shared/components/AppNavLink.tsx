import { Link, useResolvedPath, useMatch, type To } from "react-router-dom";

import { usePrefetchRoute } from "@/shared/hooks";
import { cn } from "@/shared/utils";

interface AppNavLinkProps {
  to: To;
  label: string;
  className?: string;
  end?: boolean;
}

export function AppNavLink({ className, end = false, label, to }: AppNavLinkProps): JSX.Element {
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({
    path: resolvedPath.pathname,
    end
  });
  const prefetch = usePrefetchRoute(resolvedPath.pathname);

  return (
    <Link
      to={to}
      className={cn("nav-link", match ? "nav-link--active" : "", className)}
      aria-current={match ? "page" : undefined}
      onMouseEnter={prefetch}
      onFocus={prefetch}
    >
      {label}
    </Link>
  );
}
