const { generateStructuredJson, isGeminiConfigured } = require("./gemini");

const personalityDimensions = [
  "analytical",
  "creativity",
  "empathy",
  "resilience",
  "communication",
  "discipline",
  "leadership",
  "independence",
  "adaptability",
  "physicalStamina"
];

const PROFILE_QUESTION_COUNT = 8;
const PROOF_QUESTION_COUNT = 8;

const interestTags = [
  "technology",
  "healthcare",
  "business",
  "education",
  "public-service",
  "law-defense",
  "science",
  "creative",
  "hands-on",
  "hospitality",
  "environment",
  "fitness"
];

const profileQuestionBank = [
  {
    id: "analytical-clarity",
    dimension: "analytical",
    question: "When instructions are unclear, what do you usually do first?",
    whyItMatters: "This checks whether the student seeks structure before acting.",
    options: [
      "I get stuck unless someone explains every step.",
      "I try one thing quickly and hope it works.",
      "I break the task into parts and test what seems most likely.",
      "I clarify the goal, map the problem, and move in a structured way."
    ]
  },
  {
    id: "analytical-patterns",
    dimension: "analytical",
    question: "What feels most natural when you face a complex problem?",
    whyItMatters: "This reveals comfort with logic and patterns.",
    options: [
      "I avoid it if I can.",
      "I try random solutions until one works.",
      "I compare a few possibilities and choose one.",
      "I look for patterns, causes, and evidence before deciding."
    ]
  },
  {
    id: "creativity-idea",
    dimension: "creativity",
    question: "If a school event needs a fresh idea, what do you tend to do?",
    whyItMatters: "This shows originality and comfort with ideation.",
    options: [
      "I wait for others to decide the creative direction.",
      "I copy something familiar because it feels safer.",
      "I suggest one or two new ideas if I feel confident.",
      "I enjoy creating multiple original possibilities and shaping them."
    ]
  },
  {
    id: "creativity-constraints",
    dimension: "creativity",
    question: "How do you usually respond when you must do something creative with limited resources?",
    whyItMatters: "This checks creativity under constraints.",
    options: [
      "I lose interest when resources are limited.",
      "I do the minimum and move on.",
      "I adapt with a practical idea.",
      "I enjoy finding clever alternatives and improving the result."
    ]
  },
  {
    id: "empathy-support",
    dimension: "empathy",
    question: "When a friend is struggling, what do you naturally do?",
    whyItMatters: "This measures emotional awareness and support.",
    options: [
      "I avoid getting involved.",
      "I listen for a moment but move on quickly.",
      "I try to understand and help if I can.",
      "I actively listen, notice feelings, and stay present until they feel supported."
    ]
  },
  {
    id: "empathy-conflict",
    dimension: "empathy",
    question: "During a disagreement, what matters most to you?",
    whyItMatters: "This shows whether the student can respect other viewpoints.",
    options: [
      "Winning the argument as fast as possible.",
      "Ending the discussion even if the other person feels unheard.",
      "Finding a fair solution if possible.",
      "Understanding both sides and helping the situation settle constructively."
    ]
  },
  {
    id: "resilience-failure",
    dimension: "resilience",
    question: "What happens when your first attempt fails?",
    whyItMatters: "This checks recovery after setbacks.",
    options: [
      "I usually give up quickly.",
      "I feel upset and need a long time before trying again.",
      "I recover after some thought and try another approach.",
      "I learn from the setback, adjust fast, and continue."
    ]
  },
  {
    id: "resilience-pressure",
    dimension: "resilience",
    question: "How do you react when pressure builds close to a deadline?",
    whyItMatters: "This measures emotional steadiness under stress.",
    options: [
      "I freeze or avoid the work.",
      "I panic and lose quality.",
      "I feel stress but can still finish the work.",
      "I stay composed, prioritize, and keep moving."
    ]
  },
  {
    id: "communication-speaking",
    dimension: "communication",
    question: "If you need to explain an idea to others, how do you usually do it?",
    whyItMatters: "This reveals clarity and confidence in communication.",
    options: [
      "I avoid explaining because I am uncomfortable.",
      "I speak, but people often leave confused.",
      "I can explain clearly when I prepare.",
      "I usually simplify ideas well and adjust for the audience."
    ]
  },
  {
    id: "communication-feedback",
    dimension: "communication",
    question: "What do you usually do when someone gives you feedback?",
    whyItMatters: "This checks listening and response quality.",
    options: [
      "I take it personally and shut down.",
      "I listen, but I rarely change anything.",
      "I consider it if it seems useful.",
      "I listen carefully, ask clarifying questions, and improve."
    ]
  },
  {
    id: "discipline-routine",
    dimension: "discipline",
    question: "How do you handle long-term work that has to be done consistently?",
    whyItMatters: "This measures discipline and follow-through.",
    options: [
      "I only do it when someone pushes me.",
      "I start well but often stop.",
      "I can stay consistent if the goal matters to me.",
      "I build routines and keep going even when motivation drops."
    ]
  },
  {
    id: "discipline-detail",
    dimension: "discipline",
    question: "How careful are you with small but important details?",
    whyItMatters: "This checks execution reliability.",
    options: [
      "I miss details often and do not revisit them.",
      "I notice some details, but I rush a lot.",
      "I usually review my work once before finishing.",
      "I check carefully and take responsibility for getting it right."
    ]
  },
  {
    id: "leadership-initiative",
    dimension: "leadership",
    question: "In group work, when do you usually step forward?",
    whyItMatters: "This measures initiative and coordination tendency.",
    options: [
      "I prefer that someone else always leads.",
      "I lead only when no one else wants to.",
      "I can guide the group if needed.",
      "I naturally organize people, clarify direction, and keep momentum."
    ]
  },
  {
    id: "leadership-responsibility",
    dimension: "leadership",
    question: "How do you react when a team result depends partly on you?",
    whyItMatters: "This checks ownership under shared responsibility.",
    options: [
      "I avoid responsibility because I do not want the pressure.",
      "I do only my own part and hope the rest works out.",
      "I take responsibility for my part and support others if needed.",
      "I actively coordinate, communicate, and protect the final outcome."
    ]
  },
  {
    id: "independence-work",
    dimension: "independence",
    question: "How comfortable are you working alone for a long stretch?",
    whyItMatters: "This shows independence and self-direction.",
    options: [
      "I really struggle without constant support nearby.",
      "I can work alone for a short time only.",
      "I can stay on track alone if I know the goal.",
      "I work well independently and keep myself moving."
    ]
  },
  {
    id: "independence-decisions",
    dimension: "independence",
    question: "When a decision is yours to make, what usually happens?",
    whyItMatters: "This measures comfort with personal ownership.",
    options: [
      "I delay until someone else decides.",
      "I decide quickly without much thought.",
      "I decide after thinking through the main options.",
      "I take ownership, assess the tradeoffs, and decide with confidence."
    ]
  },
  {
    id: "adaptability-change",
    dimension: "adaptability",
    question: "What happens when plans suddenly change?",
    whyItMatters: "This shows flexibility in uncertain environments.",
    options: [
      "I become frustrated and stop performing well.",
      "I need a lot of time to recover.",
      "I adjust after a short pause.",
      "I adapt quickly and find a workable new path."
    ]
  },
  {
    id: "adaptability-learning",
    dimension: "adaptability",
    question: "How do you respond when you must learn something new very fast?",
    whyItMatters: "This checks learning agility.",
    options: [
      "I avoid it if possible.",
      "I try, but I get overwhelmed easily.",
      "I can learn it with help and some time.",
      "I enjoy learning fast and turning uncertainty into action."
    ]
  },
  {
    id: "physical-endurance",
    dimension: "physicalStamina",
    question: "How do you feel about work that may require long hours on your feet or active movement?",
    whyItMatters: "This measures comfort with physically demanding roles.",
    options: [
      "I strongly prefer to avoid it.",
      "I can handle it rarely, but not often.",
      "I can manage it if the work matters.",
      "I am comfortable with active, physically demanding routines."
    ]
  },
  {
    id: "physical-pressure",
    dimension: "physicalStamina",
    question: "If a role requires stamina plus mental focus at the same time, how do you react?",
    whyItMatters: "This checks combined physical and mental endurance.",
    options: [
      "That kind of pressure drains me very quickly.",
      "I can do it briefly, but not consistently.",
      "I can handle it with preparation.",
      "I am mentally ready for demanding routines if the mission matters."
    ]
  }
];

