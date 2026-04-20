"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { ProfileUpdatePayload, StudentProfile } from "@career-pilot/types";

import { submitStudentProfile, updateStudentProfile } from "@/lib/api";

function listToText(values: string[]): string {
  return values.join(", ");
}

function textToList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function Field({
  label,
  value,
  onChange,
  placeholder
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}): JSX.Element {
  return (
    <label className="field-label">
      <span>{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={3}
        className="field-control"
      />
    </label>
  );
}

export function ProfileForm({ initialProfile }: { initialProfile: StudentProfile | null }): JSX.Element {
  const router = useRouter();
  const [gradeLevel, setGradeLevel] = useState(initialProfile?.gradeLevel || "");
  const [ageBand, setAgeBand] = useState(initialProfile?.ageBand || "");
  const [favoriteSubjects, setFavoriteSubjects] = useState(listToText(initialProfile?.favoriteSubjects || []));
  const [favoriteActivities, setFavoriteActivities] = useState(listToText(initialProfile?.favoriteActivities || []));
  const [topicsCuriousAbout, setTopicsCuriousAbout] = useState(listToText(initialProfile?.topicsCuriousAbout || []));
  const [personalStrengths, setPersonalStrengths] = useState(listToText(initialProfile?.personalStrengths || []));
  const [avoidsOrDislikes, setAvoidsOrDislikes] = useState(listToText(initialProfile?.avoidsOrDislikes || []));
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const payload: ProfileUpdatePayload = {
    gradeLevel,
    ageBand,
    favoriteSubjects: textToList(favoriteSubjects),
    favoriteActivities: textToList(favoriteActivities),
    topicsCuriousAbout: textToList(topicsCuriousAbout),
    personalStrengths: textToList(personalStrengths),
    avoidsOrDislikes: textToList(avoidsOrDislikes)
  };

  return (
    <div className="form-stack">
      <div className="field-grid">
        <label className="field-label">
          <span>Grade level</span>
          <input
            value={gradeLevel}
            onChange={(event) => setGradeLevel(event.target.value)}
            className="field-control"
          />
        </label>
        <label className="field-label">
          <span>Age band</span>
          <input
            value={ageBand}
            onChange={(event) => setAgeBand(event.target.value)}
            className="field-control"
          />
        </label>
      </div>
      <Field label="Favorite subjects" value={favoriteSubjects} onChange={setFavoriteSubjects} />
      <Field label="Favorite activities" value={favoriteActivities} onChange={setFavoriteActivities} />
      <Field label="Topics curious about" value={topicsCuriousAbout} onChange={setTopicsCuriousAbout} />
      <Field label="Personal strengths" value={personalStrengths} onChange={setPersonalStrengths} />
      <Field label="Avoids or dislikes" value={avoidsOrDislikes} onChange={setAvoidsOrDislikes} />
      {initialProfile ? (
        <div className="status-chip">
          <strong>Status:</strong> {initialProfile.completionStatus} | <strong>Versions:</strong> {initialProfile.versionCount}
        </div>
      ) : null}
      {message ? <p className="status-text--success" style={{ margin: 0 }}>{message}</p> : null}
      {error ? <p className="status-text--error" style={{ margin: 0 }}>{error}</p> : null}
      <div className="button-row">
        <button
          type="button"
          disabled={isSaving}
          onClick={async () => {
            setIsSaving(true);
            setError(null);
            setMessage(null);

            try {
              await updateStudentProfile(payload);
              setMessage("Profile saved.");
              router.refresh();
            } catch (caughtError) {
              setError((caughtError as Error).message);
            } finally {
              setIsSaving(false);
            }
          }}
          className="button-primary"
        >
          {isSaving ? "Saving..." : "Save profile"}
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={async () => {
            setIsSubmitting(true);
            setError(null);
            setMessage(null);

            try {
              await updateStudentProfile(payload);
              await submitStudentProfile();
              setMessage("Profile submitted.");
              router.refresh();
            } catch (caughtError) {
              setError((caughtError as Error).message);
            } finally {
              setIsSubmitting(false);
            }
          }}
          className="button-secondary"
        >
          {isSubmitting ? "Submitting..." : "Submit profile"}
        </button>
      </div>
    </div>
  );
}
