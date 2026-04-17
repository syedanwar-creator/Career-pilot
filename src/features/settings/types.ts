import type { ProfileSettings } from "@/shared/types";

export interface ProfileSettingsResponse {
  settings: ProfileSettings;
}

export interface UpdateProfileSettingsPayload {
  fullName: string;
  grade: string;
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}
