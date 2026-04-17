import { ProfileSettingsForm, useProfileSettings } from "@/features/settings";
import { ContentPageSkeleton } from "@/shared/components/Skeletons";
import { useUnsavedChangesPrompt } from "@/shared/hooks";

export default function SettingsProfilePage(): JSX.Element {
  const { email, formValues, isDirty, isLoading, isSubmitting, save, tenantLabel, updateField } = useProfileSettings();

  useUnsavedChangesPrompt(isDirty, "You have unsaved profile settings. Leave this page anyway?");

  if (isLoading) {
    return <ContentPageSkeleton />;
  }

  return (
    <ProfileSettingsForm
      email={email}
      isSubmitting={isSubmitting}
      onChange={updateField}
      onSubmit={save}
      tenantLabel={tenantLabel}
      values={formValues}
    />
  );
}
