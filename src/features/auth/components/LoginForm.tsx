import { useState } from "react";

import type { LoginPayload } from "../types";

interface LoginFormProps {
  initialValues?: Partial<LoginPayload>;
  isSubmitting: boolean;
  onSubmit: (payload: LoginPayload) => Promise<void>;
}

function EyeIcon({ open }: { open: boolean }): JSX.Element {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderBottom: "2px solid #e2e8f0",
  borderRadius: 0,
  padding: "10px 0",
  fontSize: "14px",
  color: "#0f172a",
  background: "transparent",
  outline: "none",
  transition: "border-color 0.2s",
};

export function LoginForm({ initialValues, isSubmitting, onSubmit }: LoginFormProps): JSX.Element {
  const [values, setValues] = useState<LoginPayload>({
    email: initialValues?.email || "",
    password: initialValues?.password || "",
    tenantSlug: initialValues?.tenantSlug || "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <form onSubmit={(e) => { e.preventDefault(); void onSubmit(values); }}
      style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

      {/* Email */}
      <div style={{ position: "relative" }}>
        <label style={{ fontSize: "11px", fontWeight: 600, color: focused === "email" || values.email ? "#6366f1" : "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "4px", transition: "color 0.2s" }}>
          Email Address
        </label>
        <input
          type="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={(e) => setValues((c) => ({ ...c, email: e.target.value }))}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
          style={{ ...inputStyle, borderBottomColor: focused === "email" ? "#6366f1" : "#e2e8f0" }}
          placeholder="you@example.com"
        />
      </div>

      {/* Password */}
      <div style={{ position: "relative" }}>
        <label style={{ fontSize: "11px", fontWeight: 600, color: focused === "password" || values.password ? "#6366f1" : "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "4px", transition: "color 0.2s" }}>
          Password
        </label>
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            value={values.password}
            onChange={(e) => setValues((c) => ({ ...c, password: e.target.value }))}
            onFocus={() => setFocused("password")}
            onBlur={() => setFocused(null)}
            style={{ ...inputStyle, borderBottomColor: focused === "password" ? "#6366f1" : "#e2e8f0", paddingRight: "32px" }}
            placeholder="••••••••"
          />
          <button type="button" onClick={() => setShowPassword((v) => !v)}
            style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#6366f1", display: "flex", alignItems: "center", padding: 0 }}>
            <EyeIcon open={showPassword} />
          </button>
        </div>
      </div>

      {/* Tenant slug */}
      <div style={{ position: "relative" }}>
        <label style={{ fontSize: "11px", fontWeight: 600, color: focused === "tenant" || values.tenantSlug ? "#6366f1" : "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "4px", transition: "color 0.2s" }}>
          Tenant Slug <span style={{ color: "#cbd5e1", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(school only)</span>
        </label>
        <input
          type="text"
          value={values.tenantSlug || ""}
          onChange={(e) => setValues((c) => ({ ...c, tenantSlug: e.target.value }))}
          onFocus={() => setFocused("tenant")}
          onBlur={() => setFocused(null)}
          style={{ ...inputStyle, borderBottomColor: focused === "tenant" ? "#6366f1" : "#e2e8f0" }}
          placeholder="e.g. sunrise-public-school"
        />
      </div>

      {/* Remember + Forgot */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}
            style={{ width: "16px", height: "16px", accentColor: "#6366f1", cursor: "pointer" }} />
          <span style={{ fontSize: "13px", color: "#64748b" }}>Remember me</span>
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: "100%", padding: "15px",
          background: isSubmitting ? "#a5b4fc" : "linear-gradient(135deg, #4f46e5, #7c3aed)",
          color: "#fff", border: "none", borderRadius: "10px",
          fontWeight: 700, fontSize: "15px", letterSpacing: "0.05em", textTransform: "uppercase",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          boxShadow: isSubmitting ? "none" : "0 4px 20px rgba(79,70,229,0.4)",
        }}
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
