export function formatDate(value: string | undefined): string {
  if (!value) {
    return "Not available";
  }

  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export function formatLpa(value: number): string {
  return `${value} LPA`;
}

export function labelize(value: string): string {
  return String(value || "")
    .replace(/([A-Z])/g, " $1")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function getScoreTone(score: number): "success" | "warning" | "danger" {
  if (score >= 80) {
    return "success";
  }

  if (score >= 60) {
    return "warning";
  }

  return "danger";
}

export interface ProofReadinessState {
  label: string;
  tone: "success" | "warning" | "danger";
  message: string;
}

export function getProofReadinessState(score: number): ProofReadinessState {
  if (score < 48) {
    return {
      label: "Not Ready Yet",
      tone: "danger",
      message:
        "You are not ready for this career yet based on the current proof answers. Build the weaker behaviors first before treating this path as a confirmed fit."
    };
  }

  if (score < 65) {
    return {
      label: "Below Par Right Now",
      tone: "danger",
      message:
        "This result is still below par for this career right now. You are showing some positive signs, but more preparation is needed before this path looks ready."
    };
  }

  if (score < 82) {
    return {
      label: "Developing Readiness",
      tone: "warning",
      message:
        "You have meaningful potential for this career, but the evidence still shows a few readiness gaps that should be improved with practice."
    };
  }

  return {
    label: "Strong Readiness",
    tone: "success",
    message:
      "You are showing strong readiness signs for this career. Keep strengthening the behaviors behind the score so the result is backed by consistent action."
  };
}
