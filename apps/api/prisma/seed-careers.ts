import { PrismaClient, CareerStatus } from "@prisma/client";

const prisma = new PrismaClient();

const catalog = [
  {
    category: { slug: "technology", name: "Technology" },
    career: {
      slug: "software-engineer",
      title: "Software Engineer",
      summary: "Designs, builds, tests, and maintains software systems across web, mobile, and backend platforms."
    },
    detail: {
      educationPath: ["Computer science degree or equivalent self-driven portfolio path", "Data structures and systems fundamentals", "Project-based experience"],
      skills: ["Programming", "Debugging", "System design", "Communication", "Continuous learning"],
      positives: ["Strong demand", "Clear growth path", "Cross-industry mobility"],
      challenges: ["Fast-changing tools", "Ambiguous requirements", "Sustained focus demands"],
      drawbacks: ["Entry-level competition can be high", "Screen-heavy work", "Burnout risk in poor delivery cultures"],
      salaryMeta: { entryLevelLpa: 6, midLevelLpa: 18, seniorLevelLpa: 35 },
      outlookMeta: { demandScore: 91, automationRisk: 28, outlook: "Strong long-term demand with specialization upside." },
      resilienceMeta: { score: 84, label: "High resilience", explanation: "Digital infrastructure stays essential in most economic conditions." }
    }
  },
  {
    category: { slug: "technology", name: "Technology" },
    career: {
      slug: "cybersecurity-analyst",
      title: "Cybersecurity Analyst",
      summary: "Protects systems, networks, and data by monitoring threats, investigating incidents, and improving defenses."
    },
    detail: {
      educationPath: ["Networking and security fundamentals", "Hands-on labs and certifications", "Incident response practice"],
      skills: ["Threat analysis", "Monitoring", "Networking", "Risk assessment", "Documentation"],
      positives: ["Mission-critical work", "Global demand", "Clear specialization paths"],
      challenges: ["High pressure during incidents", "Constant threat evolution", "On-call expectations"],
      drawbacks: ["Can be stressful", "Requires discipline and detail", "Tooling complexity"],
      salaryMeta: { entryLevelLpa: 7, midLevelLpa: 20, seniorLevelLpa: 36 },
      outlookMeta: { demandScore: 93, automationRisk: 20, outlook: "Demand rises as digital risk exposure grows." },
      resilienceMeta: { score: 90, label: "Very high resilience", explanation: "Security work remains essential during disruption and crisis." }
    }
  },
  {
    category: { slug: "healthcare", name: "Healthcare" },
    career: {
      slug: "physician",
      title: "Physician",
      summary: "Diagnoses and treats patients while coordinating medical decisions, long-term care, and clinical judgment."
    },
    detail: {
      educationPath: ["Medical degree", "Licensing and residency", "Supervised clinical practice"],
      skills: ["Clinical reasoning", "Empathy", "Discipline", "Communication", "Decision-making"],
      positives: ["High social value", "Strong credibility", "Long-term demand"],
      challenges: ["Long training path", "Emotional load", "Serious responsibility"],
      drawbacks: ["High stress", "Time-intensive preparation", "Shift and emergency work"],
      salaryMeta: { entryLevelLpa: 10, midLevelLpa: 28, seniorLevelLpa: 60 },
      outlookMeta: { demandScore: 95, automationRisk: 10, outlook: "Healthcare demand remains structurally strong." },
      resilienceMeta: { score: 96, label: "Exceptional resilience", explanation: "Medical care is essential in crisis and stable conditions alike." }
    }
  },
  {
    category: { slug: "education", name: "Education" },
    career: {
      slug: "teacher",
      title: "Teacher",
      summary: "Guides learners through subject mastery, skill development, and long-term academic growth."
    },
    detail: {
      educationPath: ["Relevant degree", "Teacher preparation", "Classroom practice"],
      skills: ["Communication", "Planning", "Empathy", "Classroom management", "Consistency"],
      positives: ["Long-term impact", "Trust-based profession", "Clear social contribution"],
      challenges: ["Patience demands", "Institutional constraints", "Daily communication load"],
      drawbacks: ["Compensation may lag some sectors", "Emotional fatigue", "Results can be slow to see"],
      salaryMeta: { entryLevelLpa: 3.5, midLevelLpa: 8, seniorLevelLpa: 18 },
      outlookMeta: { demandScore: 82, automationRisk: 22, outlook: "Human-centered teaching remains durable despite tooling change." },
      resilienceMeta: { score: 80, label: "High resilience", explanation: "Learning and guidance remain necessary even in unstable periods." }
    }
  },
  {
    category: { slug: "business-finance", name: "Business & Finance" },
    career: {
      slug: "financial-analyst",
      title: "Financial Analyst",
      summary: "Evaluates financial data, business performance, and investment tradeoffs to support planning and decisions."
    },
    detail: {
      educationPath: ["Commerce or finance study", "Excel and modeling skills", "Internships and market exposure"],
      skills: ["Analysis", "Modeling", "Communication", "Attention to detail", "Decision support"],
      positives: ["Broad business exposure", "Transferable skill set", "Structured career ladder"],
      challenges: ["Deadlines", "Pressure under uncertainty", "High accuracy expectations"],
      drawbacks: ["Can become spreadsheet-heavy", "Competitive entry routes", "Market volatility pressure"],
      salaryMeta: { entryLevelLpa: 5, midLevelLpa: 14, seniorLevelLpa: 28 },
      outlookMeta: { demandScore: 83, automationRisk: 35, outlook: "Strong demand where judgment and business context matter." },
      resilienceMeta: { score: 71, label: "Moderate-high resilience", explanation: "Finance and planning remain important but some roles are cyclical." }
    }
  },
  {
    category: { slug: "public-service", name: "Public Service" },
    career: {
      slug: "civil-services-officer",
      title: "Civil Services Officer",
      summary: "Leads administrative, policy, and public governance functions in service of government institutions."
    },
    detail: {
      educationPath: ["Competitive exam preparation", "Policy and governance understanding", "Administrative training"],
      skills: ["Leadership", "Policy judgment", "Communication", "Discipline", "Public accountability"],
      positives: ["Mission-driven work", "Broad public impact", "Strong institutional authority"],
      challenges: ["Highly competitive selection", "Political and public pressure", "High responsibility"],
      drawbacks: ["Bureaucratic pace", "Relocation risk", "Heavy accountability"],
      salaryMeta: { entryLevelLpa: 8, midLevelLpa: 18, seniorLevelLpa: 32 },
      outlookMeta: { demandScore: 78, automationRisk: 12, outlook: "Stable relevance where public systems need capable leadership." },
      resilienceMeta: { score: 92, label: "Very high resilience", explanation: "Governance and public administration remain critical in crisis." }
    }
  },
  {
    category: { slug: "science-research", name: "Science & Research" },
    career: {
      slug: "data-scientist",
      title: "Data Scientist",
      summary: "Uses statistics, programming, and domain understanding to derive insights and build predictive models."
    },
    detail: {
      educationPath: ["Statistics or computing foundation", "Machine learning practice", "Applied projects"],
      skills: ["Statistics", "Python", "Modeling", "Experimentation", "Communication"],
      positives: ["High-impact analytical work", "Cross-domain opportunities", "Strong upside with depth"],
      challenges: ["Messy data realities", "Expectation management", "Tooling depth required"],
      drawbacks: ["Can be overhyped in some companies", "Requires sustained math comfort", "Business translation is hard"],
      salaryMeta: { entryLevelLpa: 8, midLevelLpa: 22, seniorLevelLpa: 40 },
      outlookMeta: { demandScore: 88, automationRisk: 30, outlook: "Strong demand where data strategy and interpretation matter." },
      resilienceMeta: { score: 79, label: "High resilience", explanation: "Analytical decision support remains important across sectors." }
    }
  },
  {
    category: { slug: "design-creative", name: "Design & Creative" },
    career: {
      slug: "ux-designer",
      title: "UX Designer",
      summary: "Designs digital experiences by understanding user needs, flows, interfaces, and product usability."
    },
    detail: {
      educationPath: ["Design fundamentals", "Research and prototyping practice", "Portfolio of case studies"],
      skills: ["Research", "Wireframing", "Visual communication", "Collaboration", "Problem framing"],
      positives: ["Blends creativity and structure", "Visible user impact", "Strong product collaboration"],
      challenges: ["Stakeholder alignment", "Subjective feedback cycles", "Balancing user and business needs"],
      drawbacks: ["Portfolio pressure", "Can be misunderstood in weak product cultures", "Requires communication maturity"],
      salaryMeta: { entryLevelLpa: 5, midLevelLpa: 14, seniorLevelLpa: 26 },
      outlookMeta: { demandScore: 77, automationRisk: 33, outlook: "Still valuable where thoughtful product experience matters." },
      resilienceMeta: { score: 68, label: "Moderate resilience", explanation: "Design remains useful, though some hiring is market-sensitive." }
    }
  }
] as const;

async function main(): Promise<void> {
  for (const entry of catalog) {
    const category = await prisma.careerCategory.upsert({
      where: { slug: entry.category.slug },
      update: { name: entry.category.name },
      create: entry.category
    });

    const career = await prisma.career.upsert({
      where: { slug: entry.career.slug },
      update: {
        title: entry.career.title,
        summary: entry.career.summary,
        categoryId: category.id,
        status: CareerStatus.active
      },
      create: {
        ...entry.career,
        categoryId: category.id,
        status: CareerStatus.active
      }
    });

    await prisma.careerDetail.upsert({
      where: { careerId: career.id },
      update: entry.detail,
      create: {
        careerId: career.id,
        ...entry.detail
      }
    });
  }

  console.log(`Seeded ${catalog.length} careers.`);
}

void main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
