import { useState } from "react";

interface ForgotPasswordFormProps {
  isSubmitting: boolean;
  onSubmit: (payload: { email: string }) => Promise<void>;
}

export function ForgotPasswordForm({ isSubmitting, onSubmit }: ForgotPasswordFormProps): JSX.Element {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <form onSubmit={(e) => { e.preventDefault(); void onSubmit({ email }); }}
      style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

      <div>
        <label htmlFor="forgot-email" style={{ fontSize: "11px", fontWeight: 600, color: focused || email ? "#6366f1" : "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "4px", transition: "color 0.2s" }}>
          Email Address
        </label>
        <input
          id="forgot-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ width: "100%", border: "none", borderBottom: `2px solid ${focused ? "#6366f1" : "#e2e8f0"}`, borderRadius: 0, padding: "10px 0", fontSize: "14px", color: "#0f172a", background: "transparent", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" }}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        style={{ width: "100%", padding: "15px", background: isSubmitting ? "#a5b4fc" : "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "15px", letterSpacing: "0.05em", textTransform: "uppercase", cursor: isSubmitting ? "not-allowed" : "pointer", boxShadow: isSubmitting ? "none" : "0 4px 20px rgba(79,70,229,0.4)" }}
      >
        {isSubmitting ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
}
