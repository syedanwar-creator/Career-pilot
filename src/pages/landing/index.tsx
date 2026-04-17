import { Link } from "react-router-dom";

import { AuthLeftPanel } from "@/shared/components/AuthLeftPanel";
import { routePaths } from "@/routes/paths";

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function LandingPage(): JSX.Element {
  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", fontFamily: "'Inter', system-ui, sans-serif", overflow: "hidden", zIndex: 50 }}>

      <AuthLeftPanel />

      {/* Right Panel — dark bg + floating card */}
      <div style={{ width: "520px", flexShrink: 0, background: "linear-gradient(160deg, #1e1b4b 0%, #0f172a 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 32px", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

        <div style={{ position: "relative", width: "100%", maxWidth: "400px", background: "#ffffff", borderRadius: "24px", padding: "40px 36px", boxShadow: "0 25px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: "28px" }}>

          {/* Greeting */}
          <div>
            <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 4px", fontWeight: 500 }}>Hello!</p>
            <p style={{ fontSize: "20px", fontWeight: 800, color: "#6366f1", margin: "0 0 12px", letterSpacing: "-0.01em" }}>
              {getGreeting()} 👋
            </p>
            <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
              Welcome to Career Pilot
            </h2>
            <p style={{ color: "#64748b", fontSize: "13px", margin: 0, lineHeight: 1.6 }}>
              Sign in or create a free account to begin your journey.
            </p>
          </div>

          <div style={{ height: "1px", background: "#f1f5f9" }} />

          {/* Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Link to={routePaths.login} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "14px 24px", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff", borderRadius: "10px", textDecoration: "none", fontWeight: 700, fontSize: "14px", letterSpacing: "0.05em", textTransform: "uppercase", boxShadow: "0 4px 20px rgba(79,70,229,0.4)" }}>
              Sign In
            </Link>
            <Link to={routePaths.register} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "14px 24px", background: "transparent", color: "#4f46e5", border: "2px solid #4f46e5", borderRadius: "10px", textDecoration: "none", fontWeight: 700, fontSize: "14px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Create Account
            </Link>
          </div>

          {/* Trust */}
          <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
            {["🔒 Secure", "⚡ Fast", "🎓 Students", "🤖 AI"].map((b) => (
              <span key={b} style={{ color: "#94a3b8", fontSize: "11px", fontWeight: 500 }}>{b}</span>
            ))}
          </div>

          <p style={{ textAlign: "center", color: "#cbd5e1", fontSize: "11px", margin: 0 }}>
            Free to join · No credit card required
          </p>
        </div>
      </div>
    </div>
  );
}
