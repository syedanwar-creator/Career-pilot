import { useEffect, useMemo } from "react";

import { useUiStore } from "@/store";

const TONE_CONFIG = {
  success: { icon: "✓", label: "Success", color: "#16a34a", bg: "#f0fdf4", border: "#86efac" },
  warning: { icon: "!", label: "Warning", color: "#d97706", bg: "#fffbeb", border: "#fcd34d" },
  danger:  { icon: "!", label: "Error",   color: "#dc2626", bg: "#fef2f2", border: "#fca5a5" },
  info:    { icon: "i", label: "Info",    color: "#2563eb", bg: "#eff6ff", border: "#93c5fd" },
} as const;

export function NoticeBanner(): JSX.Element | null {
  const notice = useUiStore((state) => state.notice);
  const clearNotice = useUiStore((state) => state.clearNotice);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(clearNotice, 5000);
    return () => clearTimeout(timer);
  }, [notice, clearNotice]);

  const meta = useMemo(() => {
    if (!notice) return null;
    return TONE_CONFIG[notice.tone as keyof typeof TONE_CONFIG] ?? TONE_CONFIG.info;
  }, [notice]);

  if (!notice || !meta) return null;

  return (
    <div
      aria-live={notice.tone === "danger" ? "assertive" : "polite"}
      role={notice.tone === "danger" ? "alert" : "status"}
      style={{
        position: "fixed",
        top: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "14px 18px",
        borderRadius: "12px",
        border: `1px solid ${meta.border}`,
        background: meta.bg,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        minWidth: "280px",
        maxWidth: "380px",
        animation: "slideInToast 0.3s ease",
      }}
    >
      <span style={{ color: meta.color, fontWeight: 700, fontSize: "16px", lineHeight: 1, marginTop: "2px" }}>
        {meta.icon}
      </span>
      <div style={{ flex: 1 }}>
        <p style={{ color: meta.color, fontWeight: 700, fontSize: "13px", margin: "0 0 2px" }}>{meta.label}</p>
        <p style={{ color: "#374151", fontSize: "13px", margin: 0 }}>{notice.message}</p>
      </div>
      <button
        aria-label="Dismiss"
        onClick={clearNotice}
        style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: "16px", lineHeight: 1, padding: "2px" }}
      >
        ✕
      </button>
      <style>{`
        @keyframes slideInToast {
          from { opacity: 0; transform: translateX(-50%) translateY(-12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
