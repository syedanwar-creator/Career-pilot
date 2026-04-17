import { Link } from "react-router-dom";

import { routePaths } from "@/routes/paths";

function StudentIllustration(): JSX.Element {
  return (
    <svg viewBox="0 0 320 340" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: "300px", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))" }}>
      <circle cx="160" cy="180" r="150" stroke="rgba(165,180,252,0.1)" strokeWidth="1" />
      <circle cx="160" cy="180" r="120" stroke="rgba(165,180,252,0.08)" strokeWidth="1" />
      <circle cx="160" cy="180" r="90"  stroke="rgba(165,180,252,0.06)" strokeWidth="1" />
      <circle cx="160" cy="220" r="110" fill="rgba(99,102,241,0.12)" />
      <rect x="30" y="60" width="52" height="38" rx="5" fill="#6366f1" opacity="0.85" transform="rotate(-12 30 60)" />
      <rect x="34" y="64" width="44" height="30" rx="3" fill="#818cf8" opacity="0.6" transform="rotate(-12 30 60)" />
      <line x1="40" y1="73" x2="70" y2="70" stroke="white" strokeWidth="1.2" opacity="0.4" transform="rotate(-12 30 60)" />
      <line x1="40" y1="79" x2="70" y2="76" stroke="white" strokeWidth="1.2" opacity="0.4" transform="rotate(-12 30 60)" />
      <rect x="235" y="50" width="46" height="34" rx="5" fill="#a78bfa" opacity="0.85" transform="rotate(10 235 50)" />
      <rect x="239" y="54" width="38" height="26" rx="3" fill="#c4b5fd" opacity="0.6" transform="rotate(10 235 50)" />
      <rect x="258" y="130" width="8" height="50" rx="4" fill="#fbbf24" opacity="0.9" transform="rotate(30 258 130)" />
      <polygon points="258,130 266,130 262,118" fill="#f59e0b" opacity="0.9" transform="rotate(30 258 130)" />
      <text x="48" y="140" fontSize="16" fill="#fbbf24" opacity="0.7">✦</text>
      <text x="255" y="100" fontSize="12" fill="#a5b4fc" opacity="0.8">✦</text>
      <text x="82" y="55"  fontSize="9"  fill="#f0abfc" opacity="0.7">✦</text>
      <ellipse cx="160" cy="318" rx="65" ry="12" fill="rgba(0,0,0,0.25)" />
      <ellipse cx="140" cy="290" rx="42" ry="16" fill="#3730a3" />
      <ellipse cx="180" cy="290" rx="42" ry="16" fill="#4338ca" />
      <ellipse cx="108" cy="298" rx="16" ry="9" fill="#1e1b4b" />
      <ellipse cx="212" cy="298" rx="16" ry="9" fill="#1e1b4b" />
      <rect x="120" y="200" width="80" height="85" rx="16" fill="#4f46e5" />
      <path d="M148 200 L160 218 L172 200" fill="#6366f1" />
      <rect x="120" y="200" width="30" height="85" rx="16" fill="rgba(0,0,0,0.08)" />
      <rect x="92"  y="220" width="32" height="14" rx="7" fill="#fdba74" />
      <rect x="196" y="220" width="32" height="14" rx="7" fill="#fdba74" />
      <rect x="100" y="225" width="120" height="72" rx="8" fill="white" opacity="0.95" />
      <rect x="100" y="225" width="120" height="8" rx="8" fill="rgba(255,255,255,0.3)" />
      <line x1="160" y1="225" x2="160" y2="297" stroke="#e2e8f0" strokeWidth="2" />
      <line x1="112" y1="244" x2="155" y2="244" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="112" y1="254" x2="155" y2="254" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="112" y1="264" x2="155" y2="264" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="112" y1="274" x2="140" y2="274" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="165" y1="244" x2="208" y2="244" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="165" y1="254" x2="208" y2="254" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="165" y1="264" x2="208" y2="264" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="165" y1="274" x2="192" y2="274" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x="150" y="175" width="20" height="28" rx="8" fill="#fdba74" />
      <circle cx="160" cy="158" r="38" fill="#fdba74" />
      <path d="M122 148 Q124 110 160 108 Q196 110 198 148 Q185 125 160 124 Q135 125 122 148Z" fill="#1c1917" />
      <path d="M122 148 Q118 155 122 165 Q126 138 138 132" fill="#292524" />
      <path d="M198 148 Q202 155 198 165 Q194 138 182 132" fill="#292524" />
      <ellipse cx="148" cy="158" rx="5" ry="6" fill="#1c1917" />
      <ellipse cx="172" cy="158" rx="5" ry="6" fill="#1c1917" />
      <circle cx="150" cy="156" r="2" fill="white" />
      <circle cx="174" cy="156" r="2" fill="white" />
      <path d="M141 149 Q148 145 155 149" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M165 149 Q172 145 179 149" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <rect x="138" y="152" width="20" height="15" rx="6" stroke="#374151" strokeWidth="2" fill="rgba(147,197,253,0.15)" />
      <rect x="162" y="152" width="20" height="15" rx="6" stroke="#374151" strokeWidth="2" fill="rgba(147,197,253,0.15)" />
      <line x1="158" y1="159" x2="162" y2="159" stroke="#374151" strokeWidth="2" />
      <line x1="138" y1="159" x2="132" y2="157" stroke="#374151" strokeWidth="1.5" />
      <line x1="182" y1="159" x2="188" y2="157" stroke="#374151" strokeWidth="1.5" />
      <path d="M152 172 Q160 179 168 172" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" fill="none" />
      <rect x="220" y="230" width="56" height="34" rx="10" fill="#4f46e5" opacity="0.95" />
      <text x="231" y="244" fontSize="9" fill="white" opacity="0.8" fontWeight="600">GRADE</text>
      <text x="229" y="258" fontSize="13" fill="#fbbf24" fontWeight="800">A+</text>
      <rect x="30" y="230" width="44" height="34" rx="10" fill="#7c3aed" opacity="0.9" />
      <text x="40" y="254" fontSize="18">📚</text>
    </svg>
  );
}

