import { useCallback } from "react";

import { prefetchRouteByPath } from "@/routes";

export function usePrefetchRoute(path: string): () => void {
  return useCallback(() => {
    prefetchRouteByPath(path);
  }, [path]);
}
