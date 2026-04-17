import { useCallback, useMemo, useState } from "react";

import { settingsApi } from "@/features/settings/api";
import { useUiStore } from "@/store";

interface PasswordFormState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function useSecuritySettings(): {
  formValues: PasswordFormState;
  isDirty: boolean;
  isSubmitting: boolean;
  passwordsMatch: boolean;
  updateField: (field: keyof PasswordFormState, value: string) => void;
  save: () => Promise<void>;
} {
  const [formValues, setFormValues] = useState<PasswordFormState>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const showNotice = useUiStore((state) => state.showNotice);

  const passwordsMatch = useMemo(
    () => formValues.newPassword.length >= 6 && formValues.newPassword === formValues.confirmPassword,
    [formValues.confirmPassword, formValues.newPassword]
  );

  const isDirty = useMemo(
    () => Boolean(formValues.currentPassword || formValues.newPassword || formValues.confirmPassword),
    [formValues]
  );

  const updateField = useCallback((field: keyof PasswordFormState, value: string) => {
    setFormValues((current) => ({
      ...current,
      [field]: value
    }));
  }, []);

  const save = useCallback(async () => {
    if (!passwordsMatch) {
      showNotice("Passwords must match and be at least 6 characters long.", "danger");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await settingsApi.updatePassword({
        currentPassword: formValues.currentPassword,
        newPassword: formValues.newPassword
      });
      setFormValues({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      showNotice(response.message, "success");
    } catch (error) {
      showNotice((error as Error).message, "danger");
    } finally {
      setIsSubmitting(false);
    }
  }, [formValues.currentPassword, formValues.newPassword, passwordsMatch, showNotice]);

  return {
    formValues,
    isDirty,
    isSubmitting,
    passwordsMatch,
    updateField,
    save
  };
}