const BUBBLES = [
  { emoji: "💼", top: "5%",    left: "8%",   size: 38, delay: "0s"   },
  { emoji: "🎓", top: "9%",    right: "10%", size: 38, delay: "0.4s" },
  { emoji: "💡", top: "26%",   left: "6%",   size: 34, delay: "0.8s" },
  { emoji: "🏆", top: "17%",   right: "8%",  size: 34, delay: "1.2s" },
  { emoji: "🔬", bottom: "27%",left: "7%",   size: 32, delay: "0.6s" },
  { emoji: "📊", bottom: "17%",right: "8%",  size: 32, delay: "1s"   },
  { emoji: "💻", bottom: "7%", left: "10%",  size: 36, delay: "1.4s" },
  { emoji: "🌟", bottom: "9%", right: "11%", size: 34, delay: "0.2s" },
  { emoji: "📝", top: "44%",   left: "5%",   size: 30, delay: "0.9s" },
  { emoji: "🚀", top: "54%",   right: "6%",  size: 30, delay: "0.5s" },
  { emoji: "🎯", top: "71%",   left: "6%",   size: 30, delay: "1.1s" },
  { emoji: "⭐", top: "37%",   right: "7%",  size: 28, delay: "0.7s" },
];

const FEATURES = [
  { icon: "🤖", label: "AI Career Matching" },
  { icon: "🗺️", label: "Personalized Roadmap" },
  { icon: "🏫", label: "School Integration" },
  { icon: "📈", label: "Progress Tracking" },
];