const proofQuestionTemplates = {
  discipline: [
    "If this career expects daily discipline even when no one is watching, how ready are you for that reality?",
    "When a routine becomes boring but still important, how likely are you to keep doing it well?",
    "If progress in this career is slow for months, how strong is your commitment to stay consistent?"
  ],
  ambiguity: [
    "If this career gives you unclear problems instead of clear instructions, how would you respond?",
    "How comfortable are you making progress before every answer is fully known?",
    "When a career requires calm thinking in uncertainty, what is your natural response?"
  ],
  "continuous-learning": [
    "If this career forces you to keep learning every year, how ready are you for that?",
    "How willing are you to relearn your methods when the field changes?",
    "If your current knowledge becomes outdated, how likely are you to rebuild your skill set?"
  ],
  "problem-solving": [
    "How much energy do you get from solving hard problems that may take time?",
    "If the first solution fails, how determined are you to keep working toward a better one?",
    "When people bring you complex issues, how ready are you to think carefully instead of escaping pressure?"
  ],
  independence: [
    "If this career requires long stretches of self-driven work, how ready are you for that?",
    "How comfortable are you taking ownership without constant reassurance from parents or teachers?",
    "If success depends on your personal follow-through, how much can others rely on you?"
  ],
  "emotional-resilience": [
    "If this career exposes you to pain, setbacks, or difficult human situations, how steady can you remain?",
    "How well can you recover after emotionally heavy days?",
    "If a role regularly tests your emotional strength, how prepared are you to stay functional and kind?"
  ],
  ethics: [
    "If this career asks you to do the right thing when it is inconvenient, how would you behave?",
    "How willing are you to follow ethical standards even under pressure from others?",
    "When power or authority is involved, how important is personal integrity to you?"
  ],
  precision: [
    "If one small mistake in this career can cause serious problems, how ready are you to work carefully?",
    "How naturally do you slow down and review details when accuracy matters?",
    "If this role demands precision again and again, how well can you stay sharp?"
  ],
  service: [
    "How willing are you to put other people’s needs ahead of comfort in this career?",
    "If this role is more about service than status, how motivated are you to keep showing up?",
    "How ready are you to help people even when they are tired, upset, or demanding?"
  ],
  ownership: [
    "If the outcome of this career depends on your decisions, how ready are you to own the result?",
    "How willing are you to accept responsibility instead of blaming circumstances?",
    "If others look to you for direction, how steady are you under that weight?"
  ],
  pressure: [
    "If this career puts you under regular pressure, how strong is your ability to stay composed?",
    "How well can you think clearly when expectations rise suddenly?",
    "If people depend on your result during stressful moments, how prepared are you for that?"
  ],
  communication: [
    "If success in this career depends on how clearly you speak and listen, how ready are you for that?",
    "How well can you explain a difficult idea to someone who is confused or upset?",
    "When a role needs calm communication under pressure, how naturally does that come to you?"
  ],
  "family-separation": [
    "If this career requires staying away from parents or family for long periods, how ready are you mentally?",
    "How strong are you when commitment means missing comfort, home, or familiar support?",
    "If service asks for distance from family, how likely are you to stay focused on duty?"
  ],
  risk: [
    "If this career includes real personal risk, how honestly prepared are you for that reality?",
    "How do you respond when courage is needed but fear is still present?",
    "If danger cannot be ignored in this role, how mentally stable are you under that idea?"
  ],
  leadership: [
    "If others depend on you for direction in this career, how ready are you to lead responsibly?",
    "How well can you make decisions for a group when nobody feels fully certain?",
    "If this role places people under your guidance, how seriously do you take that trust?"
  ],
  "feedback-tolerance": [
    "If this career exposes your work to strong feedback, how well can you grow without shutting down?",
    "How prepared are you to keep improving after criticism?",
    "When your output is judged publicly or professionally, how steady are you?"
  ],
  composure: [
    "If this career demands calm behavior in front of others, how strong is your composure?",
    "How well can you stay polite and effective when a situation becomes chaotic?",
    "If a role expects emotional control as part of professionalism, how ready are you?"
  ],
  "irregular-hours": [
    "If this career regularly disrupts weekends, holidays, or sleep routines, how ready are you for that tradeoff?",
    "How well can you stay professional when schedules are not comfortable?",
    "If success requires unusual hours, how honestly prepared are you?"
  ],
  adaptability: [
    "If this career changes fast, how ready are you to keep adjusting instead of resisting?",
    "How strong are you when a job suddenly demands new habits or environments?",
    "If your role changes under pressure, how quickly can you settle into a new rhythm?"
  ],
  "physical-endurance": [
    "If this career expects physical stamina every week, how ready are you to handle that?",
    "How honestly prepared are you for work that can feel physically draining?",
    "If the role needs both movement and discipline, how much can you sustain it?"
  ],
  "constraint-handling": [
    "If this career gives you limited time, money, or resources, how strong is your decision-making?",
    "How well can you perform when the ideal option is not available?",
    "If the role demands practical tradeoffs, how ready are you to choose wisely?"
  ],
  patience: [
    "If this career rewards patience more than fast praise, how ready are you for that journey?",
    "How well can you stay committed when results come slowly?",
    "If the work requires repeating fundamentals again and again, how likely are you to stay steady?"
  ],
  motivation: [
    "If nobody praises you for a while in this career, what happens to your effort?",
    "How well can you keep yourself moving without external pressure?",
    "If success depends on inner drive, how strong is yours really?"
  ]
};

