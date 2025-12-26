export interface RoadmapSkill {
  id: string;
  name: string;
  description: string;
  duration: string;
  status: "completed" | "current" | "locked";
  order: number;
}

export interface DomainRoadmap {
  domain: string;
  domainLabel: string;
  skills: RoadmapSkill[];
}

export const domainRoadmaps: Record<string, DomainRoadmap> = {
  tech: {
    domain: "tech",
    domainLabel: "Web Development",
    skills: [
      {
        id: "html",
        name: "HTML",
        description: "Structure of web pages",
        duration: "7-10 days",
        status: "locked",
        order: 1,
      },
      {
        id: "css",
        name: "CSS",
        description: "Styling & layout of websites",
        duration: "10-14 days",
        status: "locked",
        order: 2,
      },
      {
        id: "javascript",
        name: "JavaScript",
        description: "Logic & interactivity",
        duration: "15-20 days",
        status: "locked",
        order: 3,
      },
      {
        id: "frameworks",
        name: "Frameworks",
        description: "Building scalable UI (React)",
        duration: "15-18 days",
        status: "locked",
        order: 4,
      },
      {
        id: "backend",
        name: "Backend Basics",
        description: "Server & data handling",
        duration: "12-15 days",
        status: "locked",
        order: 5,
      },
      {
        id: "projects",
        name: "Projects",
        description: "Real-world applications",
        duration: "10-14 days",
        status: "locked",
        order: 6,
      },
    ],
  },
  data: {
    domain: "data",
    domainLabel: "Data Analytics",
    skills: [
      {
        id: "excel",
        name: "Excel",
        description: "Basics of data handling",
        duration: "7-10 days",
        status: "locked",
        order: 1,
      },
      {
        id: "sql",
        name: "SQL",
        description: "Database querying",
        duration: "10-14 days",
        status: "locked",
        order: 2,
      },
      {
        id: "python",
        name: "Python",
        description: "Data analysis programming",
        duration: "15-18 days",
        status: "locked",
        order: 3,
      },
      {
        id: "visualization",
        name: "Data Visualization",
        description: "Visual storytelling",
        duration: "7-10 days",
        status: "locked",
        order: 4,
      },
      {
        id: "statistics",
        name: "Statistics",
        description: "Data interpretation",
        duration: "7-10 days",
        status: "locked",
        order: 5,
      },
      {
        id: "projects",
        name: "Projects",
        description: "Dashboards & insights",
        duration: "10-12 days",
        status: "locked",
        order: 6,
      },
    ],
  },
  design: {
    domain: "design",
    domainLabel: "UI/UX Design",
    skills: [
      {
        id: "basics",
        name: "Design Basics",
        description: "Color, typography, spacing",
        duration: "5-7 days",
        status: "locked",
        order: 1,
      },
      {
        id: "ux",
        name: "UX Principles",
        description: "User research & usability",
        duration: "7-10 days",
        status: "locked",
        order: 2,
      },
      {
        id: "ui",
        name: "UI Design",
        description: "Visual interface design",
        duration: "7-10 days",
        status: "locked",
        order: 3,
      },
      {
        id: "figma",
        name: "Figma",
        description: "Design tool mastery",
        duration: "5-7 days",
        status: "locked",
        order: 4,
      },
      {
        id: "prototyping",
        name: "Prototyping",
        description: "Interactive designs",
        duration: "5-7 days",
        status: "locked",
        order: 5,
      },
      {
        id: "portfolio",
        name: "Portfolio",
        description: "Case studies",
        duration: "7-10 days",
        status: "locked",
        order: 6,
      },
    ],
  },
  business: {
    domain: "business",
    domainLabel: "Business Analytics",
    skills: [
      {
        id: "excel",
        name: "Excel",
        description: "Advanced spreadsheets",
        duration: "7-10 days",
        status: "locked",
        order: 1,
      },
      {
        id: "analytics",
        name: "Business Analytics",
        description: "Data-driven decisions",
        duration: "10-14 days",
        status: "locked",
        order: 2,
      },
      {
        id: "sql",
        name: "SQL Basics",
        description: "Query business data",
        duration: "10-12 days",
        status: "locked",
        order: 3,
      },
      {
        id: "visualization",
        name: "Dashboards",
        description: "Power BI / Tableau",
        duration: "7-10 days",
        status: "locked",
        order: 4,
      },
      {
        id: "communication",
        name: "Presentation",
        description: "Stakeholder communication",
        duration: "5-7 days",
        status: "locked",
        order: 5,
      },
      {
        id: "projects",
        name: "Case Studies",
        description: "Real business problems",
        duration: "10-14 days",
        status: "locked",
        order: 6,
      },
    ],
  },
  marketing: {
    domain: "marketing",
    domainLabel: "Digital Marketing",
    skills: [
      {
        id: "fundamentals",
        name: "Marketing Basics",
        description: "Core marketing concepts",
        duration: "5-7 days",
        status: "locked",
        order: 1,
      },
      {
        id: "seo",
        name: "SEO",
        description: "Search engine optimization",
        duration: "10-14 days",
        status: "locked",
        order: 2,
      },
      {
        id: "content",
        name: "Content Marketing",
        description: "Creating valuable content",
        duration: "7-10 days",
        status: "locked",
        order: 3,
      },
      {
        id: "social",
        name: "Social Media",
        description: "Platform strategies",
        duration: "7-10 days",
        status: "locked",
        order: 4,
      },
      {
        id: "analytics",
        name: "Analytics",
        description: "Google Analytics mastery",
        duration: "5-7 days",
        status: "locked",
        order: 5,
      },
      {
        id: "campaigns",
        name: "Campaigns",
        description: "Run real campaigns",
        duration: "10-14 days",
        status: "locked",
        order: 6,
      },
    ],
  },
  finance: {
    domain: "finance",
    domainLabel: "Finance & Analytics",
    skills: [
      {
        id: "excel",
        name: "Financial Excel",
        description: "Advanced formulas & modeling",
        duration: "10-14 days",
        status: "locked",
        order: 1,
      },
      {
        id: "accounting",
        name: "Accounting Basics",
        description: "Financial statements",
        duration: "10-12 days",
        status: "locked",
        order: 2,
      },
      {
        id: "modeling",
        name: "Financial Modeling",
        description: "Building financial models",
        duration: "12-15 days",
        status: "locked",
        order: 3,
      },
      {
        id: "valuation",
        name: "Valuation",
        description: "Company valuation methods",
        duration: "10-12 days",
        status: "locked",
        order: 4,
      },
      {
        id: "python",
        name: "Python for Finance",
        description: "Quantitative analysis",
        duration: "12-15 days",
        status: "locked",
        order: 5,
      },
      {
        id: "projects",
        name: "Case Studies",
        description: "Real financial analysis",
        duration: "10-14 days",
        status: "locked",
        order: 6,
      },
    ],
  },
};

export const initializeRoadmap = (domain: string, existingSkills: string[]): RoadmapSkill[] => {
  const roadmap = domainRoadmaps[domain] || domainRoadmaps.tech;
  
  return roadmap.skills.map((skill, index) => {
    // First skill is always current if no skills, otherwise check existing skills
    if (existingSkills.length === 0) {
      return {
        ...skill,
        status: index === 0 ? "current" : "locked",
      };
    }
    
    // Check if user already has this skill
    const hasSkill = existingSkills.some(
      (s) => s.toLowerCase().includes(skill.name.toLowerCase()) ||
             skill.name.toLowerCase().includes(s.toLowerCase())
    );
    
    if (hasSkill) {
      return { ...skill, status: "completed" };
    }
    
    // Find first incomplete skill
    const firstIncomplete = roadmap.skills.findIndex((s, i) => {
      const userHasSkill = existingSkills.some(
        (es) => es.toLowerCase().includes(s.name.toLowerCase()) ||
                s.name.toLowerCase().includes(es.toLowerCase())
      );
      return !userHasSkill;
    });
    
    return {
      ...skill,
      status: index === firstIncomplete ? "current" : "locked",
    };
  });
};
