import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { dashboardApi } from "@/features/dashboard/api";
import type { ProofSession, StudentDashboardResponse } from "@/features/dashboard/types";
import { routePaths } from "@/routes/paths";
import { useUiStore } from "@/store";

export function useProofCenterPage(): {
  dashboard: StudentDashboardResponse | null;
  currentProofSession: ProofSession | null;
  isLoading: boolean;
  isSubmitting: boolean;
  startProofSession: (careerId: string) => Promise<void>;
  submitProofSession: (answers: Record<string, number>) => Promise<void>;
} {
  const [dashboard, setDashboard] = useState<StudentDashboardResponse | null>(null);
  const [currentProofSession, setCurrentProofSession] = useState<ProofSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const showNotice = useUiStore((state) => state.showNotice);
  const requestedCareerIdRef = useRef<string>("");

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

  const startProofSession = useCallback(
    async (careerId: string) => {
      setIsSubmitting(true);

      try {
        const response = await dashboardApi.startProofSession(careerId);
        setCurrentProofSession(response.session);
        showNotice("Proof session started. Complete every question to submit evidence.", "success");
      } catch (error) {
        showNotice((error as Error).message, "danger");
      } finally {
        setIsSubmitting(false);
      }
    },
    [showNotice]
  );

  useEffect(() => {
    const careerId = searchParams.get("careerId");

    if (!careerId || requestedCareerIdRef.current === careerId || currentProofSession) {
      return;
    }

    requestedCareerIdRef.current = careerId;
    void startProofSession(careerId);
  }, [currentProofSession, searchParams, startProofSession]);

  const submitProofSession = useCallback(
    async (answers: Record<string, number>) => {
      if (!currentProofSession) {
        showNotice("No active proof session is available.", "warning");
        return;
      }

      const payloadAnswers = currentProofSession.questionSet.questions.map((question) => ({
        questionId: question.id,
        optionIndex: Number(answers[question.id])
      }));

      if (payloadAnswers.some((item) => Number.isNaN(item.optionIndex))) {
        showNotice("Please answer every proof question before submitting.", "danger");
        return;
      }

      setIsSubmitting(true);

      try {
        await dashboardApi.submitProofSession(currentProofSession.id, payloadAnswers);
        setCurrentProofSession(null);
        requestedCareerIdRef.current = "";
        await refresh();
        navigate(routePaths.dashboardProof, { replace: true });
        showNotice("Proof evidence completed successfully.", "success");
      } catch (error) {
        showNotice((error as Error).message, "danger");
      } finally {
        setIsSubmitting(false);
      }
    },
    [currentProofSession, navigate, refresh, showNotice]
  );

  return {
    dashboard,
    currentProofSession,
    isLoading,
    isSubmitting,
    startProofSession,
    submitProofSession
  };
}
