function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

const categoryProfiles = {
  Technology: {
    interestTags: ["technology", "logic", "problem-solving", "innovation"],
    traitTargets: {
      analytical: 88,
      creativity: 62,
      empathy: 42,
      resilience: 74,
      communication: 58,
      discipline: 82,
      leadership: 52,
      independence: 78,
      adaptability: 84,
      physicalStamina: 34
    },
    defaultDemandTags: ["discipline", "ambiguity", "continuous-learning", "problem-solving", "independence"],
    trainingRoute: "a strong foundation in mathematics, technology, and hands-on project work",
    practiceRoute: "internships, portfolio projects, labs, competitions, and team-based delivery",
    baseSalary: [6, 10, 18, 30, 45],
    resilienceBase: 76,
    futureDemand: 90,
    automationRisk: 34,
    workSettings: "product teams, tech operations, engineering services, and digital platforms",
    positives: [
      "high global demand and strong mobility across industries",
      "clear growth from junior execution to expert problem ownership",
      "many roles can be learned through projects, internships, and certifications",
      "often offers strong remote and international collaboration opportunities"
    ],
    challenges: [
      "skills can become outdated if learning stops",
      "deadlines, bugs, and ambiguity can create mental pressure",
      "many roles require sustained focus on detail for long periods",
      "team delivery depends on communication as much as technical skill"
    ],
    negatives: [
      "burnout risk is real in unhealthy delivery cultures",
      "screen-heavy work may not suit students who need physical movement",
      "competition is high in entry-level hiring without a strong portfolio",
      "some specializations change faster than school curricula"
    ],
    crisisSupport:
      "remains valuable because communication systems, digital infrastructure, and cyber defense stay critical during disruption."
  },
  Healthcare: {
    interestTags: ["healthcare", "service", "biology", "caregiving"],
    traitTargets: {
      analytical: 74,
      creativity: 48,
      empathy: 88,
      resilience: 86,
      communication: 76,
      discipline: 86,
      leadership: 60,
      independence: 52,
      adaptability: 78,
      physicalStamina: 72
    },
    defaultDemandTags: ["discipline", "emotional-resilience", "ethics", "precision", "service"],
    trainingRoute: "formal academic preparation, clinical exposure, licensing, and supervised practice",
    practiceRoute: "hospital rotations, lab practice, apprenticeships, supervised care, and internships",
    baseSalary: [4, 8, 14, 24, 40],
    resilienceBase: 92,
    futureDemand: 93,
    automationRisk: 18,
    workSettings: "hospitals, clinics, labs, rehabilitation centers, and public health systems",
    positives: [
      "deep social value and visible impact on people’s lives",
      "strong long-term demand because health needs do not disappear",
      "many sub-specialties let students find the right mix of science and service",
      "credibility increases with experience and trust"
    ],
    challenges: [
      "high emotional load, especially in suffering, trauma, or loss",
      "training can be long, expensive, and highly competitive",
      "shift work and emergencies can affect personal routine",
      "mistakes can have serious consequences"
    ],
    negatives: [
      "requires long-term commitment before major payoff in many tracks",
      "can be physically demanding and mentally exhausting",
      "regulatory pressure and documentation can be heavy",
      "not ideal for students who strongly dislike human-facing responsibility"
    ],
    crisisSupport:
      "becomes even more essential during public emergencies, conflict, disease outbreaks, and infrastructure breakdown."
  },
  "Business & Finance": {
    interestTags: ["business", "finance", "strategy", "operations"],
    traitTargets: {
      analytical: 78,
      creativity: 56,
      empathy: 56,
      resilience: 70,
      communication: 78,
      discipline: 80,
      leadership: 72,
      independence: 58,
      adaptability: 74,
      physicalStamina: 38
    },
    defaultDemandTags: ["ownership", "communication", "decision-making", "discipline", "pressure"],
    trainingRoute: "commerce or domain study, financial literacy, operational understanding, and real business exposure",
    practiceRoute: "internships, case competitions, simulations, shadowing, and client-facing work",
    baseSalary: [5, 9, 16, 28, 42],
    resilienceBase: 68,
    futureDemand: 82,
    automationRisk: 42,
    workSettings: "companies, startups, banks, advisory firms, operations centers, and growth teams",
    positives: [
      "broad transferability across industries and company sizes",
      "good path for students who enjoy ownership and measurable outcomes",
      "many tracks reward communication, planning, and commercial thinking",
      "leadership pathways can open early for strong performers"
    ],
    challenges: [
      "targets, deadlines, and stakeholder pressure can be intense",
      "many decisions happen with incomplete information",
      "career speed often depends on initiative, not only academics",
      "reputation matters a lot in trust-based roles"
    ],
    negatives: [
      "some roles can feel highly performance-driven and exhausting",
      "economic slowdowns can hit parts of the sector hard",
      "entry-level competition is high in premium firms",
      "requires continuous business awareness, not static knowledge"
    ],
    crisisSupport:
      "remains valuable where finance, supply continuity, logistics, and resource planning must still function under stress."
  },
  "Education & Human Services": {
    interestTags: ["education", "mentoring", "service", "human-development"],
    traitTargets: {
      analytical: 62,
      creativity: 64,
      empathy: 90,
      resilience: 76,
      communication: 88,
      discipline: 72,
      leadership: 66,
      independence: 48,
      adaptability: 76,
      physicalStamina: 44
    },
    defaultDemandTags: ["empathy", "communication", "patience", "consistency", "service"],
    trainingRoute: "formal study, classroom or field exposure, observation, and guided practice",
    practiceRoute: "teaching practice, counseling labs, mentorship, volunteering, and supervised community work",
    baseSalary: [3.5, 6, 10, 18, 30],
    resilienceBase: 82,
    futureDemand: 84,
    automationRisk: 24,
    workSettings: "schools, universities, learning platforms, NGOs, counseling centers, and community institutions",
    positives: [
      "meaningful long-term impact on people’s growth and confidence",
      "strong fit for students who find purpose in guidance and support",
      "many roles reward trust-building more than aggressive competition",
      "clear room for specialization in teaching, counseling, policy, or learning design"
    ],
    challenges: [
      "progress can be slow and emotionally demanding",
      "requires patience with different learning or life situations",
      "institutional systems can sometimes limit innovation",
      "communication quality matters every single day"
    ],
    negatives: [
      "compensation growth may be slower than some corporate roles",
      "emotional fatigue can build over time",
      "results are not always immediate or visible",
      "students who dislike repeated human interaction may struggle"
    ],
    crisisSupport:
      "stays valuable because people still need learning, guidance, structure, and emotional support during uncertainty."
  },
  "Public Service & Law": {
    interestTags: ["public-service", "law-defense", "leadership", "justice"],
    traitTargets: {
      analytical: 74,
      creativity: 44,
      empathy: 62,
      resilience: 88,
      communication: 78,
      discipline: 90,
      leadership: 84,
      independence: 64,
      adaptability: 82,
      physicalStamina: 78
    },
    defaultDemandTags: ["ethics", "discipline", "leadership", "family-separation", "risk"],
    trainingRoute: "competitive preparation, policy/legal study, institutional training, and field readiness",
    practiceRoute: "moot courts, exams, drills, internships, cadet programs, and supervised public-facing work",
    baseSalary: [4, 7, 12, 20, 34],
    resilienceBase: 94,
    futureDemand: 88,
    automationRisk: 14,
    workSettings: "courts, ministries, embassies, field units, emergency services, and security institutions",
    positives: [
      "high social trust and mission-driven work",
      "strong fit for students who value duty, order, and public impact",
      "many roles stay relevant even in unstable environments",
      "clear identity, authority, and long-term contribution"
    ],
    challenges: [
      "selection can be highly competitive and physically or mentally demanding",
      "some roles involve risk, relocation, or family separation",
      "public scrutiny and ethical pressure can be significant",
      "decisions often affect many people at once"
    ],
    negatives: [
      "not suitable for students who strongly avoid structure or accountability",
      "bureaucratic processes can feel slow",
      "certain roles carry emotional or physical danger",
      "routine discipline is non-negotiable"
    ],
    crisisSupport:
      "becomes central in conflict, governance breakdown, public safety failures, and emergency response conditions."
  },
  "Science & Research": {
    interestTags: ["science", "research", "curiosity", "evidence"],
    traitTargets: {
      analytical: 90,
      creativity: 62,
      empathy: 40,
      resilience: 72,
      communication: 54,
      discipline: 84,
      leadership: 44,
      independence: 76,
      adaptability: 72,
      physicalStamina: 42
    },
    defaultDemandTags: ["curiosity", "discipline", "precision", "patience", "independence"],
    trainingRoute: "deep academic grounding, research methods, experimentation, and publication or field exposure",
    practiceRoute: "labs, field studies, research internships, analysis projects, and scientific writing",
    baseSalary: [4.5, 8, 14, 24, 38],
    resilienceBase: 78,
    futureDemand: 86,
    automationRisk: 28,
    workSettings: "research labs, think tanks, universities, R&D teams, and scientific institutions",
    positives: [
      "ideal for students who love evidence, curiosity, and discovery",
      "many roles contribute to long-term breakthroughs",
      "specialization creates strong expert identity",
      "fits students who enjoy depth over constant noise"
    ],
    challenges: [
      "progress can be slow and uncertain",
      "requires comfort with failure, iteration, and delayed payoff",
      "funding or project continuity can vary by field",
      "communication is still necessary to explain complex work"
    ],
    negatives: [
      "not ideal for students seeking instant results",
      "advanced roles may require long academic commitments",
      "some tracks are niche and geographically concentrated",
      "recognition can lag behind effort"
    ],
    crisisSupport:
      "remains important because medicine, climate response, materials, energy, food, and evidence-driven decisions still depend on research."
  },
  "Creative & Media": {
    interestTags: ["creative", "design", "storytelling", "visual-thinking"],
    traitTargets: {
      analytical: 54,
      creativity: 92,
      empathy: 68,
      resilience: 70,
      communication: 74,
      discipline: 68,
      leadership: 58,
      independence: 70,
      adaptability: 82,
      physicalStamina: 38
    },
    defaultDemandTags: ["creativity", "feedback-tolerance", "consistency", "communication", "adaptability"],
    trainingRoute: "craft development, portfolio creation, design/story fundamentals, and real audience feedback",
    practiceRoute: "projects, studios, internships, freelance work, critiques, and publishing",
    baseSalary: [3.5, 6.5, 11, 18, 32],
    resilienceBase: 58,
    futureDemand: 74,
    automationRisk: 48,
    workSettings: "studios, agencies, production houses, design teams, publishing, and creator-led businesses",
    positives: [
      "strong outlet for originality and identity",
      "many roles can turn ideas into visible real-world impact",
      "portfolio strength can matter more than rigid academic pedigree",
      "crosses into branding, products, entertainment, architecture, and culture"
    ],
    challenges: [
      "feedback can be subjective and sometimes harsh",
      "income may be uneven early in the journey",
      "consistent output matters as much as talent",
      "creative blocks and client pressure are both real"
    ],
    negatives: [
      "some roles have unstable early-career demand",
      "burnout can happen when creative work becomes purely commercial",
      "competition is intense in high-visibility specialties",
      "students who dislike open-ended ambiguity may struggle"
    ],
    crisisSupport:
      "stays relevant in communication, design, architecture, media, and morale-building, though demand can vary by sector."
  },
  "Skilled Trades & Manufacturing": {
    interestTags: ["hands-on", "systems", "building", "practical-work"],
    traitTargets: {
      analytical: 68,
      creativity: 50,
      empathy: 40,
      resilience: 82,
      communication: 48,
      discipline: 84,
      leadership: 54,
      independence: 72,
      adaptability: 70,
      physicalStamina: 84
    },
    defaultDemandTags: ["precision", "physical-endurance", "discipline", "safety", "problem-solving"],
    trainingRoute: "technical study, apprenticeships, hands-on tool exposure, and safety discipline",
    practiceRoute: "shop-floor practice, site work, supervised repair, fabrication, and industry certifications",
    baseSalary: [3.2, 5.8, 9.5, 15, 24],
    resilienceBase: 88,
    futureDemand: 84,
    automationRisk: 26,
    workSettings: "sites, factories, workshops, plants, energy systems, and maintenance environments",
    positives: [
      "very tangible work with visible output",
      "strong fit for students who like practical problem-solving",
      "many roles remain essential to infrastructure and industry",
      "skills can turn into entrepreneurship or contract work"
    ],
    challenges: [
      "physical stamina and safety discipline matter every day",
      "weather, site conditions, or machinery can be demanding",
      "mistakes can become costly or dangerous",
      "some roles require odd hours during outages or breakdowns"
    ],
    negatives: [
      "not ideal for students who want fully desk-based work",
      "body strain can build without proper habits",
      "some environments are noisy, dirty, or high-pressure",
      "continuous certification is needed in regulated trades"
    ],
    crisisSupport:
      "becomes highly valuable because infrastructure repair, energy, equipment, water, transport, and construction remain essential."
  },
  "Travel & Hospitality": {
    interestTags: ["hospitality", "service", "travel", "customer-experience"],
    traitTargets: {
      analytical: 50,
      creativity: 62,
      empathy: 84,
      resilience: 72,
      communication: 88,
      discipline: 72,
      leadership: 66,
      independence: 42,
      adaptability: 84,
      physicalStamina: 58
    },
    defaultDemandTags: ["service", "communication", "composure", "irregular-hours", "adaptability"],
    trainingRoute: "service fundamentals, operational learning, hospitality standards, and guest handling practice",
    practiceRoute: "hotel exposure, kitchen labs, event coordination, front-office work, and guest operations",
    baseSalary: [2.8, 4.8, 8.5, 14, 24],
    resilienceBase: 46,
    futureDemand: 70,
    automationRisk: 38,
    workSettings: "hotels, airlines, kitchens, events, tourism services, and customer-experience operations",
    positives: [
      "ideal for students who enjoy fast human interaction and service energy",
      "many roles build confidence, presence, and real-time decision-making",
      "can open travel exposure and international opportunities",
      "operational excellence is visible and measurable"
    ],
    challenges: [
      "peak periods can be exhausting and unpredictable",
      "customer-facing stress requires emotional control",
      "weekends, holidays, and late shifts are common",
      "service quality must stay high even when tired"
    ],
    negatives: [
      "income can depend on sector, location, and experience",
      "some parts of the industry are sensitive to large travel disruptions",
      "not ideal for students who strongly dislike public-facing roles",
      "burnout can happen without boundary management"
    ],
    crisisSupport:
      "core food service and event coordination adapt, but discretionary travel segments can weaken during major geopolitical disruption."
  },
  "Agriculture & Environment": {
    interestTags: ["environment", "nature", "sustainability", "field-work"],
    traitTargets: {
      analytical: 68,
      creativity: 56,
      empathy: 52,
      resilience: 80,
      communication: 54,
      discipline: 78,
      leadership: 58,
      independence: 70,
      adaptability: 82,
      physicalStamina: 74
    },
    defaultDemandTags: ["adaptability", "long-horizon-thinking", "physical-endurance", "resourcefulness", "service"],
    trainingRoute: "domain science, field knowledge, climate/resource understanding, and practical application",
    practiceRoute: "field exposure, labs, local projects, cooperatives, extension work, and sustainability initiatives",
    baseSalary: [3, 5.5, 9, 15, 26],
    resilienceBase: 90,
    futureDemand: 88,
    automationRisk: 22,
    workSettings: "farms, field stations, conservation programs, utilities, energy planning, and environmental systems",
    positives: [
      "strong real-world relevance tied to food, water, climate, and resource security",
      "good fit for students who prefer practical impact over abstract status",
      "many roles will grow as sustainability pressure rises",
      "blends science with systems thinking and community impact"
    ],
    challenges: [
      "conditions can be weather-sensitive or field-intensive",
      "results often depend on long cycles, not instant wins",
      "some roles need both science depth and local execution skill",
      "resource constraints can slow change"
    ],
    negatives: [
      "some roles are undervalued despite high importance",
      "field conditions may not suit every student",
      "growth speed can vary by geography and policy",
      "requires comfort with environmental uncertainty"
    ],
    crisisSupport:
      "stays extremely strong because food, water, waste, energy, land, and ecological recovery become even more important during global disruption."
  },
  "Sports & Wellness": {
    interestTags: ["fitness", "wellness", "coaching", "performance"],
    traitTargets: {
      analytical: 54,
      creativity: 54,
      empathy: 74,
      resilience: 84,
      communication: 76,
      discipline: 84,
      leadership: 70,
      independence: 50,
      adaptability: 76,
      physicalStamina: 90
    },
    defaultDemandTags: ["discipline", "physical-endurance", "motivation", "consistency", "communication"],
    trainingRoute: "sport science or coaching fundamentals, certifications, practice observation, and applied training",
    practiceRoute: "coaching, rehab support, performance tracking, internships, camps, and community programs",
    baseSalary: [2.8, 4.5, 8, 13, 24],
    resilienceBase: 62,
    futureDemand: 75,
    automationRisk: 24,
    workSettings: "academies, gyms, teams, rehabilitation centers, schools, and wellness programs",
    positives: [
      "good fit for energetic students who like physical engagement and motivation",
      "many roles visibly improve confidence, health, and performance",
      "can combine science, coaching, and psychology",
      "strong pathway for students who enjoy routine and discipline"
    ],
    challenges: [
      "credibility depends on real consistency and trust",
      "client motivation varies and can be draining",
      "physical presence and schedule management matter",
      "income can fluctuate early without a clear niche"
    ],
    negatives: [
      "not every role has stable fixed salaries at the beginning",
      "injury risk or physical fatigue can affect longevity",
      "requires ongoing certifications and client-building",
      "students who dislike routine coaching may lose interest"
    ],
    crisisSupport:
      "essential wellness, rehabilitation, training, and community fitness stay valuable, though elite entertainment sport can fluctuate."
  }
};

