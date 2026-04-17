function average(values) {
  if (!values.length) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function labelize(value) {
  return String(value || "")
    .replace(/([A-Z])/g, " $1")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildInterestMap(profile) {
  return Object.fromEntries((profile?.interestSignals || []).map((signal) => [signal.tag, signal.score]));
}

function buildRecommendationReason(career, personalityScores, interestMap) {
  const interestHits = career.interestTags
    .map((tag) => ({ tag, score: interestMap[tag] || 35 }))
    .sort((left, right) => right.score - left.score)
    .slice(0, 2)
    .map((item) => labelize(item.tag));

  const traitHits = Object.entries(career.traitTargets)
    .map(([trait, target]) => ({
      trait,
      delta: Math.abs((personalityScores[trait] || 55) - target)
    }))
    .sort((left, right) => left.delta - right.delta)
    .slice(0, 2)
    .map((item) => labelize(item.trait));

  return [
    interestHits.length ? `Interest alignment is strongest around ${interestHits.join(" and ")}.` : null,
    traitHits.length ? `Personality fit currently looks strongest for ${traitHits.join(" and ")}.` : null,
    `This role stays relevant through ${career.category.toLowerCase()} demand and a crisis resilience score of ${career.crisisResilience.score}%.`
  ].filter(Boolean);
}

function rankCareers(profile, careers, limit = 12) {
  const personalityScores = profile?.personalityScores || {};
  const interestMap = buildInterestMap(profile);

  return careers
    .map((career) => {
      const interestScore = average(career.interestTags.map((tag) => interestMap[tag] || 35));
      const personalityScore = average(
        Object.entries(career.traitTargets).map(([trait, target]) => {
          const studentScore = personalityScores[trait] || 55;
          return Math.max(20, 100 - Math.abs(studentScore - target));
        })
      );
      const stabilityScore = average([
        career.crisisResilience.score,
        career.futureOutlook.demandScore,
        100 - career.futureOutlook.automationRisk
      ]);
      const fitScore = Math.round(interestScore * 0.4 + personalityScore * 0.45 + stabilityScore * 0.15);

      return {
        id: career.id,
        title: career.title,
        category: career.category,
        summary: career.summary,
        fitScore,
        reasons: buildRecommendationReason(career, personalityScores, interestMap),
        crisisResilience: career.crisisResilience.score,
        salaryProgressionLakhsINR: career.salaryProgressionLakhsINR
      };
    })
    .sort((left, right) => right.fitScore - left.fitScore)
    .slice(0, limit);
}

module.exports = {
  rankCareers
};
