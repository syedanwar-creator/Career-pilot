import { useCallback, useEffect, useMemo, useState } from "react";

import { settingsApi } from "@/features/settings/api";
import { useAuthStore, useUiStore } from "@/store";

interface ProfileFormState {
  fullName: string;
  grade: string;
}

export function useProfileSettings(): {
  email: string;
  tenantLabel: string;
  formValues: ProfileFormState;
  isDirty: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
  updateField: (field: keyof ProfileFormState, value: string) => void;
  save: () => Promise<void>;
} {
  const [formValues, setFormValues] = useState<ProfileFormState>({
    fullName: "",
    grade: ""
  });
  const [baseline, setBaseline] = useState<ProfileFormState>({
    fullName: "",
    grade: ""
  });
  const [email, setEmail] = useState<string>("");
  const [tenantLabel, setTenantLabel] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const updateUser = useAuthStore((state) => state.updateUser);
  const showNotice = useUiStore((state) => state.showNotice);

  useEffect(() => {
    let isActive = true;

    settingsApi
      .getProfileSettings()
      .then((response) => {
        if (!isActive) {
          return;
        }

        const nextValues = {
          fullName: response.settings.fullName,
          grade: response.settings.grade
        };

        setFormValues(nextValues);
        setBaseline(nextValues);
        setEmail(response.settings.email);
        setTenantLabel(response.settings.tenant?.name || "Independent workspace");
      })
      .catch((error: Error) => {
        if (!isActive) {
          return;
        }

        showNotice(error.message, "danger");
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [showNotice]);

  const isDirty = useMemo(() => JSON.stringify(formValues) !== JSON.stringify(baseline), [baseline, formValues]);

  const updateField = useCallback((field: keyof ProfileFormState, value: string) => {
    setFormValues((current) => ({
      ...current,
      [field]: value
    }));
  }, []);

  const save = useCallback(async () => {
    setIsSubmitting(true);

    try {
      const response = await settingsApi.updateProfileSettings(formValues);
      const nextValues = {
        fullName: response.settings.fullName,
        grade: response.settings.grade
      };

      setFormValues(nextValues);
      setBaseline(nextValues);
      updateUser(nextValues);
      showNotice("Profile settings saved successfully.", "success");
    } catch (error) {
      showNotice((error as Error).message, "danger");
    } finally {
      setIsSubmitting(false);
    }
  }, [formValues, showNotice, updateUser]);

  return {
    email,
    tenantLabel,
    formValues,
    isDirty,
    isLoading,
    isSubmitting,
    updateField,
    save
  };
}
