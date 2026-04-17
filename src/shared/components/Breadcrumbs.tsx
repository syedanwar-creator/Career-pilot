import { memo, useMemo } from "react";
import { Link, useMatches } from "react-router-dom";

import type { RouteMeta } from "@/shared/types";

interface MatchHandle {
  routeMeta?: RouteMeta;
}

export const Breadcrumbs = memo(function Breadcrumbs(): JSX.Element | null {
  const matches = useMatches();

  const items = useMemo(
    () =>
      matches
        .map((match) => {
          const handle = match.handle as MatchHandle | undefined;

          if (!handle?.routeMeta) {
            return null;
          }

          return {
            id: handle.routeMeta.id,
            label: handle.routeMeta.label,
            pathname: match.pathname
          };
        })
        .filter((item): item is { id: string; label: string; pathname: string } => Boolean(item)),
    [matches]
  );

  if (items.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={item.id}>
              {isCurrent ? <span aria-current="page">{item.label}</span> : <Link to={item.pathname}>{item.label}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
