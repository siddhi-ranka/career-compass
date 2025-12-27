import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Clock, 
  Flame, 
  Target,
  Trophy,
  Star,
  Award
} from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import HorizontalRoadmap from "@/components/dashboard/HorizontalRoadmap";
import MentorChat from "@/components/dashboard/MentorChat";
import { domainRoadmaps, initializeRoadmap, type RoadmapSkill } from "@/data/roadmaps";
import { toast } from "sonner";

const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [userData, setUserData] = useState<{
    name: string;
    domain: string;
    skills: string[];
    targetRole: string;
    noSkills: boolean;
  } | null>(null);

  const [roadmapSkills, setRoadmapSkills] = useState<RoadmapSkill[]>([]);
  const [completedCount, setCompletedCount] = useState(0);

  // Refs for scrolling
  const overviewRef = useRef<HTMLDivElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);
  const mentorRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load user data from localStorage
    const onboardingData = localStorage.getItem("skillpath_onboarding");
    if (onboardingData) {
      const data = JSON.parse(onboardingData);
      setUserData(data);
      
      // Load saved roadmap progress or initialize new
      const savedProgress = localStorage.getItem("skillpath_roadmap_progress");
      if (savedProgress) {
        setRoadmapSkills(JSON.parse(savedProgress));
        const completed = JSON.parse(savedProgress).filter((s: RoadmapSkill) => s.status === "completed").length;
        setCompletedCount(completed);
      } else {
        const initializedRoadmap = initializeRoadmap(
          data.domain,
          data.noSkills ? [] : data.skills
        );
        setRoadmapSkills(initializedRoadmap);
        const completed = initializedRoadmap.filter(s => s.status === "completed").length;
        setCompletedCount(completed);
      }
    } else {
      const defaultRoadmap = initializeRoadmap("tech", []);
      setRoadmapSkills(defaultRoadmap);
    }
  }, []);

  // Save progress whenever roadmapSkills changes
  useEffect(() => {
    if (roadmapSkills.length > 0) {
      localStorage.setItem("skillpath_roadmap_progress", JSON.stringify(roadmapSkills));
    }
  }, [roadmapSkills]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      overview: overviewRef,
      roadmap: roadmapRef,
      mentor: mentorRef,
      achievements: achievementsRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubTopicToggle = (skillId: string, subTopicId: string) => {
    setRoadmapSkills((prev) => {
      return prev.map((skill) => {
        if (skill.id === skillId) {
          const updatedSubTopics = skill.subTopics.map((st) =>
            st.id === subTopicId ? { ...st, completed: !st.completed } : st
          );
          return { ...skill, subTopics: updatedSubTopics };
        }
        return skill;
      });
    });
  };

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

  // Calculate achievements
  const achievements = [
    { 
      id: "first-step", 
      name: "First Step", 
      description: "Started your learning journey", 
      icon: Star, 
      unlocked: true,
      color: "text-yellow-500"
    },
    { 
      id: "skill-complete", 
      name: "Skill Master", 
      description: "Completed your first skill", 
      icon: Award, 
      unlocked: completedCount >= 1,
      color: "text-emerald-500"
    },
    { 
      id: "halfway", 
      name: "Halfway There", 
      description: "Complete 50% of your roadmap", 
      icon: Trophy, 
      unlocked: progressPercentage >= 50,
      color: "text-primary"
    },
    { 
      id: "job-ready", 
      name: "Job Ready", 
      description: "Complete your entire roadmap", 
      icon: Target, 
      unlocked: progressPercentage === 100,
      color: "text-accent"
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-foreground">
              Welcome{userData?.name ? `, ${userData.name.split(' ')[0]}` : ''}! 👋
            </h1>
            <p className="text-muted-foreground">Your {domainLabel} journey</p>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Overview Section */}
          <div ref={overviewRef} id="overview">
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
              className="bg-gradient-card border border-border rounded-2xl p-6 mt-6"
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
          </div>

          {/* Roadmap Section */}
          <motion.div
            ref={roadmapRef}
            id="roadmap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-gradient-card border border-border rounded-2xl p-6"
          >
            <HorizontalRoadmap
              skills={roadmapSkills}
              domainLabel={domainLabel}
              onMarkComplete={handleMarkComplete}
              onSubTopicToggle={handleSubTopicToggle}
            />
          </motion.div>

          {/* AI Mentor Section */}
          <motion.div
            ref={mentorRef}
            id="mentor"
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

          {/* Achievements Section */}
          <motion.div
            ref={achievementsRef}
            id="achievements"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-gradient-card border border-border rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold font-heading text-foreground mb-4">Achievements</h2>
            <p className="text-sm text-muted-foreground mb-6">Unlock achievements as you progress through your learning journey</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border transition-all ${
                    achievement.unlocked
                      ? "bg-primary/5 border-primary/30"
                      : "bg-secondary/30 border-border opacity-50"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    achievement.unlocked ? "bg-primary/10" : "bg-secondary"
                  }`}>
                    <achievement.icon className={`w-6 h-6 ${achievement.unlocked ? achievement.color : "text-muted-foreground"}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{achievement.name}</h3>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  {achievement.unlocked && (
                    <span className="inline-block mt-2 text-xs text-primary font-medium">✓ Unlocked</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
