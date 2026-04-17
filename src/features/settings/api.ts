import { httpClient } from "@/services";

import type { ProfileSettingsResponse, UpdatePasswordPayload, UpdateProfileSettingsPayload } from "./types";

export const settingsApi = {
  getProfileSettings(): Promise<ProfileSettingsResponse> {
    return httpClient.get<ProfileSettingsResponse>("/api/settings/profile");
  },
  updateProfileSettings(payload: UpdateProfileSettingsPayload): Promise<ProfileSettingsResponse> {
    return httpClient.put<ProfileSettingsResponse>("/api/settings/profile", payload);
  },
  updatePassword(payload: UpdatePasswordPayload): Promise<{ ok: boolean; message: string }> {
    return httpClient.put<{ ok: boolean; message: string }>("/api/settings/password", payload);
  }
};