const genericReadinessOptions = [
  "I am not mentally ready for that right now.",
  "I could try, but I would struggle without heavy support.",
  "I believe I can handle it with preparation and discipline.",
  "I am ready to accept that reality and grow through it."
];

function shuffle(values) {
  const copy = [...values];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

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

function extractInterestSignals(basicInfo) {
  const combined = [
    basicInfo.favoriteSubjects,
    basicInfo.favoriteActivities,
    basicInfo.topicsCuriousAbout,
    basicInfo.personalStrengths,
    basicInfo.avoidsOrDislikes
  ]
    .join(" ")
    .toLowerCase();

  const keywords = {
    technology: ["computer", "coding", "tech", "robot", "app", "software", "data"],
    healthcare: ["doctor", "health", "biology", "care", "medicine", "human body"],
    business: ["business", "money", "finance", "selling", "startup", "market"],
    education: ["teaching", "mentor", "children", "learning", "guide"],
    "public-service": ["society", "community", "government", "service", "civil"],
    "law-defense": ["law", "justice", "army", "police", "nation", "defense"],
    science: ["science", "experiment", "research", "physics", "chemistry", "lab"],
    creative: ["design", "art", "draw", "music", "story", "creative", "fashion"],
    "hands-on": ["build", "machine", "repair", "tool", "electrical", "carpenter"],
    hospitality: ["travel", "hotel", "chef", "guest", "event", "tourism"],
    environment: ["nature", "climate", "farm", "water", "forest", "environment"],
    fitness: ["fitness", "sports", "gym", "training", "wellness", "yoga"]
  };

  const signals = interestTags.map((tag) => {
    const score = keywords[tag].reduce((total, keyword) => {
      return total + (combined.includes(keyword) ? 18 : 0);
    }, 30);

    return {
      tag,
      score: Math.min(score, 96),
      reason: score > 30 ? `Keywords in the profile point toward ${tag}.` : `No strong direct evidence yet for ${tag}.`
    };
  });

  return signals.sort((left, right) => right.score - left.score);
}

function buildFallbackProfileQuestionSet() {
  return {
    source: "fallback",
    questions: shuffle(profileQuestionBank)
      .slice(0, PROFILE_QUESTION_COUNT)
      .map((question, index) => ({
        ...question,
        id: `${question.dimension}-${index + 1}`
      }))
  };
}

async function generateProfileQuestionSet(context) {
  if (!isGeminiConfigured()) {
    return buildFallbackProfileQuestionSet();
  }

  const schema = {
    type: "object",
    properties: {
      source: { type: "string" },
      questions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            question: { type: "string" },
            dimension: {
              type: "string",
              enum: personalityDimensions
            },
            whyItMatters: { type: "string" },
            options: {
              type: "array",
              minItems: 4,
              maxItems: 4,
              items: { type: "string" }
            }
          },
          required: ["id", "question", "dimension", "whyItMatters", "options"]
        }
      }
    },
    required: ["source", "questions"]
  };

  const prompt = [
    `Generate ${PROFILE_QUESTION_COUNT} fresh personality and character questions for a student career-profiling interview.`,
    "The questions must feel varied and not repetitive.",
    "Every question must have exactly 4 answer options ordered from least aligned to most aligned for the target dimension.",
    `Student context: ${JSON.stringify(context)}`
  ].join("\n");

  try {
    const response = await generateStructuredJson({
      systemInstruction:
        "You design career assessment questions for students. Focus on personality, character, discipline, resilience, leadership, empathy, independence, adaptability, and stamina. Return only the requested JSON structure.",
      prompt,
      schema
    });

    return {
      source: response.source || "gemini",
      questions: (response.questions || []).slice(0, PROFILE_QUESTION_COUNT)
    };
  } catch (error) {
    return buildFallbackProfileQuestionSet();
  }
}

