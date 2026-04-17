import { useCallback, useEffect, useState } from "react";

import { adminApi } from "@/features/admin/api";
import type { SchoolOverviewResponse } from "@/features/admin/types";
import { useUiStore } from "@/store";

export function useAdminOverviewPage(): {
  overview: SchoolOverviewResponse | null;
  isLoading: boolean;
} {
  const [overview, setOverview] = useState<SchoolOverviewResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const showNotice = useUiStore((state) => state.showNotice);

  const load = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await adminApi.getOverview();
      setOverview(response);
    } catch (error) {
      showNotice((error as Error).message, "danger");
    } finally {
      setIsLoading(false);
    }
  }, [showNotice]);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    overview,
    isLoading
  };
}
