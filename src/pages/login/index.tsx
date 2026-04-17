import { Link, useSearchParams } from "react-router-dom";

import { LoginForm, useAuthActions } from "@/features/auth";
import { routePaths } from "@/routes/paths";

export default function LoginPage(): JSX.Element {
  const { isSubmitting, login } = useAuthActions();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || undefined;

  return (
    <div className="stack">
      <header className="page-header">
        <p className="eyebrow">Login</p>
        <h1>Access your workspace</h1>
        <p>School users can include their tenant slug. Individual students can leave it empty.</p>
      </header>
      <LoginForm isSubmitting={isSubmitting} onSubmit={(payload) => login(payload, redirectTo)} />
      <div className="actions actions--spread">
        <Link className="text-link" to={routePaths.forgotPassword}>
          Forgot password?
        </Link>
        <Link className="text-link" to={routePaths.register}>
          Create an account
        </Link>
      </div>
    </div>
  );
}
