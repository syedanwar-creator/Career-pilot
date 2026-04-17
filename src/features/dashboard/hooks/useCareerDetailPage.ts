import { useCallback, useEffect, useState } from "react";

import { dashboardApi } from "@/features/dashboard/api";
import type { Career } from "@/features/dashboard/types";
import { useUiStore } from "@/store";

export function useCareerDetailPage(careerId: string | undefined): {
  career: Career | null;
  isLoading: boolean;
} {
  const [career, setCareer] = useState<Career | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const showNotice = useUiStore((state) => state.showNotice);

  const loadCareer = useCallback(async () => {
    if (!careerId) {
      setCareer(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await dashboardApi.getCareer(careerId);
      setCareer(response.career);
    } catch (error) {
      setCareer(null);
      showNotice((error as Error).message, "danger");
    } finally {
      setIsLoading(false);
    }
  }, [careerId, showNotice]);

  useEffect(() => {
    void loadCareer();
  }, [loadCareer]);

  return {
    career,
    isLoading
  };
}
