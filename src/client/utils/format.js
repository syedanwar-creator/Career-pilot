export function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function formatDate(value) {
  if (!value) {
    return "Not available";
  }

  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export function formatLpa(value) {
  return `${value} LPA`;
}

export function labelize(value) {
  return String(value || "")
    .replace(/([A-Z])/g, " $1")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getScoreTone(score) {
  if (score >= 80) {
    return "tone-success";
  }

  if (score >= 60) {
    return "tone-warn";
  }

  return "tone-danger";
}

export function getProofReadinessState(score) {
  const normalizedScore = Number(score) || 0;

  if (normalizedScore < 48) {
    return {
      label: "Not Ready Yet",
      tone: "tone-danger",
      message:
        "You are not ready for this career yet based on the current proof answers. Focus on the weaker areas before treating this career as a confirmed fit."
    };
  }

  if (normalizedScore < 65) {
    return {
      label: "Below Par Right Now",
      tone: "tone-danger",
      message:
        "This result is still below par for this career right now. You are showing some signs of potential, but you need more preparation before this path looks ready."
    };
  }

  if (normalizedScore < 82) {
    return {
      label: "Developing Readiness",
      tone: "tone-warn",
      message:
        "You have some positive signs for this career, but you still need more preparation before this becomes a strong readiness result."
    };
  }

  return {
    label: "Strong Readiness",
    tone: "tone-success",
    message:
      "You are showing strong readiness signs for this career. Keep building real-world proof so this result is supported by action."
  };
}
