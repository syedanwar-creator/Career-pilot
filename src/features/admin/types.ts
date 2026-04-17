import type { Career, Recommendation, StudentDashboardResponse } from "@/features/dashboard/types";
import type { AuthUser, TenantSummary } from "@/shared/types";

export interface SchoolStudentCard {
  student: AuthUser;
  profileCompleted: boolean;
  topRecommendation: Recommendation | null;
  latestProof: {
    id: string;
    careerId: string;
    careerTitle: string;
    points: number;
    overallScore: number;
    readinessBand: string;
    completedAt: string;
  } | null;
  totalPoints: number;
}

export interface SchoolOverviewResponse {
  tenant: TenantSummary;
  stats: {
    totalStudents: number;
    completedProfiles: number;
    proofCount: number;
    totalPoints: number;
  };
  students: SchoolStudentCard[];
}

export interface CreateSchoolStudentPayload {
  fullName: string;
  email: string;
  grade: string;
  password: string;
}

export interface AdminStudentReportPayload extends StudentDashboardResponse {}

export interface AdminCareerLibraryState {
  careers: Career[];
  selectedCareer: Career | null;
}
