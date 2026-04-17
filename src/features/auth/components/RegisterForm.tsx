import { useMemo, useState } from "react";

import { AuthModeTabs } from "./AuthModeTabs";
import type { RegisterMode, RegisterPayload } from "../types";

interface RegisterFormProps {
  defaultMode?: RegisterMode;
  isSubmitting: boolean;
  onSubmit: (payload: RegisterPayload) => Promise<void>;
}

interface RegisterValues {
  fullName: string;
  email: string;
  grade: string;
  schoolName: string;
  tenantSlug: string;
  joinCode: string;
  password: string;
}

const initialValues: RegisterValues = {
  fullName: "", email: "", grade: "", schoolName: "", tenantSlug: "", joinCode: "", password: "",
};

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

function UnderlineInput({ id, label, type = "text", value, onChange, required, placeholder, minLength, autoComplete, extra }: {
  id: string; label: string; type?: string; value: string;
  onChange: (v: string) => void; required?: boolean; placeholder?: string;
  minLength?: number; autoComplete?: string; extra?: React.ReactNode;
}): JSX.Element {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <label htmlFor={id} style={{ fontSize: "11px", fontWeight: 600, color: focused || value ? "#6366f1" : "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "4px", transition: "color 0.2s" }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          id={id} type={type} value={value} required={required} placeholder={placeholder}
          minLength={minLength} autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ width: "100%", border: "none", borderBottom: `2px solid ${focused ? "#6366f1" : "#e2e8f0"}`, borderRadius: 0, padding: "10px 0", paddingRight: extra ? "32px" : "0", fontSize: "14px", color: "#0f172a", background: "transparent", outline: "none", transition: "border-color 0.2s" }}
        />
        {extra}
      </div>
    </div>
  );
}

export function RegisterForm({ defaultMode = "individual", isSubmitting, onSubmit }: RegisterFormProps): JSX.Element {
  const [mode, setMode] = useState<RegisterMode>(defaultMode);
  const [values, setValues] = useState<RegisterValues>(initialValues);
  const [showPassword, setShowPassword] = useState(false);

  const subtitle = useMemo(() => {
    if (mode === "school_admin") return "Create a tenant-managed school workspace.";
    if (mode === "school_student") return "Join your school using the tenant slug or join code.";
    return "Create an independent student account.";
  }, [mode]);

  const set = (key: keyof RegisterValues) => (v: string) => setValues((c) => ({ ...c, [key]: v }));

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if (mode === "school_admin") { void onSubmit({ accountType: "school_admin", fullName: values.fullName, email: values.email, schoolName: values.schoolName, tenantSlug: values.tenantSlug, password: values.password }); return; }
      if (mode === "school_student") { void onSubmit({ accountType: "school_student", fullName: values.fullName, email: values.email, grade: values.grade, tenantSlug: values.tenantSlug, joinCode: values.joinCode, password: values.password }); return; }
      void onSubmit({ accountType: "individual", fullName: values.fullName, email: values.email, grade: values.grade, password: values.password });
    }} style={{ display: "flex", flexDirection: "column", gap: "22px" }}>

      {/* Mode tabs */}
      <AuthModeTabs mode={mode} onChange={setMode} />
      <p style={{ color: "#64748b", fontSize: "12px", margin: 0 }}>{subtitle}</p>

      <UnderlineInput id="reg-name" label="Full Name" value={values.fullName} onChange={set("fullName")} required placeholder="John Doe" />
      <UnderlineInput id="reg-email" label="Email Address" type="email" value={values.email} onChange={set("email")} required autoComplete="email" placeholder="you@example.com" />

      {mode === "school_admin"
        ? <UnderlineInput id="reg-school" label="School Name" value={values.schoolName} onChange={set("schoolName")} required placeholder="Sunrise High School" />
        : <UnderlineInput id="reg-grade" label="Grade / Stage" value={values.grade} onChange={set("grade")} placeholder="e.g. Grade 10" />
      }

      {(mode === "school_admin" || mode === "school_student") && (
        <UnderlineInput id="reg-slug" label="Tenant Slug" value={values.tenantSlug} onChange={set("tenantSlug")} required={mode === "school_admin"} placeholder="sunrise-public-school" />
      )}

      {mode === "school_student" && (
        <UnderlineInput id="reg-join" label="Join Code" value={values.joinCode} onChange={set("joinCode")} placeholder="Enter join code" />
      )}

      {/* Password with eye */}
      <div style={{ position: "relative" }}>
        <UnderlineInput
          id="reg-password" label="Password" type={showPassword ? "text" : "password"}
          value={values.password} onChange={set("password")} required
          minLength={6} autoComplete="new-password" placeholder="Min. 6 characters"
          extra={
            <button type="button" onClick={() => setShowPassword((v) => !v)}
              style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#6366f1", display: "flex", alignItems: "center", padding: 0 }}>
              <EyeIcon open={showPassword} />
            </button>
          }
        />
      </div>

      {/* Submit */}
      <button type="submit" disabled={isSubmitting}
        style={{ width: "100%", padding: "15px", marginTop: "8px", background: isSubmitting ? "#a5b4fc" : "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "15px", letterSpacing: "0.05em", textTransform: "uppercase", cursor: isSubmitting ? "not-allowed" : "pointer", boxShadow: isSubmitting ? "none" : "0 4px 20px rgba(79,70,229,0.4)" }}>
        {isSubmitting ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
}