const careerGroups = [
  {
    category: "Technology",
    roles: [
      "Software Engineer",
      "Data Analyst",
      "Cybersecurity Analyst",
      "Cloud Engineer",
      "DevOps Engineer",
      "AI/ML Engineer",
      "Product Manager",
      "UX Designer",
      "QA Engineer",
      "Network Engineer",
      "Database Administrator",
      "Mobile App Developer",
      "Game Designer",
      "Tech Support Specialist",
      "Robotics Engineer"
    ]
  },
  {
    category: "Healthcare",
    roles: [
      "Doctor",
      "Nurse",
      "Pharmacist",
      "Physiotherapist",
      "Radiographer",
      "Psychologist",
      "Medical Laboratory Scientist",
      "Dentist",
      "Nutritionist",
      "Occupational Therapist",
      "Public Health Analyst",
      "Emergency Medical Technician",
      { title: "Surgeon", resilienceBoost: 4, salaryOffset: 6, demandTags: ["precision", "discipline", "emotional-resilience", "leadership", "ethics"] },
      "Speech Therapist",
      "Optometrist"
    ]
  },
  {
    category: "Business & Finance",
    roles: [
      "Accountant",
      "Investment Analyst",
      "Financial Planner",
      "Auditor",
      "Banker",
      "Supply Chain Analyst",
      "Operations Manager",
      "HR Specialist",
      "Marketing Manager",
      "Sales Strategist",
      "Business Analyst",
      "Procurement Manager",
      { title: "Entrepreneur", resilienceBoost: 8, futureBoost: 5, demandTags: ["ownership", "risk", "leadership", "ambiguity", "communication"] },
      "Risk Manager",
      "Insurance Advisor"
    ]
  },
  {
    category: "Education & Human Services",
    roles: [
      "School Teacher",
      "Special Educator",
      "School Counselor",
      "College Professor",
      "Instructional Designer",
      "Social Worker",
      "Child Psychologist",
      "Career Counselor",
      "Corporate Trainer",
      "Librarian",
      "Academic Coordinator",
      "Learning Experience Designer",
      "Community Outreach Officer",
      "Education Policy Analyst",
      "Youth Mentor"
    ]
  },
  {
    category: "Public Service & Law",
    roles: [
      "Lawyer",
      "Judge",
      "Police Officer",
      { title: "Army Officer", resilienceBoost: 14, demandTags: ["discipline", "family-separation", "risk", "leadership", "physical-endurance", "ethics"], automationShift: -8 },
      "Intelligence Analyst",
      "Firefighter",
      "Civil Servant",
      "Diplomat",
      "Disaster Management Specialist",
      "Forensic Investigator",
      "Criminologist",
      "Correctional Officer",
      "Legislative Researcher",
      "Human Rights Advocate",
      "Security Consultant"
    ]
  },
  {
    category: "Science & Research",
    roles: [
      "Research Scientist",
      "Biotechnologist",
      "Environmental Scientist",
      "Geologist",
      "Astronomer",
      "Chemist",
      "Physicist",
      "Marine Biologist",
      "Epidemiologist",
      "Statistician",
      "Agricultural Scientist",
      "Climate Analyst",
      "Neuroscientist",
      "Archaeologist",
      "Food Scientist"
    ]
  },
  {
    category: "Creative & Media",
    roles: [
      "Interior Designer",
      "Graphic Designer",
      "Animator",
      "Filmmaker",
      "Journalist",
      "Copywriter",
      "Fashion Designer",
      "Music Producer",
      "Photographer",
      "Content Strategist",
      { title: "Architect", salaryOffset: 3, resilienceBoost: 4, demandTags: ["creativity", "precision", "discipline", "communication", "constraint-handling"] },
      "Industrial Designer",
      "Illustrator",
      "Game Writer",
      "Art Director"
    ]
  },
  {
    category: "Skilled Trades & Manufacturing",
    roles: [
      "Electrician",
      "Plumber",
      "Welder",
      "CNC Machinist",
      "Solar Technician",
      "Automotive Technician",
      "Aircraft Maintenance Technician",
      "Construction Manager",
      "Civil Site Supervisor",
      "HVAC Technician",
      "Mechatronics Technician",
      "Manufacturing Engineer",
      "Quality Inspector",
      "Carpenter",
      "Safety Officer"
    ]
  },
  {
    category: "Travel & Hospitality",
    roles: [
      "Hotel Manager",
      "Chef",
      "Baker",
      "Event Planner",
      "Travel Consultant",
      "Aviation Ground Staff",
      "Cabin Crew",
      "Tourism Officer",
      "Restaurant Manager",
      "Sommelier",
      "Cruise Operations Officer",
      "Hospitality Trainer",
      "Pastry Chef",
      "Front Office Manager",
      "Venue Operations Lead"
    ]
  },
  {
    category: "Agriculture & Environment",
    roles: [
      "Farmer Entrepreneur",
      "Horticulturist",
      "Veterinary Doctor",
      "Dairy Technologist",
      "Forest Officer",
      "Wildlife Biologist",
      "Soil Scientist",
      "Irrigation Engineer",
      "Fisheries Officer",
      "Sustainability Manager",
      "Renewable Energy Planner",
      "Urban Farmer",
      "Water Resource Specialist",
      "Waste Management Officer",
      "Eco-tourism Planner"
    ]
  },
  {
    category: "Sports & Wellness",
    roles: [
      "Fitness Coach",
      "Sports Psychologist",
      "Athletic Trainer",
      "Yoga Therapist",
      "Sports Manager",
      "Physical Education Teacher",
      "Nutrition Coach",
      "Rehabilitation Specialist",
      "Performance Analyst",
      "Strength and Conditioning Coach",
      "Referee",
      "Wellness Consultant",
      "Esports Coach",
      "Adventure Sports Guide",
      "Sports Journalist"
    ]
  }
];

