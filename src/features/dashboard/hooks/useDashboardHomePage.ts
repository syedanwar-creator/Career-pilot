import { useCallback, useEffect, useState } from "react";

import { dashboardApi } from "@/features/dashboard/api";
import type { StudentDashboardResponse } from "@/features/dashboard/types";
import { useUiStore } from "@/store";

export function useDashboardHomePage(): {
  dashboard: StudentDashboardResponse | null;
  isLoading: boolean;
  refresh: () => Promise<void>;
} {
  const [dashboard, setDashboard] = useState<StudentDashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const showNotice = useUiStore((state) => state.showNotice);

  const refresh = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await dashboardApi.getDashboard();
      setDashboard(response);
    } catch (error) {
      showNotice((error as Error).message, "danger");
    } finally {
      setIsLoading(false);
    }
  }, [showNotice]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    dashboard,
    isLoading,
    refresh
  };
}
