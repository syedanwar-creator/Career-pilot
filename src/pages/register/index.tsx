import { Link } from "react-router-dom";

import { RegisterForm, useAuthActions } from "@/features/auth";
import { routePaths } from "@/routes/paths";

export default function RegisterPage(): JSX.Element {
  const { isSubmitting, register } = useAuthActions();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

      {/* Greeting */}
      <div>
        <p style={{ fontSize: "14px", color: "#94a3b8", margin: "0 0 4px", fontWeight: 500 }}>Hello!</p>
        <p style={{ fontSize: "22px", fontWeight: 800, color: "#6366f1", margin: "0 0 16px", letterSpacing: "-0.01em" }}>
          Get Started 🚀
        </p>
        <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.02em" }}>
          Create Your Account
        </h2>
        <p style={{ color: "#64748b", fontSize: "14px", margin: "8px 0 0", lineHeight: 1.6 }}>
          Join Career Pilot and start exploring your future today.
        </p>
      </div>

      {/* Form */}
      <RegisterForm isSubmitting={isSubmitting} onSubmit={register} />

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#94a3b8", fontSize: "13px" }}>Already have an account?</span>
        <Link to={routePaths.login}
          style={{ color: "#6366f1", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
          Sign In →
        </Link>
      </div>
    </div>
  );
}