function buildFallbackProfileAnalysis({ basicInfo, answers, questionSet }) {
  const scoreBuckets = personalityDimensions.reduce((bucket, dimension) => {
    bucket[dimension] = [];
    return bucket;
  }, {});

  const scoreScale = [25, 50, 75, 95];

  questionSet.questions.forEach((question) => {
    const answer = answers.find((item) => item.questionId === question.id);
    const optionIndex = typeof answer?.optionIndex === "number" ? answer.optionIndex : 1;
    const boundedIndex = Math.max(0, Math.min(optionIndex, 3));
    scoreBuckets[question.dimension].push(scoreScale[boundedIndex]);
  });

  const personalityScores = personalityDimensions.reduce((scores, dimension) => {
    const values = scoreBuckets[dimension];
    scores[dimension] = Math.round(values.length ? average(values) : 55);
    return scores;
  }, {});

  const sortedTraits = Object.entries(personalityScores).sort((left, right) => right[1] - left[1]);
  const dominantTraits = sortedTraits.slice(0, 4).map(([trait]) => labelize(trait));
  const cautionAreas = sortedTraits.slice(-3).map(([trait]) => labelize(trait));
  const interestSignals = extractInterestSignals(basicInfo).slice(0, 6);

  const workPreferences = [];

  if (personalityScores.independence >= 70) {
    workPreferences.push("Can handle self-driven work without constant supervision.");
  } else {
    workPreferences.push("May perform better with guidance, team rhythm, and visible support.");
  }

  if (personalityScores.communication >= 70) {
    workPreferences.push("Likely to do well in roles that require explanation, teamwork, or client interaction.");
  }

  if (personalityScores.physicalStamina >= 70) {
    workPreferences.push("Open to physically active or field-heavy roles.");
  }

  if (personalityScores.analytical >= 72) {
    workPreferences.push("Shows good potential for structured decision-making and evidence-based tasks.");
  }

  const summary = `${basicInfo.studentName || "This student"} shows stronger signs of ${dominantTraits
    .slice(0, 2)
    .join(" and ")}. The current profile suggests promise, but also a need to keep developing ${cautionAreas
    .slice(0, 2)
    .join(" and ")}.`;

  return {
    source: "fallback",
    summary,
    characterReadout:
      "This is a readiness-oriented interpretation based on how the student answered scenario-style questions and described their current interests.",
    dominantTraits,
    cautionAreas,
    workPreferences,
    personalityScores,
    interestSignals
  };
}

