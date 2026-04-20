import Link from "next/link";

import { ForgotPasswordForm } from "../AuthForm";
import { redirectIfAuthenticated } from "@/lib/session";

export default async function ForgotPasswordPage(): Promise<JSX.Element> {
  await redirectIfAuthenticated();

  return (
    <main style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px" }}>
      <p style={{ textTransform: "uppercase", letterSpacing: "0.08em", color: "#4b6480", fontSize: "12px" }}>Auth</p>
      <h1 style={{ marginTop: "8px", fontSize: "36px" }}>Forgot password</h1>
      <p style={{ color: "#334a62", lineHeight: 1.6 }}>
        Request a password reset token from the new NestJS auth service.
      </p>
      <ForgotPasswordForm />
      <p style={{ marginTop: "16px" }}>
        <Link href="/login">Back to login</Link>
      </p>
    </main>
  );
}
