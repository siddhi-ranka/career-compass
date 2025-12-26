import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Clock, 
  Flame, 
  Target,
  Zap
} from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import HorizontalRoadmap from "@/components/dashboard/HorizontalRoadmap";
import MentorChat from "@/components/dashboard/MentorChat";
import { Button } from "@/components/ui/button";
import { domainRoadmaps, initializeRoadmap, type RoadmapSkill } from "@/data/roadmaps";
import { toast } from "sonner";

const DashboardPage = () => {
  const [userData, setUserData] = useState<{
    name: string;
    domain: string;
    skills: string[];
    targetRole: string;
    noSkills: boolean;
  } | null>(null);

  const [roadmapSkills, setRoadmapSkills] = useState<RoadmapSkill[]>([]);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    // Load user data from localStorage
    const onboardingData = localStorage.getItem("skillpath_onboarding");
    if (onboardingData) {
      const data = JSON.parse(onboardingData);
      setUserData(data);
      
      // Initialize roadmap based on user's domain and skills
      const initializedRoadmap = initializeRoadmap(
        data.domain,
        data.noSkills ? [] : data.skills
      );
      setRoadmapSkills(initializedRoadmap);
      
      // Count completed skills
      const completed = initializedRoadmap.filter(s => s.status === "completed").length;
      setCompletedCount(completed);
    } else {
      // Default fallback data
      const defaultRoadmap = initializeRoadmap("tech", []);
      setRoadmapSkills(defaultRoadmap);
    }
  }, []);

  const handleMarkComplete = (skillId: string) => {
    setRoadmapSkills((prev) => {
      const updatedSkills = prev.map((skill, index) => {
        if (skill.id === skillId) {
          return { ...skill, status: "completed" as const };
        }
        return skill;
      });

      // Find the next locked skill and make it current
      const completedIndex = updatedSkills.findIndex(s => s.id === skillId);
      if (completedIndex < updatedSkills.length - 1) {
        updatedSkills[completedIndex + 1] = {
          ...updatedSkills[completedIndex + 1],
          status: "current" as const,
        };
      }

      return updatedSkills;
    });

    setCompletedCount((prev) => prev + 1);
    toast.success("Skill completed! Keep going! 🎉");
  };

  const totalSkills = roadmapSkills.length;
  const progressPercentage = totalSkills > 0 ? Math.round((completedCount / totalSkills) * 100) : 0;
  const currentSkill = roadmapSkills.find(s => s.status === "current");
  const remainingSkills = totalSkills - completedCount;

  // Calculate estimated time remaining
  const estimatedDays = roadmapSkills
    .filter(s => s.status !== "completed")
    .reduce((acc, skill) => {
      const match = skill.duration.match(/(\d+)/);
      return acc + (match ? parseInt(match[1]) : 10);
    }, 0);

  const domain = userData?.domain || "tech";
  const domainLabel = domainRoadmaps[domain]?.domainLabel || "Web Development";

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-heading text-foreground">
                Welcome{userData?.name ? `, ${userData.name.split(' ')[0]}` : ''}! 👋
              </h1>
              <p className="text-muted-foreground">Your {domainLabel} journey</p>
            </div>
            <Button variant="default" className="gap-2">
              <Zap className="w-4 h-4" />
              Quick Actions
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Job Readiness", value: `${progressPercentage}%`, icon: Target, color: "text-primary", trend: progressPercentage > 0 ? `+${progressPercentage}%` : "Start learning" },
              { label: "Skills Completed", value: `${completedCount}/${totalSkills}`, icon: TrendingUp, color: "text-emerald-500", trend: completedCount > 0 ? `+${completedCount}` : "Keep going" },
              { label: "Remaining", value: `${remainingSkills} skills`, icon: Clock, color: "text-accent", trend: `~${estimatedDays} days` },
              { label: "Learning Streak", value: "1 day", icon: Flame, color: "text-orange-500", trend: "Just started" },
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

          {/* Progress Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-gradient-card border border-border rounded-2xl p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-semibold font-heading text-foreground">Your Progress</h2>
                <p className="text-sm text-muted-foreground">
                  {progressPercentage === 0 
                    ? "Start your first skill to begin your journey!"
                    : progressPercentage < 50 
                      ? `You're ${progressPercentage}% ready for ${userData?.targetRole || 'your target role'}. Keep learning!`
                      : progressPercentage < 100
                        ? `Almost there! You're ${progressPercentage}% ready. Complete remaining skills to unlock opportunities.`
                        : "Congratulations! You've completed all skills. You're ready to apply!"
                  }
                </p>
              </div>
              {currentSkill && (
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Currently learning</p>
                  <p className="font-semibold text-primary">{currentSkill.name}</p>
                </div>
              )}
            </div>
            
            {/* Progress bar */}
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Job Ready</span>
            </div>
          </motion.div>

          {/* Horizontal Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-gradient-card border border-border rounded-2xl p-6"
          >
            <HorizontalRoadmap
              skills={roadmapSkills}
              domainLabel={domainLabel}
              onMarkComplete={handleMarkComplete}
            />
          </motion.div>

          {/* AI Mentor Chat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <MentorChat
              domain={domain}
              currentSkill={currentSkill?.name}
              completedSkills={roadmapSkills.filter(s => s.status === "completed").map(s => s.name)}
              progressPercentage={progressPercentage}
              targetRole={userData?.targetRole}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
