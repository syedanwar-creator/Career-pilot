import { create } from "zustand";

import type { NoticeState, NoticeTone } from "@/shared/types";

interface UiState {
  notice: NoticeState | null;
  showNotice: (message: string, tone?: NoticeTone) => void;
  clearNotice: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  notice: null,
  showNotice: (message, tone = "info") =>
    set(() => ({
      notice: {
        id: crypto.randomUUID(),
        message,
        tone
      }
    })),
  clearNotice: () =>
    set(() => ({
      notice: null
    }))
}));
