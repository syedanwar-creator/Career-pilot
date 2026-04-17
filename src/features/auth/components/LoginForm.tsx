import { useState } from "react";

import { Button, Field } from "@/shared/components";

import type { LoginPayload } from "../types";

interface LoginFormProps {
  initialValues?: Partial<LoginPayload>;
  isSubmitting: boolean;
  onSubmit: (payload: LoginPayload) => Promise<void>;
}

export function LoginForm({ initialValues, isSubmitting, onSubmit }: LoginFormProps): JSX.Element {
  const [values, setValues] = useState<LoginPayload>({
    email: initialValues?.email || "",
    password: initialValues?.password || "",
    tenantSlug: initialValues?.tenantSlug || ""
  });

  return (
    <form
      className="form-grid"
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmit(values);
      }}
    >
      <Field htmlFor="login-email" label="Email">
        <input
          id="login-email"
          className="input"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
        />
      </Field>
      <Field htmlFor="login-password" label="Password">
        <input
          id="login-password"
          className="input"
          type="password"
          autoComplete="current-password"
          required
          value={values.password}
          onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
        />
      </Field>
      <Field
        htmlFor="login-tenant-slug"
        label="Tenant slug"
        helperText="Required for school accounts. Leave empty for individual students."
        helperTone="info"
      >
        <input
          id="login-tenant-slug"
          className="input"
          type="text"
          value={values.tenantSlug || ""}
          onChange={(event) => setValues((current) => ({ ...current, tenantSlug: event.target.value }))}
        />
      </Field>
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