function normalizeRole(roleSeed) {
  return typeof roleSeed === "string" ? { title: roleSeed } : roleSeed;
}

function buildHowToBecome(role, categoryProfile) {
  return [
    `Study the daily reality of a ${role.title} by talking to working professionals, shadowing, or taking introductory exposure opportunities.`,
    `Build fundamentals through ${categoryProfile.trainingRoute}.`,
    `Strengthen your readiness with ${categoryProfile.practiceRoute}.`,
    `Collect proof of ability through projects, internships, supervised practice, certifications, or competitions related to ${role.title}.`,
    `Review feedback regularly and choose the next training milestone that moves you closer to a real entry role in ${role.title}.`
  ];
}

function buildSalaryProgression(baseSalary, salaryOffset = 0) {
  const adjusted = baseSalary.map((amount) => clamp(amount + salaryOffset, 2, 90));

  return {
    fresher: adjusted[0],
    junior: adjusted[1],
    mid: adjusted[2],
    senior: adjusted[3],
    expert: adjusted[4]
  };
}

function buildCareer(role, categoryProfile) {
  const demandTags = role.demandTags || categoryProfile.defaultDemandTags;
  const salaryProgression = buildSalaryProgression(categoryProfile.baseSalary, role.salaryOffset || 0);
  const crisisResilienceScore = clamp(categoryProfile.resilienceBase + (role.resilienceBoost || 0), 25, 99);
  const futureDemand = clamp(categoryProfile.futureDemand + (role.futureBoost || 0), 25, 99);
  const automationRisk = clamp(categoryProfile.automationRisk + (role.automationShift || 0), 5, 95);
  const traitTargets = { ...categoryProfile.traitTargets, ...(role.traitTargets || {}) };
  const interestTags = unique([...(role.tags || []), ...categoryProfile.interestTags]);

  return {
    id: slugify(role.title),
    title: role.title,
    category: role.category || categoryProfile.category || "",
    overview: `${role.title} sits inside the ${role.category || categoryProfile.category || ""} space and rewards students who are willing to match training with real-world responsibility.`,
    summary:
      role.summary ||
      `${role.title} is best for students whose strengths line up with ${interestTags.slice(0, 2).join(" and ")} and who can stay steady under ${demandTags.slice(0, 2).join(" and ")} demands.`,
    howToBecome: buildHowToBecome(role, categoryProfile),
    challenges: [
      `${role.title} usually demands consistency before confidence.`,
      ...categoryProfile.challenges.slice(0, 3)
    ],
    positives: [
      `${role.title} gives students a concrete path to visible responsibility.`,
      ...categoryProfile.positives.slice(0, 3)
    ],
    negatives: [
      `${role.title} is not a good fit if the student is only attracted by title and not by the daily reality.`,
      ...categoryProfile.negatives.slice(0, 3)
    ],
    salaryProgressionLakhsINR: salaryProgression,
    crisisResilience: {
      score: crisisResilienceScore,
      label:
        crisisResilienceScore >= 85
          ? "Highly resilient"
          : crisisResilienceScore >= 65
            ? "Stable under pressure"
            : "Moderately sensitive",
      explanation: `${role.title} scores ${crisisResilienceScore}/100 for long-term resilience because ${categoryProfile.crisisSupport}`
    },
    futureOutlook: {
      demandScore: futureDemand,
      automationRisk,
      note: `${role.title} remains influenced by demand, training quality, technology shifts, and how essential the role is to society.`
    },
    realWorldReality: {
      workSettings: categoryProfile.workSettings,
      commonPressureAreas: demandTags,
      studentReadinessSignals: interestTags
    },
    interestTags,
    traitTargets,
    demandTags,
    categoryCode: slugify(role.category || categoryProfile.category || ""),
    trainingRoute: categoryProfile.trainingRoute,
    practiceRoute: categoryProfile.practiceRoute
  };
}

