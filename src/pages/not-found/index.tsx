import { Link } from "react-router-dom";

import { routePaths } from "@/routes/paths";

export default function NotFoundPage(): JSX.Element {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)",
      fontFamily: "'Inter', system-ui, sans-serif", padding: "24px",
    }}>
      {/* Decorative blobs */}
      <div style={{ position: "fixed", top: "-120px", right: "-120px", width: "480px", height: "480px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "-100px", left: "-100px", width: "360px", height: "360px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ textAlign: "center", maxWidth: "480px", width: "100%", position: "relative" }}>

        {/* 404 badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "999px", marginBottom: "28px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
          <span style={{ color: "#a5b4fc", fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em" }}>PAGE NOT FOUND</span>
        </div>

        {/* Icon */}
        <div style={{ width: "80px", height: "80px", borderRadius: "20px", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", margin: "0 auto 24px", boxShadow: "0 8px 32px rgba(99,102,241,0.35)" }}>
          🧭
        </div>

        {/* Heading */}
        <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#ffffff", margin: "0 0 12px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          Lost in the pilot seat?
        </h1>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: "0 0 36px" }}>
          This route doesn't exist or was moved. Head back to the dashboard and continue charting your career path.
        </p>

        {/* Actions */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            to={routePaths.home}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "12px 24px", borderRadius: "10px",
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              color: "#ffffff", fontWeight: 700, fontSize: "14px",
              textDecoration: "none", boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
              transition: "opacity 0.15s",
            }}
          >
            🚀 Back to dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "12px 24px", borderRadius: "10px",
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "14px",
              cursor: "pointer", fontFamily: "'Inter', system-ui, sans-serif",
              transition: "background 0.15s",
            }}
          >
            ← Go back
          </button>
        </div>
      </div>
    </div>
  );
}
