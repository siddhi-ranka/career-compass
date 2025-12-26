import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Clock, 
  Flame, 
  Target,
  ChevronRight,
  BookOpen,
  Zap
} from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import SkillGauge from "@/components/dashboard/SkillGauge";
import SkillRadar from "@/components/dashboard/SkillRadar";
import RoadmapTimeline from "@/components/dashboard/RoadmapTimeline";
import MentorChat from "@/components/dashboard/MentorChat";
import { Button } from "@/components/ui/button";

const skills = [
  { name: "JavaScript", level: "strong" as const, importance: "core" as const },
  { name: "React", level: "weak" as const, importance: "core" as const },
  { name: "TypeScript", level: "missing" as const, importance: "core" as const },
  { name: "Node.js", level: "weak" as const, importance: "supporting" as const },
  { name: "Git", level: "strong" as const, importance: "supporting" as const },
  { name: "Testing", level: "missing" as const, importance: "supporting" as const },
  { name: "GraphQL", level: "missing" as const, importance: "optional" as const },
  { name: "Docker", level: "missing" as const, importance: "optional" as const },
];

const roadmapSteps = [
  {
    id: "1",
    title: "React Fundamentals Mastery",
    description: "Deep dive into hooks, context, and component patterns",
    duration: "2 weeks",
    status: "completed" as const,
    skills: ["React", "Hooks", "Context API"],
    resources: [
      { name: "React Docs", url: "#" },
      { name: "Udemy Course", url: "#" },
    ],
  },
  {
    id: "2",
    title: "TypeScript Essentials",
    description: "Learn type safety and advanced TypeScript patterns",
    duration: "2 weeks",
    status: "current" as const,
    skills: ["TypeScript", "Type Safety", "Generics"],
    resources: [
      { name: "TS Handbook", url: "#" },
      { name: "Exercises", url: "#" },
    ],
  },
  {
    id: "3",
    title: "Testing & Quality",
    description: "Master Jest, React Testing Library, and E2E testing",
    duration: "2 weeks",
    status: "locked" as const,
    skills: ["Jest", "RTL", "Cypress"],
  },
  {
    id: "4",
    title: "Advanced State Management",
    description: "Redux Toolkit, Zustand, and server state with TanStack Query",
    duration: "2 weeks",
    status: "locked" as const,
    skills: ["Redux", "Zustand", "TanStack Query"],
  },
];

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-heading text-foreground">Welcome back, Alex! 👋</h1>
              <p className="text-muted-foreground">Here's your career progress overview</p>
            </div>
            <Button variant="default" className="gap-2">
              <Zap className="w-4 h-4" />
              Quick Actions
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Job Readiness", value: "38%", icon: Target, color: "text-primary", trend: "+5%" },
              { label: "Skills Learned", value: "12/28", icon: TrendingUp, color: "text-emerald-500", trend: "+2" },
              { label: "Learning Streak", value: "7 days", icon: Flame, color: "text-accent", trend: "Best: 14" },
              { label: "Time Invested", value: "24h", icon: Clock, color: "text-violet-500", trend: "This week" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gradient-card border border-border rounded-xl p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                    {stat.trend}
                  </span>
                </div>
                <div className="text-2xl font-bold font-heading text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Skill Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="lg:col-span-2 bg-gradient-card border border-border rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold font-heading text-foreground">Skill Gap Analysis</h2>
                  <p className="text-sm text-muted-foreground">Frontend Developer Readiness</p>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  View all <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                {/* Gauges */}
                <div className="flex justify-center gap-6">
                  <SkillGauge percentage={38} label="Overall" color="primary" />
                  <SkillGauge percentage={62} label="Core Skills" color="accent" />
                </div>

                {/* Skills list */}
                <div className="flex-1">
                  <SkillRadar skills={skills} />
                </div>
              </div>
            </motion.div>

            {/* Right column - Current Focus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-gradient-card border border-border rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold font-heading text-foreground">Current Focus</h2>
                  <p className="text-sm text-muted-foreground">TypeScript Essentials</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground font-medium">45%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "45%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">Up next in your roadmap:</p>
                  <div className="space-y-2">
                    {["Type Generics", "Utility Types", "Declaration Files"].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="hero" className="w-full mt-4">
                  Continue Learning
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Bottom section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Roadmap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-gradient-card border border-border rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold font-heading text-foreground">Your Roadmap</h2>
                <Button variant="ghost" size="sm" className="gap-1">
                  Full view <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <RoadmapTimeline steps={roadmapSteps} />
            </motion.div>

            {/* AI Mentor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <MentorChat />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