async function analyzeProfile({ basicInfo, answers, questionSet }) {
  const fallback = buildFallbackProfileAnalysis({ basicInfo, answers, questionSet });

  if (!isGeminiConfigured()) {
    return fallback;
  }

  const schema = {
    type: "object",
    properties: {
      source: { type: "string" },
      summary: { type: "string" },
      characterReadout: { type: "string" },
      dominantTraits: {
        type: "array",
        items: { type: "string" }
      },
      cautionAreas: {
        type: "array",
        items: { type: "string" }
      },
      workPreferences: {
        type: "array",
        items: { type: "string" }
      },
      interestSignals: {
        type: "array",
        items: {
          type: "object",
          properties: {
            tag: { type: "string", enum: interestTags },
            score: { type: "number" },
            reason: { type: "string" }
          },
          required: ["tag", "score", "reason"]
        }
      }
    },
    required: [
      "source",
      "summary",
      "characterReadout",
      "dominantTraits",
      "cautionAreas",
      "workPreferences",
      "interestSignals"
    ]
  };

  const prompt = [
    "Use the deterministic personality scores and the student basics below to produce a sharper career-readiness summary.",
    "Do not change the numbers. Use them as evidence and enrich the narrative.",
    `Student basics: ${JSON.stringify(basicInfo)}`,
    `Deterministic personality scores: ${JSON.stringify(fallback.personalityScores)}`,
    `Question answers: ${JSON.stringify(answers)}`
  ].join("\n");

  try {
    const response = await generateStructuredJson({
      systemInstruction:
        "You are a school-safe career guidance analyst. Infer interests carefully, avoid medical claims, and provide concrete trait-based guidance in clean JSON.",
      prompt,
      schema,
      temperature: 0.7
    });

    return {
      ...fallback,
      ...response,
      source: response.source || "gemini"
    };
  } catch (error) {
    return fallback;
  }
}

