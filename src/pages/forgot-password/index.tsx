import { useState } from "react";
import { Link } from "react-router-dom";

import { ForgotPasswordForm, useAuthActions } from "@/features/auth";
import { routePaths } from "@/routes/paths";

export default function ForgotPasswordPage(): JSX.Element {
  const { isSubmitting, requestPasswordReset } = useAuthActions();
  const [previewUrl, setPreviewUrl] = useState<string>("");

  return (
    <div className="stack">
      <header className="page-header">
        <p className="eyebrow">Forgot password</p>
        <h1>Prepare a reset path</h1>
        <p>This local build returns a preview reset URL so the flow stays testable without an email provider.</p>
      </header>
      <ForgotPasswordForm
        isSubmitting={isSubmitting}
        onSubmit={async (payload) => {
          const response = await requestPasswordReset(payload);
          setPreviewUrl(response.resetUrl || "");
        }}
      />
      {previewUrl ? (
        <div className="status-callout status-callout--info">
          <strong>Reset link preview</strong>
          <p>
            Open <Link to={previewUrl}>{previewUrl}</Link> to continue.
          </p>
        </div>
      ) : null}
      <Link className="text-link" to={routePaths.login}>
        Back to login
      </Link>
    </div>
  );
}
