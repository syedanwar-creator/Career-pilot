import { Link, useParams } from "react-router-dom";

import { ResetPasswordForm, useAuthActions } from "@/features/auth";
import { routePaths } from "@/routes/paths";

export default function ResetPasswordPage(): JSX.Element {
  const { token = "" } = useParams<{ token: string }>();
  const { isSubmitting, resetPassword } = useAuthActions();

  return (
    <div className="stack">
      <header className="page-header">
        <p className="eyebrow">Reset password</p>
        <h1>Create a new password</h1>
        <p>Use a new password with at least six characters to complete the reset flow.</p>
      </header>
      <ResetPasswordForm isSubmitting={isSubmitting} onSubmit={(payload) => resetPassword(token, payload)} />
      <Link className="text-link" to={routePaths.login}>
        Back to login
      </Link>
    </div>
  );
}