function buildFallbackProofQuestionSet(career) {
  const templates = [];
  const usedTags = career.demandTags.length ? career.demandTags : ["discipline", "motivation", "pressure", "adaptability", "communication"];

  usedTags.forEach((tag) => {
    const tagTemplates = proofQuestionTemplates[tag] || proofQuestionTemplates.motivation;
    tagTemplates.forEach((question) => {
      templates.push({
        dimension: tag,
        question,
        whyItMatters: `${labelize(tag)} is important in ${career.title}.`,
        options: genericReadinessOptions
      });
    });
  });

  const questions = shuffle(templates)
    .slice(0, PROOF_QUESTION_COUNT)
    .map((item, index) => ({
      id: `proof-${career.id}-${index + 1}`,
      ...item
    }));

  while (questions.length < PROOF_QUESTION_COUNT) {
    questions.push({
      id: `proof-${career.id}-${questions.length + 1}`,
      dimension: "motivation",
      question: proofQuestionTemplates.motivation[questions.length % proofQuestionTemplates.motivation.length],
      whyItMatters: `Inner drive matters in ${career.title}.`,
      options: genericReadinessOptions
    });
  }

  return {
    source: "fallback",
    introduction: `This ${PROOF_QUESTION_COUNT}-question proof session checks whether the student is mentally and behaviorally ready for the real demands of ${career.title}.`,
    questions
  };
}

async function generateProofQuestionSet({ career, profile }) {
  if (!isGeminiConfigured()) {
    return buildFallbackProofQuestionSet(career);
  }

  const schema = {
    type: "object",
    properties: {
      source: { type: "string" },
      introduction: { type: "string" },
      questions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            question: { type: "string" },
            dimension: { type: "string" },
            whyItMatters: { type: "string" },
            options: {
              type: "array",
              minItems: 4,
              maxItems: 4,
              items: { type: "string" }
            }
          },
          required: ["id", "question", "dimension", "whyItMatters", "options"]
        }
      }
    },
    required: ["source", "introduction", "questions"]
  };

  const prompt = [
    `Generate ${PROOF_QUESTION_COUNT} mental-readiness proof questions for a student considering a specific career.`,
    "Focus on real-world demands, not technical skills.",
    "Examples include family separation, discipline, emotional stability, ethics, pressure, service mindset, irregular hours, or physical stamina when relevant.",
    "Each question must have exactly 4 options ordered from least ready to most ready.",
    `Career: ${JSON.stringify({ title: career.title, category: career.category, demandTags: career.demandTags, summary: career.summary })}`,
    `Student profile: ${JSON.stringify({ summary: profile.summary, dominantTraits: profile.dominantTraits, cautionAreas: profile.cautionAreas })}`
  ].join("\n");

  try {
    const response = await generateStructuredJson({
      systemInstruction:
        "You generate safe, realistic career-readiness interview questions for students. Avoid medical diagnosis. Return only JSON.",
      prompt,
      schema
    });

    return {
      source: response.source || "gemini",
      introduction: response.introduction,
      questions: (response.questions || []).slice(0, PROOF_QUESTION_COUNT)
    };
  } catch (error) {
    return buildFallbackProofQuestionSet(career);
  }
}

