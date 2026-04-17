import { useMemo, useState } from "react";

import { Button, Field } from "@/shared/components";

import { AuthModeTabs } from "./AuthModeTabs";
import type { RegisterMode, RegisterPayload } from "../types";

interface RegisterFormProps {
  defaultMode?: RegisterMode;
  isSubmitting: boolean;
  onSubmit: (payload: RegisterPayload) => Promise<void>;
}

interface RegisterValues {
  fullName: string;
  email: string;
  grade: string;
  schoolName: string;
  tenantSlug: string;
  joinCode: string;
  password: string;
}

const initialValues: RegisterValues = {
  fullName: "",
  email: "",
  grade: "",
  schoolName: "",
  tenantSlug: "",
  joinCode: "",
  password: ""
};

export function RegisterForm({ defaultMode = "individual", isSubmitting, onSubmit }: RegisterFormProps): JSX.Element {
  const [mode, setMode] = useState<RegisterMode>(defaultMode);
  const [values, setValues] = useState<RegisterValues>(initialValues);

  const subtitle = useMemo(() => {
    if (mode === "school_admin") {
      return "Create a tenant-managed school workspace.";
    }

    if (mode === "school_student") {
      return "Join your school using the tenant slug or join code.";
    }

    return "Create an independent student account.";
  }, [mode]);

  return (
    <form
      className="form-grid"
      onSubmit={(event) => {
        event.preventDefault();

        if (mode === "school_admin") {
          void onSubmit({
            accountType: "school_admin",
            fullName: values.fullName,
            email: values.email,
            schoolName: values.schoolName,
            tenantSlug: values.tenantSlug,
            password: values.password
          });
          return;
        }

        if (mode === "school_student") {
          void onSubmit({
            accountType: "school_student",
            fullName: values.fullName,
            email: values.email,
            grade: values.grade,
            tenantSlug: values.tenantSlug,
            joinCode: values.joinCode,
            password: values.password
          });
          return;
        }

        void onSubmit({
          accountType: "individual",
          fullName: values.fullName,
          email: values.email,
          grade: values.grade,
          password: values.password
        });
      }}
    >
      <AuthModeTabs mode={mode} onChange={setMode} />
      <p className="support-copy">{subtitle}</p>

      <Field htmlFor="register-full-name" label="Full name">
        <input
          id="register-full-name"
          className="input"
          type="text"
          required
          value={values.fullName}
          onChange={(event) => setValues((current) => ({ ...current, fullName: event.target.value }))}
        />
      </Field>

      <Field htmlFor="register-email" label="Email">
        <input
          id="register-email"
          className="input"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
        />
      </Field>

      {mode === "school_admin" ? (
        <Field htmlFor="register-school-name" label="School name">
          <input
            id="register-school-name"
            className="input"
            type="text"
            required
            value={values.schoolName}
            onChange={(event) => setValues((current) => ({ ...current, schoolName: event.target.value }))}
          />
        </Field>
      ) : (
        <Field htmlFor="register-grade" label="Grade / stage">
          <input
            id="register-grade"
            className="input"
            type="text"
            value={values.grade}
            onChange={(event) => setValues((current) => ({ ...current, grade: event.target.value }))}
          />
        </Field>
      )}

      {(mode === "school_admin" || mode === "school_student") && (
        <Field htmlFor="register-tenant-slug" label="Tenant slug">
          <input
            id="register-tenant-slug"
            className="input"
            type="text"
            required={mode === "school_admin"}
            value={values.tenantSlug}
            onChange={(event) => setValues((current) => ({ ...current, tenantSlug: event.target.value }))}
          />
        </Field>
      )}

      {mode === "school_student" ? (
        <Field htmlFor="register-join-code" label="Join code">
          <input
            id="register-join-code"
            className="input"
            type="text"
            value={values.joinCode}
            onChange={(event) => setValues((current) => ({ ...current, joinCode: event.target.value }))}
          />
        </Field>
      ) : null}

      <Field htmlFor="register-password" label="Password">
        <input
          id="register-password"
          className="input"
          type="password"
          minLength={6}
          required
          autoComplete="new-password"
          value={values.password}
          onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
        />
      </Field>

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
