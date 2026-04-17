import { httpClient } from "@/services";

import type { CareerLibraryResponse } from "@/features/dashboard/types";

import type { AdminStudentReportPayload, CreateSchoolStudentPayload, SchoolOverviewResponse } from "./types";

export const adminApi = {
  getOverview(): Promise<SchoolOverviewResponse> {
    return httpClient.get<SchoolOverviewResponse>("/api/schools/overview");
  },
  getStudentReport(studentId: string): Promise<AdminStudentReportPayload> {
    return httpClient.get<AdminStudentReportPayload>(`/api/schools/students/${studentId}`);
  },
  createStudent(payload: CreateSchoolStudentPayload): Promise<{ student: unknown }> {
    return httpClient.post<{ student: unknown }>("/api/schools/students", payload);
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
  }
};
