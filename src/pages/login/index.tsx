import { Link, useSearchParams } from "react-router-dom";

import { LoginForm, useAuthActions } from "@/features/auth";
import { routePaths } from "@/routes/paths";

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function LoginPage(): JSX.Element {
  const { isSubmitting, login } = useAuthActions();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || undefined;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

      {/* Greeting */}
      <div>
        <p style={{ fontSize: "14px", color: "#94a3b8", margin: "0 0 4px", fontWeight: 500 }}>Hello!</p>
        <p style={{ fontSize: "22px", fontWeight: 800, color: "#6366f1", margin: "0 0 16px", letterSpacing: "-0.01em" }}>
          {getGreeting()} 👋
        </p>
        <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.02em" }}>
          Login Your Account
        </h2>
      </div>

      {/* Form */}
      <LoginForm isSubmitting={isSubmitting} onSubmit={(payload) => login(payload, redirectTo)} />

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to={routePaths.forgotPassword}
          style={{ color: "#6366f1", fontSize: "13px", fontWeight: 500, textDecoration: "none" }}>
          Forgot Password?
        </Link>
        <Link to={routePaths.register}
          style={{ color: "#6366f1", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
          Create Account →
        </Link>
      </div>
    </div>
  );
}
