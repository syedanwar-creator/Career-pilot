import { Outlet } from "react-router-dom";

import { AuthLeftPanel } from "@/shared/components/AuthLeftPanel";

export function AuthLayout(): JSX.Element {
  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", fontFamily: "'Inter', system-ui, sans-serif", zIndex: 50, overflow: "hidden" }}>

      <AuthLeftPanel />

      {/* Right Panel — dark bg + floating card */}
      <div style={{ width: "520px", flexShrink: 0, background: "linear-gradient(160deg, #1e1b4b 0%, #0f172a 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 32px", position: "relative", overflowY: "auto" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", width: "100%", maxWidth: "400px", background: "#ffffff", borderRadius: "24px", padding: "40px 36px", boxShadow: "0 25px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)" }}>
          <Outlet />
        </div>
      </div>

    </div>
  );
}
