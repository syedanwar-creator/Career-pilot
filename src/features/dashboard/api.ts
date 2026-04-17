import { httpClient } from "@/services";

import type {
  Career,
  CareerLibraryResponse,
  ProfileFormValues,
  ProfileQuestionSet,
  ProofSession,
  QuestionAnswer,
  StudentDashboardResponse
} from "./types";

export const dashboardApi = {
  getDashboard(): Promise<StudentDashboardResponse> {
    return httpClient.get<StudentDashboardResponse>("/api/dashboard");
  },
  getCareers(search?: string, category?: string): Promise<CareerLibraryResponse> {
    const searchParams = new URLSearchParams();

    if (search) {
      searchParams.set("search", search);
    }

    if (category) {
      searchParams.set("category", category);
    }

    searchParams.set("limit", "200");

    return httpClient.get<CareerLibraryResponse>(`/api/careers?${searchParams.toString()}`);
  },
  getCareer(careerId: string): Promise<{ career: Career }> {
    return httpClient.get<{ career: Career }>(`/api/careers/${careerId}`);
  },
  generateProfileQuestionSet(payload: ProfileFormValues): Promise<ProfileQuestionSet> {
    return httpClient.post<ProfileQuestionSet>("/api/profile/question-set", payload);
  },
  submitProfile(payload: {
    basicInfo: ProfileFormValues;
    questionSet: ProfileQuestionSet;
    answers: QuestionAnswer[];
  }): Promise<{ profile: unknown }> {
    return httpClient.post<{ profile: unknown }>("/api/profile/submit", payload);
  },
  startProofSession(careerId: string): Promise<{ session: ProofSession }> {
    return httpClient.post<{ session: ProofSession }>(`/api/careers/${careerId}/proof-session`);
  },
  submitProofSession(sessionId: string, answers: QuestionAnswer[]): Promise<{ session: ProofSession }> {
    return httpClient.post<{ session: ProofSession }>(`/api/proof-sessions/${sessionId}/submit`, { answers });
  }
};