function buildFallbackProofEvaluation({ career, answers, questionSet }) {
  const scoreScale = [15, 45, 75, 100];
  const dimensionScores = {};

  questionSet.questions.forEach((question) => {
    const answer = answers.find((item) => item.questionId === question.id);
    const optionIndex = typeof answer?.optionIndex === "number" ? answer.optionIndex : 1;
    const boundedIndex = Math.max(0, Math.min(optionIndex, 3));

    if (!dimensionScores[question.dimension]) {
      dimensionScores[question.dimension] = [];
    }

    dimensionScores[question.dimension].push(scoreScale[boundedIndex]);
  });

  const normalizedDimensionScores = Object.entries(dimensionScores).reduce((scores, [dimension, values]) => {
    scores[dimension] = Math.round(average(values));
    return scores;
  }, {});

  const overallScore = Math.round(average(Object.values(normalizedDimensionScores)));
  const points = overallScore * 10;
  const readinessBand =
    overallScore >= 82 ? "Strong readiness" : overallScore >= 65 ? "Promising readiness" : overallScore >= 48 ? "Developing readiness" : "Low readiness";
  const sorted = Object.entries(normalizedDimensionScores).sort((left, right) => right[1] - left[1]);
  const strengths = sorted.slice(0, 3).map(([dimension]) => labelize(dimension));
  const risks = sorted.slice(-3).map(([dimension]) => labelize(dimension));

  return {
    source: "fallback",
    overallScore,
    points,
    readinessBand,
    dimensionScores: normalizedDimensionScores,
    strengths,
    risks,
    narrative: `The student shows ${readinessBand.toLowerCase()} for ${career.title}. Stronger evidence appears in ${strengths
      .slice(0, 2)
      .join(" and ")}, while ${risks[0]} needs more deliberate support.`,
    parentSummary: `${career.title} readiness is currently ${overallScore}%. This score suggests ${readinessBand.toLowerCase()}. Parents should focus on helping the student strengthen ${risks[0]} without discouraging progress in ${strengths[0]}.`,
    schoolSummary: `The student earned ${points} proof points for ${career.title}. School mentors can support improvement in ${risks
      .slice(0, 2)
      .join(" and ")} through guided experiences and reflective coaching.`,
    nextSteps: [
      `Give the student a small real-world challenge that develops ${risks[0]}.`,
      `Continue exposure projects that use ${strengths[0]}.`,
      "Review the proof score again after one month of focused practice."
    ]
  };
}

async function evaluateProofSession({ career, profile, answers, questionSet }) {
  const fallback = buildFallbackProofEvaluation({ career, answers, questionSet });

  if (!isGeminiConfigured()) {
    return fallback;
  }

  const schema = {
    type: "object",
    properties: {
      source: { type: "string" },
      narrative: { type: "string" },
      parentSummary: { type: "string" },
      schoolSummary: { type: "string" },
      strengths: {
        type: "array",
        items: { type: "string" }
      },
      risks: {
        type: "array",
        items: { type: "string" }
      },
      nextSteps: {
        type: "array",
        items: { type: "string" }
      }
    },
    required: ["source", "narrative", "parentSummary", "schoolSummary", "strengths", "risks", "nextSteps"]
  };

  const prompt = [
    "Create a student-safe evaluation narrative for a career proof session.",
    "Do not change the numeric scores. Use them as evidence.",
    `Career: ${JSON.stringify({ title: career.title, category: career.category, demandTags: career.demandTags })}`,
    `Profile summary: ${JSON.stringify({ summary: profile.summary, dominantTraits: profile.dominantTraits, cautionAreas: profile.cautionAreas })}`,
    `Deterministic score report: ${JSON.stringify(fallback)}`,
    `Answer set: ${JSON.stringify(answers)}`
  ].join("\n");

  try {
    const response = await generateStructuredJson({
      systemInstruction:
        "You create balanced guidance for students, parents, and schools. Avoid fear language. Stay practical, honest, and encouraging. Return only JSON.",
      prompt,
      schema,
      temperature: 0.6
    });

    return {
      ...fallback,
      ...response,
      source: response.source || "gemini"
    };
  } catch (error) {
    return fallback;
  }
}

module.exports = {
  analyzeProfile,
  buildFallbackProfileQuestionSet,
  evaluateProofSession,
  generateProfileQuestionSet,
  generateProofQuestionSet,
  personalityDimensions
};
