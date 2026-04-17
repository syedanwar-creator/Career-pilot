import { useState } from "react";

import { Button, Field } from "@/shared/components";

interface ForgotPasswordFormProps {
  isSubmitting: boolean;
  onSubmit: (payload: { email: string }) => Promise<void>;
}

export function ForgotPasswordForm({ isSubmitting, onSubmit }: ForgotPasswordFormProps): JSX.Element {
  const [email, setEmail] = useState<string>("");

  return (
    <form
      className="form-grid"
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmit({ email });
      }}
    >
      <Field htmlFor="forgot-email" label="Email">
        <input
          id="forgot-email"
          className="input"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Field>
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Preparing reset..." : "Send reset link"}
      </Button>
    </form>
  );
}
