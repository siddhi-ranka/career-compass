import { motion } from "framer-motion";
import { Check, Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RoadmapSkill } from "@/data/roadmaps";

interface HorizontalRoadmapProps {
  skills: RoadmapSkill[];
  domainLabel: string;
  onMarkComplete: (skillId: string) => void;
}

const HorizontalRoadmap = ({ skills, domainLabel, onMarkComplete }: HorizontalRoadmapProps) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "completed":
        return {
          circle: "bg-emerald-500 border-emerald-500 text-background",
          connector: "bg-emerald-500",
          card: "border-emerald-500/30 bg-emerald-500/5",
        };
      case "current":
        return {
          circle: "bg-primary border-primary text-primary-foreground animate-pulse",
          connector: "bg-border",
          card: "border-primary/50 bg-primary/5 shadow-glow",
        };
      case "locked":
        return {
          circle: "bg-secondary border-border text-muted-foreground",
          connector: "bg-border",
          card: "border-border bg-secondary/30 opacity-60",
        };
      default:
        return {
          circle: "",
          connector: "",
          card: "",
        };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="w-5 h-5" />;
      case "current":
        return <Clock className="w-5 h-5" />;
      case "locked":
        return <Lock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Domain label */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold font-heading text-foreground">{domainLabel} Roadmap</h3>
        <p className="text-sm text-muted-foreground">Complete skills from left to right</p>
      </div>

      {/* Horizontal scrollable roadmap */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4">
        <div className="flex items-start gap-3 min-w-max">
          {skills.map((skill, index) => {
            const styles = getStatusStyles(skill.status);
            const isLast = index === skills.length - 1;

            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start"
              >
                {/* Skill card with circle */}
                <div className="flex flex-col items-center w-40">
                  {/* Circle */}
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-3 transition-all ${styles.circle}`}
                  >
                    {getStatusIcon(skill.status)}
                  </div>

                  {/* Card */}
                  <div
                    className={`w-full p-4 rounded-xl border transition-all ${styles.card}`}
                  >
                    <h4 className="font-semibold font-heading text-foreground text-center mb-1">
                      {skill.name}
                    </h4>
                    <p className="text-xs text-muted-foreground text-center mb-2">
                      {skill.description}
                    </p>
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-3">
                      <Clock className="w-3 h-3" />
                      <span>{skill.duration}</span>
                    </div>

                    {skill.status === "current" && (
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full text-xs"
                        onClick={() => onMarkComplete(skill.id)}
                      >
                        Mark Complete
                      </Button>
                    )}

                    {skill.status === "completed" && (
                      <div className="flex items-center justify-center gap-1 text-xs text-emerald-500">
                        <Check className="w-3 h-3" />
                        <span>Completed</span>
                      </div>
                    )}

                    {skill.status === "locked" && (
                      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                        <Lock className="w-3 h-3" />
                        <span>Locked</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Connector line */}
                {!isLast && (
                  <div className="flex items-center h-12 px-2">
                    <div className={`w-8 h-0.5 ${styles.connector}`} />
                    <div className={`w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-border`} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HorizontalRoadmap;
