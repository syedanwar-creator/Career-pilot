import { memo } from "react";

import { cn } from "@/shared/utils";

import type { RegisterMode } from "../types";

const modeLabels: Record<RegisterMode, string> = {
  individual: "Solo Student",
  school_admin: "School Admin",
  school_student: "Join School"
};

interface AuthModeTabsProps {
  mode: RegisterMode;
  onChange: (mode: RegisterMode) => void;
}

export const AuthModeTabs = memo(function AuthModeTabs({ mode, onChange }: AuthModeTabsProps): JSX.Element {
  return (
    <div className="tab-list" role="group" aria-label="Registration mode">
      {(Object.keys(modeLabels) as RegisterMode[]).map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={item === mode}
          className={cn("tab-button", item === mode && "tab-button--active")}
          onClick={() => onChange(item)}
        >
          {modeLabels[item]}
        </button>
      ))}
    </div>
  );
});
