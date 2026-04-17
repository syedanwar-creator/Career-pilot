import { useEffect, useMemo } from "react";

import { useUiStore } from "@/store";

const TONE_CONFIG = {
  success: {
    icon: "✓",
    label: "Success",
    accent: "#16a34a",
    iconBg: "#dcfce7",
    textColor: "#15803d",
  },
  warning: {
    icon: "!",
    label: "Warning",
    accent: "#d97706",
    iconBg: "#fef3c7",
    textColor: "#b45309",
  },
  danger: {
    icon: "✕",
    label: "Error",
    accent: "#dc2626",
    iconBg: "#fee2e2",
    textColor: "#b91c1c",
  },
  info: {
    icon: "i",
    label: "Info",
    accent: "#6366f1",
    iconBg: "rgba(99,102,241,0.1)",
    textColor: "#4f46e5",
  },
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
    <>
      <style>{`
        @keyframes slideInToast {
          from { opacity: 0; transform: translateX(-50%) translateY(-16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
      <div
        aria-live={notice.tone === "danger" ? "assertive" : "polite"}
        role={notice.tone === "danger" ? "alert" : "status"}
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "14px 16px",
          paddingLeft: "0",
          borderRadius: "14px",
          background: "#ffffff",
          boxShadow: "0 8px 32px rgba(15,23,42,0.14), 0 0 0 1px rgba(15,23,42,0.06)",
          minWidth: "300px",
          maxWidth: "420px",
          fontFamily: "'Inter', system-ui, sans-serif",
          animation: "slideInToast 0.25s ease",
          overflow: "hidden",
        }}
      >
        {/* Colored left stripe */}
        <div style={{ width: "4px", alignSelf: "stretch", background: meta.accent, borderRadius: "4px 0 0 4px", flexShrink: 0 }} />

        {/* Icon */}
        <div style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: meta.iconBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          fontSize: "13px", fontWeight: 800, color: meta.accent,
        }}>
          {meta.icon}
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: meta.textColor, fontWeight: 700, fontSize: "13px", margin: "0 0 2px", letterSpacing: "-0.01em" }}>
            {meta.label}
          </p>
          <p style={{ color: "#64748b", fontSize: "12px", margin: 0, lineHeight: 1.5 }}>
            {notice.message}
          </p>
        </div>

        {/* Dismiss */}
        <button
          aria-label="Dismiss"
          onClick={clearNotice}
          style={{
            background: "#f1f5f9", border: "none", cursor: "pointer",
            color: "#94a3b8", fontSize: "12px", lineHeight: 1,
            padding: "6px", borderRadius: "6px",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, marginRight: "4px",
            transition: "background 0.15s, color 0.15s",
          }}
        >
          ✕
        </button>
      </div>
    </>
  );
}
