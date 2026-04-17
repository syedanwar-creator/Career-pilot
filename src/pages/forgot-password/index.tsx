import { useState } from "react";
import { Link } from "react-router-dom";

import { ForgotPasswordForm, useAuthActions } from "@/features/auth";
import { routePaths } from "@/routes/paths";

export default function ForgotPasswordPage(): JSX.Element {
  const { isSubmitting, requestPasswordReset } = useAuthActions();
  const [previewUrl, setPreviewUrl] = useState<string>("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

      {/* Header */}
      <div>
        <p style={{ fontSize: "14px", color: "#94a3b8", margin: "0 0 4px", fontWeight: 500 }}>Oops!</p>
        <p style={{ fontSize: "22px", fontWeight: 800, color: "#6366f1", margin: "0 0 16px", letterSpacing: "-0.01em" }}>
          Forgot Password? 🔑
        </p>
        <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.02em" }}>
          Reset Your Password
        </h2>
        <p style={{ color: "#64748b", fontSize: "14px", margin: "8px 0 0", lineHeight: 1.6 }}>
          Enter your email and we'll send you a reset link.
        </p>
      </div>

      {/* Form */}
      <ForgotPasswordForm
        isSubmitting={isSubmitting}
        onSubmit={async (payload) => {
          const response = await requestPasswordReset(payload);
          setPreviewUrl(response.resetUrl || "");
        }}
      />

      {/* Reset link preview */}
      {previewUrl && (
        <div style={{ padding: "16px", background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: "12px" }}>
          <p style={{ color: "#2563eb", fontWeight: 700, fontSize: "13px", margin: "0 0 6px" }}>✓ Reset link ready</p>
          <Link to={previewUrl} style={{ color: "#4f46e5", fontSize: "13px", wordBreak: "break-all" }}>
            {previewUrl}
          </Link>
        </div>
      )}

      {/* Back link */}
      <div style={{ textAlign: "center" }}>
        <Link to={routePaths.login}
          style={{ color: "#6366f1", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
          ← Back to Login
        </Link>
      </div>
    </div>
  );
}
