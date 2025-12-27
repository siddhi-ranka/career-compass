export interface SubTopic {
  id: string;
  name: string;
  completed: boolean;
}

export interface RoadmapSkill {
  id: string;
  name: string;
  description: string;
  duration: string;
  status: "completed" | "current" | "locked";
  order: number;
  subTopics: SubTopic[];
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
        subTopics: [
          { id: "html-basics", name: "HTML basics & browser working", completed: false },
          { id: "html-structure", name: "Document structure (doctype, html, head, body)", completed: false },
          { id: "html-text", name: "Text tags (h1–h6, p, span, strong, em)", completed: false },
          { id: "html-layout", name: "Layout tags (div, section, article, main)", completed: false },
          { id: "html-attributes", name: "Attributes (id, class, name, data-*)", completed: false },
          { id: "html-media", name: "Links & media (a, img, video, audio)", completed: false },
          { id: "html-lists", name: "Lists (ul, ol, li)", completed: false },
          { id: "html-tables", name: "Tables (table, tr, td, th)", completed: false },
          { id: "html-forms", name: "Forms (form, input, label, select, textarea)", completed: false },
          { id: "html-inputs", name: "Input types (email, password, checkbox, radio)", completed: false },
          { id: "html-semantic", name: "Semantic tags (header, nav, footer)", completed: false },
          { id: "html-accessibility", name: "Accessibility (alt, label, aria-*)", completed: false },
        ],
      },
      {
        id: "css",
        name: "CSS",
        description: "Styling & layout of websites",
        duration: "10-14 days",
        status: "locked",
        order: 2,
        subTopics: [
          { id: "css-syntax", name: "CSS syntax & selectors", completed: false },
          { id: "css-colors", name: "Colors, fonts, units", completed: false },
          { id: "css-box", name: "Box model (margin, padding, border)", completed: false },
          { id: "css-display", name: "Display types", completed: false },
          { id: "css-positioning", name: "Positioning", completed: false },
          { id: "css-flexbox", name: "Flexbox", completed: false },
          { id: "css-grid", name: "Grid", completed: false },
          { id: "css-responsive", name: "Responsive design", completed: false },
          { id: "css-media", name: "Media queries", completed: false },
          { id: "css-effects", name: "Hover & focus effects", completed: false },
          { id: "css-animations", name: "Animations & transitions", completed: false },
          { id: "css-variables", name: "CSS variables", completed: false },
        ],
      },
      {
        id: "javascript",
        name: "JavaScript",
        description: "Logic & interactivity",
        duration: "15-20 days",
        status: "locked",
        order: 3,
        subTopics: [
          { id: "js-variables", name: "Variables & data types", completed: false },
          { id: "js-conditions", name: "Conditions & loops", completed: false },
          { id: "js-functions", name: "Functions", completed: false },
          { id: "js-arrays", name: "Arrays & methods", completed: false },
          { id: "js-objects", name: "Objects", completed: false },
          { id: "js-dom", name: "DOM manipulation", completed: false },
          { id: "js-events", name: "Events", completed: false },
          { id: "js-es6", name: "ES6 features", completed: false },
          { id: "js-async", name: "Async JS", completed: false },
          { id: "js-apis", name: "APIs & fetch", completed: false },
          { id: "js-errors", name: "Error handling", completed: false },
        ],
      },
      {
        id: "frameworks",
        name: "React",
        description: "Building scalable UI",
        duration: "15-18 days",
        status: "locked",
        order: 4,
        subTopics: [
          { id: "react-components", name: "Components", completed: false },
          { id: "react-jsx", name: "JSX", completed: false },
          { id: "react-props", name: "Props & state", completed: false },
          { id: "react-hooks", name: "Hooks", completed: false },
          { id: "react-routing", name: "Routing", completed: false },
          { id: "react-api", name: "API integration", completed: false },
        ],
      },
      {
        id: "backend",
        name: "Backend Basics",
        description: "Server & data handling",
        duration: "12-15 days",
        status: "locked",
        order: 5,
        subTopics: [
          { id: "backend-nodejs", name: "Node.js", completed: false },
          { id: "backend-express", name: "Express", completed: false },
          { id: "backend-apis", name: "APIs", completed: false },
          { id: "backend-databases", name: "Databases", completed: false },
          { id: "backend-auth", name: "Authentication", completed: false },
        ],
      },
      {
        id: "projects",
        name: "Projects",
        description: "Real-world applications",
        duration: "10-14 days",
        status: "locked",
        order: 6,
        subTopics: [
          { id: "project-portfolio", name: "Portfolio website", completed: false },
          { id: "project-crud", name: "CRUD application", completed: false },
          { id: "project-fullstack", name: "Full-stack project", completed: false },
        ],
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
        subTopics: [
          { id: "excel-datatypes", name: "Data types", completed: false },
          { id: "excel-sorting", name: "Sorting & filtering", completed: false },
          { id: "excel-formulas", name: "Formulas", completed: false },
          { id: "excel-lookup", name: "Lookup functions (VLOOKUP, HLOOKUP)", completed: false },
          { id: "excel-pivot", name: "Pivot tables", completed: false },
          { id: "excel-charts", name: "Charts", completed: false },
          { id: "excel-cleaning", name: "Data cleaning", completed: false },
        ],
      },
      {
        id: "sql",
        name: "SQL",
        description: "Database querying",
        duration: "10-14 days",
        status: "locked",
        order: 2,
        subTopics: [
          { id: "sql-basics", name: "Database basics", completed: false },
          { id: "sql-select", name: "SELECT queries", completed: false },
          { id: "sql-where", name: "WHERE, ORDER BY", completed: false },
          { id: "sql-joins", name: "JOINS", completed: false },
          { id: "sql-groupby", name: "GROUP BY", completed: false },
          { id: "sql-subqueries", name: "Subqueries", completed: false },
        ],
      },
      {
        id: "python",
        name: "Python",
        description: "Data analysis programming",
        duration: "15-18 days",
        status: "locked",
        order: 3,
        subTopics: [
          { id: "python-basics", name: "Python basics", completed: false },
          { id: "python-numpy", name: "NumPy", completed: false },
          { id: "python-pandas", name: "Pandas", completed: false },
          { id: "python-cleaning", name: "Data cleaning", completed: false },
          { id: "python-analysis", name: "Data analysis", completed: false },
        ],
      },
      {
        id: "visualization",
        name: "Data Visualization",
        description: "Visual storytelling",
        duration: "7-10 days",
        status: "locked",
        order: 4,
        subTopics: [
          { id: "viz-charts", name: "Chart types", completed: false },
          { id: "viz-matplotlib", name: "Matplotlib", completed: false },
          { id: "viz-seaborn", name: "Seaborn", completed: false },
          { id: "viz-dashboards", name: "Dashboards (Power BI / Tableau)", completed: false },
        ],
      },
      {
        id: "statistics",
        name: "Statistics",
        description: "Data interpretation",
        duration: "7-10 days",
        status: "locked",
        order: 5,
        subTopics: [
          { id: "stats-basics", name: "Mean, median, mode", completed: false },
          { id: "stats-probability", name: "Probability", completed: false },
          { id: "stats-correlation", name: "Correlation", completed: false },
          { id: "stats-hypothesis", name: "Hypothesis testing", completed: false },
        ],
      },
      {
        id: "projects",
        name: "Projects",
        description: "Dashboards & insights",
        duration: "10-12 days",
        status: "locked",
        order: 6,
        subTopics: [
          { id: "project-dashboard", name: "Create a dashboard", completed: false },
          { id: "project-analysis", name: "Business data analysis", completed: false },
          { id: "project-report", name: "Insights report", completed: false },
        ],
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
        subTopics: [
          { id: "design-color", name: "Color theory", completed: false },
          { id: "design-typography", name: "Typography", completed: false },
          { id: "design-layout", name: "Layout systems", completed: false },
          { id: "design-spacing", name: "Spacing", completed: false },
          { id: "design-hierarchy", name: "Visual hierarchy", completed: false },
        ],
      },
      {
        id: "ux",
        name: "UX Design",
        description: "User research & usability",
        duration: "7-10 days",
        status: "locked",
        order: 2,
        subTopics: [
          { id: "ux-research", name: "User research", completed: false },
          { id: "ux-personas", name: "User personas", completed: false },
          { id: "ux-journeys", name: "User journeys", completed: false },
          { id: "ux-ia", name: "Information architecture", completed: false },
          { id: "ux-wireframes", name: "Wireframes", completed: false },
        ],
      },
      {
        id: "ui",
        name: "UI Design",
        description: "Visual interface design",
        duration: "7-10 days",
        status: "locked",
        order: 3,
        subTopics: [
          { id: "ui-systems", name: "Design systems", completed: false },
          { id: "ui-components", name: "Components", completed: false },
          { id: "ui-consistency", name: "Consistency", completed: false },
          { id: "ui-accessibility", name: "Accessibility", completed: false },
        ],
      },
      {
        id: "figma",
        name: "Figma",
        description: "Design tool mastery",
        duration: "5-7 days",
        status: "locked",
        order: 4,
        subTopics: [
          { id: "figma-frames", name: "Frames", completed: false },
          { id: "figma-autolayout", name: "Auto layout", completed: false },
          { id: "figma-components", name: "Components", completed: false },
          { id: "figma-prototyping", name: "Prototyping", completed: false },
        ],
      },
      {
        id: "prototyping",
        name: "Prototyping",
        description: "Interactive designs",
        duration: "5-7 days",
        status: "locked",
        order: 5,
        subTopics: [
          { id: "proto-interactions", name: "Interactions", completed: false },
          { id: "proto-animations", name: "Animations", completed: false },
          { id: "proto-testing", name: "User testing", completed: false },
        ],
      },
      {
        id: "portfolio",
        name: "Portfolio",
        description: "Case studies",
        duration: "7-10 days",
        status: "locked",
        order: 6,
        subTopics: [
          { id: "portfolio-cases", name: "Case studies", completed: false },
          { id: "portfolio-presentation", name: "Design presentation", completed: false },
          { id: "portfolio-feedback", name: "Feedback iteration", completed: false },
        ],
      },
    ],
  },
  business: {
    domain: "business",
    domainLabel: "Business",
    skills: [
      {
        id: "fundamentals",
        name: "Business Fundamentals",
        description: "Core business concepts",
        duration: "7-10 days",
        status: "locked",
        order: 1,
        subTopics: [
          { id: "biz-what", name: "What is business", completed: false },
          { id: "biz-models", name: "Types of business models", completed: false },
          { id: "biz-revenue", name: "Revenue models", completed: false },
          { id: "biz-cost", name: "Cost structures", completed: false },
        ],
      },
      {
        id: "marketing",
        name: "Marketing Basics",
        description: "Market research & positioning",
        duration: "7-10 days",
        status: "locked",
        order: 2,
        subTopics: [
          { id: "mkt-research", name: "Market research", completed: false },
          { id: "mkt-audience", name: "Target audience", completed: false },
          { id: "mkt-positioning", name: "Positioning", completed: false },
        ],
      },
      {
        id: "operations",
        name: "Operations",
        description: "Process management",
        duration: "7-10 days",
        status: "locked",
        order: 3,
        subTopics: [
          { id: "ops-process", name: "Process management", completed: false },
          { id: "ops-supply", name: "Supply chain basics", completed: false },
          { id: "ops-quality", name: "Quality control", completed: false },
        ],
      },
      {
        id: "strategy",
        name: "Strategy",
        description: "Business strategy",
        duration: "7-10 days",
        status: "locked",
        order: 4,
        subTopics: [
          { id: "strategy-swot", name: "SWOT analysis", completed: false },
          { id: "strategy-competitive", name: "Competitive analysis", completed: false },
          { id: "strategy-growth", name: "Growth strategies", completed: false },
        ],
      },
      {
        id: "entrepreneurship",
        name: "Entrepreneurship",
        description: "Starting a business",
        duration: "10-14 days",
        status: "locked",
        order: 5,
        subTopics: [
          { id: "entrep-idea", name: "Idea validation", completed: false },
          { id: "entrep-mvp", name: "MVP", completed: false },
          { id: "entrep-scaling", name: "Scaling basics", completed: false },
        ],
      },
      {
        id: "projects",
        name: "Case Studies",
        description: "Real business problems",
        duration: "10-14 days",
        status: "locked",
        order: 6,
        subTopics: [
          { id: "case-analysis", name: "Business case analysis", completed: false },
          { id: "case-presentation", name: "Business presentation", completed: false },
        ],
      },
    ],
  },
  marketing: {
    domain: "marketing",
    domainLabel: "Digital Marketing",
    skills: [
      {
        id: "fundamentals",
        name: "Marketing Fundamentals",
        description: "Core marketing concepts",
        duration: "5-7 days",
        status: "locked",
        order: 1,
        subTopics: [
          { id: "mkt-what", name: "What is digital marketing", completed: false },
          { id: "mkt-funnels", name: "Funnels", completed: false },
          { id: "mkt-journey", name: "Customer journey", completed: false },
        ],
      },
      {
        id: "seo",
        name: "SEO",
        description: "Search engine optimization",
        duration: "10-14 days",
        status: "locked",
        order: 2,
        subTopics: [
          { id: "seo-keywords", name: "Keywords", completed: false },
          { id: "seo-onpage", name: "On-page SEO", completed: false },
          { id: "seo-offpage", name: "Off-page SEO", completed: false },
          { id: "seo-technical", name: "Technical SEO", completed: false },
        ],
      },
      {
        id: "social",
        name: "Social Media Marketing",
        description: "Platform strategies",
        duration: "7-10 days",
        status: "locked",
        order: 3,
        subTopics: [
          { id: "social-platforms", name: "Platforms overview", completed: false },
          { id: "social-content", name: "Content strategy", completed: false },
          { id: "social-analytics", name: "Analytics", completed: false },
        ],
      },
      {
        id: "ads",
        name: "Paid Ads",
        description: "Google & Meta Ads",
        duration: "10-14 days",
        status: "locked",
        order: 4,
        subTopics: [
          { id: "ads-google", name: "Google Ads", completed: false },
          { id: "ads-meta", name: "Meta Ads", completed: false },
          { id: "ads-budgeting", name: "Budgeting", completed: false },
        ],
      },
      {
        id: "content",
        name: "Content Marketing",
        description: "Creating valuable content",
        duration: "7-10 days",
        status: "locked",
        order: 5,
        subTopics: [
          { id: "content-blogging", name: "Blogging", completed: false },
          { id: "content-video", name: "Video marketing", completed: false },
          { id: "content-email", name: "Email marketing", completed: false },
        ],
      },
      {
        id: "analytics",
        name: "Analytics",
        description: "Measuring success",
        duration: "5-7 days",
        status: "locked",
        order: 6,
        subTopics: [
          { id: "analytics-ga", name: "Google Analytics", completed: false },
          { id: "analytics-metrics", name: "Metrics & KPIs", completed: false },
          { id: "analytics-conversion", name: "Conversion tracking", completed: false },
        ],
      },
    ],
  },
  finance: {
    domain: "finance",
    domainLabel: "Finance",
    skills: [
      {
        id: "basics",
        name: "Finance Basics",
        description: "Core finance concepts",
        duration: "7-10 days",
        status: "locked",
        order: 1,
        subTopics: [
          { id: "fin-what", name: "What is finance", completed: false },
          { id: "fin-types", name: "Types of finance", completed: false },
          { id: "fin-terminology", name: "Financial terminology", completed: false },
        ],
      },
      {
        id: "accounting",
        name: "Accounting",
        description: "Financial statements",
        duration: "10-12 days",
        status: "locked",
        order: 2,
        subTopics: [
          { id: "acc-income", name: "Income statement", completed: false },
          { id: "acc-balance", name: "Balance sheet", completed: false },
          { id: "acc-cashflow", name: "Cash flow", completed: false },
        ],
      },
      {
        id: "personal",
        name: "Personal Finance",
        description: "Managing personal money",
        duration: "7-10 days",
        status: "locked",
        order: 3,
        subTopics: [
          { id: "pf-budgeting", name: "Budgeting", completed: false },
          { id: "pf-saving", name: "Saving", completed: false },
          { id: "pf-investing", name: "Investing", completed: false },
        ],
      },
      {
        id: "corporate",
        name: "Corporate Finance",
        description: "Business finance",
        duration: "10-14 days",
        status: "locked",
        order: 4,
        subTopics: [
          { id: "corp-budgeting", name: "Capital budgeting", completed: false },
          { id: "corp-cost", name: "Cost of capital", completed: false },
          { id: "corp-valuation", name: "Valuation basics", completed: false },
        ],
      },
      {
        id: "investment",
        name: "Investment Basics",
        description: "Investment instruments",
        duration: "7-10 days",
        status: "locked",
        order: 5,
        subTopics: [
          { id: "inv-stocks", name: "Stocks", completed: false },
          { id: "inv-mutual", name: "Mutual funds", completed: false },
          { id: "inv-bonds", name: "Bonds", completed: false },
        ],
      },
      {
        id: "risk",
        name: "Risk Management",
        description: "Managing financial risk",
        duration: "7-10 days",
        status: "locked",
        order: 6,
        subTopics: [
          { id: "risk-types", name: "Risk types", completed: false },
          { id: "risk-diversification", name: "Diversification", completed: false },
        ],
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
