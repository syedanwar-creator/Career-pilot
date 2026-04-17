import { useMemo } from "react";

import { useUiStore } from "@/store";

import { Button } from "./Button";

export function NoticeBanner(): JSX.Element | null {
  const notice = useUiStore((state) => state.notice);
  const clearNotice = useUiStore((state) => state.clearNotice);

  const toneClassName = useMemo(() => {
    if (!notice) {
      return "";
    }

    return `notice--${notice.tone}`;
  }, [notice]);

  const toneMeta = useMemo(() => {
    if (!notice) {
      return null;
    }

    if (notice.tone === "success") {
      return { icon: "✓", label: "Success" };
    }

    if (notice.tone === "warning") {
      return { icon: "!", label: "Warning" };
    }

    if (notice.tone === "danger") {
      return { icon: "!", label: "Error" };
    }

    return { icon: "i", label: "Info" };
  }, [notice]);

  if (!notice) {
    return null;
  }

  return (
    <div
      aria-live={notice.tone === "danger" ? "assertive" : "polite"}
      className={`notice ${toneClassName}`}
      role={notice.tone === "danger" ? "alert" : "status"}
    >
      <div className="notice__body">
        <span aria-hidden="true" className="status-icon">
          {toneMeta?.icon}
        </span>
        <div className="notice__copy">
          <p className="notice__title">{toneMeta?.label}</p>
          <p className="notice__message">{notice.message}</p>
        </div>
      </div>
      <Button aria-label="Dismiss message" variant="ghost" onClick={clearNotice}>
        Dismiss
      </Button>
    </div>
  );
}