let cachedCareers = null;

function buildCareerLibrary() {
  const careers = [];

  careerGroups.forEach((group) => {
    const profile = categoryProfiles[group.category];

    if (!profile) {
      return;
    }

    profile.category = group.category;

    group.roles.forEach((roleSeed) => {
      const role = normalizeRole(roleSeed);
      role.category = group.category;
      careers.push(buildCareer(role, profile));
    });
  });

  return careers;
}

function getCareerLibrary() {
  if (!cachedCareers) {
    cachedCareers = buildCareerLibrary();
  }

  return cachedCareers;
}

function getCareerById(careerId) {
  return getCareerLibrary().find((career) => career.id === careerId) || null;
}

function searchCareers({ search = "", category = "" } = {}) {
  const searchTerm = String(search || "").toLowerCase().trim();
  const categoryFilter = String(category || "").toLowerCase().trim();

  return getCareerLibrary().filter((career) => {
    const categoryMatches = !categoryFilter || career.category.toLowerCase() === categoryFilter;
    const searchMatches =
      !searchTerm ||
      career.title.toLowerCase().includes(searchTerm) ||
      career.category.toLowerCase().includes(searchTerm) ||
      career.interestTags.some((tag) => tag.includes(searchTerm));

    return categoryMatches && searchMatches;
  });
}

module.exports = {
  getCareerById,
  getCareerLibrary,
  searchCareers
};
