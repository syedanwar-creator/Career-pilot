import { create } from "zustand";

import type { AppRuntimeConfig } from "@/shared/types";

interface AppState {
  config: AppRuntimeConfig | null;
  setConfig: (config: AppRuntimeConfig) => void;
}

export const useAppStore = create<AppState>((set) => ({
  config: null,
  setConfig: (config) =>
    set(() => ({
      config
    }))
}));
