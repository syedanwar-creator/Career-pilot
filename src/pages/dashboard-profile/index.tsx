import { useState } from "react";

import { ProfileInsightCards, useProfileStudioPage } from "@/features/dashboard";
import { Button, Card, EmptyState, Field } from "@/shared/components";
import { ContentPageSkeleton } from "@/shared/components/Skeletons";
import { useUnsavedChangesPrompt } from "@/shared/hooks";
import { labelize } from "@/shared/utils";

export default function DashboardProfilePage(): JSX.Element {
  const { dashboard, formValues, generateQuestions, isDirty, isLoading, isSubmitting, questionSet, submitProfile, updateField } =
    useProfileStudioPage();
  const [answers, setAnswers] = useState<Record<string, number>>({});

  useUnsavedChangesPrompt(isDirty, "You have unsaved profile changes. Do you really want to leave this page?");

  if (isLoading) {
    return <ContentPageSkeleton />;
  }

  return (
    <div className="stack">
      <Card className="stack">
        <div className="card__header">
          <div>
            <p className="eyebrow">AI profile studio</p>
            <h1>Build the student character profile</h1>
          </div>
        </div>
        <div className="form-row">
          <Field htmlFor="profile-age-range" label="Age range">
            <input
              id="profile-age-range"
              className="input"
              value={formValues.ageRange}
              onChange={(event) => updateField("ageRange", event.target.value)}
            />
          </Field>
          <Field htmlFor="profile-grade" label="Grade / stage">
            <input
              id="profile-grade"
              className="input"
              value={formValues.grade}
              onChange={(event) => updateField("grade", event.target.value)}
            />
          </Field>
        </div>
        <Field htmlFor="favorite-subjects" label="Favorite subjects">
          <input
            id="favorite-subjects"
            className="input"
            value={formValues.favoriteSubjects}
            onChange={(event) => updateField("favoriteSubjects", event.target.value)}
          />
        </Field>
        <Field htmlFor="favorite-activities" label="Favorite activities">
          <textarea
            id="favorite-activities"
            className="textarea"
            rows={3}
            value={formValues.favoriteActivities}
            onChange={(event) => updateField("favoriteActivities", event.target.value)}
          />
        </Field>
        <Field htmlFor="topics-curious-about" label="Topics you are curious about">
          <textarea
            id="topics-curious-about"
            className="textarea"
            rows={3}
            value={formValues.topicsCuriousAbout}
            onChange={(event) => updateField("topicsCuriousAbout", event.target.value)}
          />
        </Field>
        <Field htmlFor="personal-strengths" label="Current strengths">
          <textarea
            id="personal-strengths"
            className="textarea"
            rows={3}
            value={formValues.personalStrengths}
            onChange={(event) => updateField("personalStrengths", event.target.value)}
          />
        </Field>
        <Field htmlFor="avoids-or-dislikes" label="Things you avoid or dislike">
          <textarea
            id="avoids-or-dislikes"
            className="textarea"
            rows={3}
            value={formValues.avoidsOrDislikes}
            onChange={(event) => updateField("avoidsOrDislikes", event.target.value)}
          />
        </Field>
        <div className="actions">
          <Button disabled={isSubmitting} variant="secondary" onClick={() => void generateQuestions()}>
            {isSubmitting ? "Working..." : "Generate AI question set"}
          </Button>
        </div>
      </Card>

      {questionSet ? (
        <Card className="stack">
          <div className="card__header">
            <div>
              <p className="eyebrow">{questionSet.source}</p>
              <h2>Random assessment questions</h2>
            </div>
          </div>
          {questionSet.questions.map((question, index) => (
            <fieldset key={question.id} className="question-block">
              <legend>
                <p className="eyebrow">{labelize(question.dimension)}</p>
                <h3>
                  Q{index + 1}. {question.question}
                </h3>
              </legend>
              <p>{question.whyItMatters}</p>
              <div className="option-list">
                {question.options.map((option, optionIndex) => (
                  <label key={option} className="option-card">
                    <input
                      type="radio"
                      name={question.id}
                      checked={answers[question.id] === optionIndex}
                      onChange={() =>
                        setAnswers((current) => ({
                          ...current,
                          [question.id]: optionIndex
                        }))
                      }
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <div className="actions">
            <Button
              disabled={isSubmitting}
              onClick={() => void submitProfile(answers)}
            >
              {isSubmitting ? "Submitting..." : "Submit profile"}
            </Button>
          </div>
        </Card>
      ) : (
        <EmptyState
          title="No question set yet"
          description="Generate the AI question set to begin the structured personality and character assessment."
        />
      )}

      {dashboard?.profile ? <ProfileInsightCards analysis={dashboard.profile.analysis} /> : null}
    </div>
  );
}
