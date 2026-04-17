import { SecuritySettingsForm, useSecuritySettings } from "@/features/settings";
import { useUnsavedChangesPrompt } from "@/shared/hooks";

export default function SettingsSecurityPage(): JSX.Element {
  const { formValues, isDirty, isSubmitting, passwordsMatch, save, updateField } = useSecuritySettings();

  useUnsavedChangesPrompt(isDirty, "You have unsaved security changes. Leave this page anyway?");

  return (
    <SecuritySettingsForm
      isSubmitting={isSubmitting}
      onChange={updateField}
      onSubmit={save}
      passwordsMatch={passwordsMatch}
      values={formValues}
    />
  );
}
