import { memo } from "react";

import type { RegisterMode } from "../types";

const modeLabels: Record<RegisterMode, string> = {
  individual:     "Solo Student",
  school_admin:   "School Admin",
  school_student: "Join School",
};

interface AuthModeTabsProps {
  mode: RegisterMode;
  onChange: (mode: RegisterMode) => void;
}

export const AuthModeTabs = memo(function AuthModeTabs({ mode, onChange }: AuthModeTabsProps): JSX.Element {
  return (
    <div role="group" aria-label="Registration mode"
      style={{ display: "flex", gap: "6px", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: "10px", padding: "4px" }}>
      {(Object.keys(modeLabels) as RegisterMode[]).map((item) => {
        const active = item === mode;
        return (
          <button
            key={item}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(item)}
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: "8px",
              border: "none",
              fontSize: "12px",
              fontWeight: 700,
              fontFamily: "'Inter', system-ui, sans-serif",
              letterSpacing: "0.03em",
              cursor: "pointer",
              transition: "all 0.15s ease",
              background: active ? "linear-gradient(135deg, #4f46e5, #7c3aed)" : "transparent",
              color: active ? "#ffffff" : "#6366f1",
              boxShadow: active ? "0 2px 8px rgba(79,70,229,0.35)" : "none",
            }}
          >
            {modeLabels[item]}
          </button>
        );
      })}
    </div>
  );
});