export function AuthLeftPanel(): JSX.Element {
  return (
    <div style={{ flex: 1, background: "linear-gradient(150deg, #0f172a 0%, #1e1b4b 55%, #2d1b69 100%)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "32px 48px", position: "relative", overflow: "hidden" }}>

      {/* Glow blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-100px", left: "-80px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "-80px", right: "-60px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)", filter: "blur(70px)" }} />
        <div style={{ position: "absolute", top: "40%", right: "5%", width: "280px", height: "280px", borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />

        {/* Emoji bubbles — solid indigo background so all look uniform */}
        {BUBBLES.map((b, i) => (
          <div key={i} style={{
            position: "absolute",
            top: (b as any).top, bottom: (b as any).bottom,
            left: (b as any).left, right: (b as any).right,
            width: `${b.size}px`, height: `${b.size}px`,
            borderRadius: "11px",
            background: "linear-gradient(135deg, #4f46e5 0%, #6d28d9 100%)",
            border: "1px solid rgba(165,180,252,0.35)",
            boxShadow: "0 4px 12px rgba(79,70,229,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: `${b.size * 0.48}px`,
            animation: "floatBubble 4s ease-in-out infinite",
            animationDelay: b.delay,
          }}>
            {b.emoji}
          </div>
        ))}

        {/* Dotted grid */}
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.06 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#a5b4fc" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        <style>{`
          @keyframes floatBubble {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50%       { transform: translateY(-9px) rotate(2deg); }
          }
        `}</style>
      </div>

      <div style={{ position: "relative", width: "100%", maxWidth: "480px" }}>

        {/* Logo */}
        <Link to={routePaths.home} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", textDecoration: "none" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", boxShadow: "0 4px 20px rgba(99,102,241,0.5)" }}>🚀</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: "16px", letterSpacing: "-0.01em", lineHeight: 1.2 }}>Career Pilot</div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px", letterSpacing: "0.06em" }}>AI CAREER PLATFORM</div>
          </div>
        </Link>

        {/* Badge + Headline */}
        <div style={{ marginBottom: "18px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "50px", padding: "5px 12px", marginBottom: "12px" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#818cf8", display: "inline-block" }} />
            <span style={{ color: "#a5b4fc", fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em" }}>165+ Career Paths Available</span>
          </div>
          <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.03em", margin: "0 0 8px" }}>
            Find your path.<br />
            <span style={{ background: "linear-gradient(90deg, #a5b4fc, #f0abfc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Build your future.
            </span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: 1.6, margin: 0 }}>
            AI-powered career guidance for students and schools.
          </p>
        </div>

        {/* Feature pills */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "18px" }}>
          {FEATURES.map((f) => (
            <div key={f.label} style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "9px 12px" }}>
              <span style={{ fontSize: "16px" }}>{f.icon}</span>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", fontWeight: 600 }}>{f.label}</span>
            </div>
          ))}
        </div>

        {/* Illustration */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "18px" }}>
          <StudentIllustration />
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "0", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {[
            { n: "165+", l: "Career Paths", icon: "🗺️" },
            { n: "2K+",  l: "Students",     icon: "🎓" },
            { n: "50+",  l: "Schools",       icon: "🏫" },
            { n: "100%", l: "Free",          icon: "✨" },
          ].map((s, i) => (
            <div key={s.l} style={{ flex: 1, textAlign: "center", paddingRight: i < 3 ? "0" : "0", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
              <div style={{ fontSize: "13px", marginBottom: "2px" }}>{s.icon}</div>
              <div style={{ color: "#a5b4fc", fontWeight: 800, fontSize: "17px", lineHeight: 1 }}>{s.n}</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", marginTop: "3px" }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div style={{ marginTop: "14px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "12px", padding: "12px 14px", display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <span style={{ fontSize: "20px", lineHeight: 1 }}>💬</span>
          <div>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "11px", lineHeight: 1.6, margin: "0 0 5px", fontStyle: "italic" }}>
              "Career Pilot helped me discover my passion and land my dream internship!"
            </p>
            <span style={{ color: "#818cf8", fontSize: "10px", fontWeight: 700 }}>— Priya S., Computer Science Student</span>
          </div>
        </div>

      </div>
    </div>
  );
}
