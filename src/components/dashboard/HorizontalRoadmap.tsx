import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, Lock, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { RoadmapSkill, SubTopic } from "@/data/roadmaps";

interface HorizontalRoadmapProps {
  skills: RoadmapSkill[];
  domainLabel: string;
  onMarkComplete: (skillId: string) => void;
  onSubTopicToggle: (skillId: string, subTopicId: string) => void;
}

const HorizontalRoadmap = ({ skills, domainLabel, onMarkComplete, onSubTopicToggle }: HorizontalRoadmapProps) => {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

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

  const handleSkillClick = (skillId: string, status: string) => {
    if (status === "locked") return;
    setExpandedSkill(expandedSkill === skillId ? null : skillId);
  };

  const getCompletedSubTopics = (skill: RoadmapSkill) => {
    return skill.subTopics.filter(st => st.completed).length;
  };

  return (
    <div className="w-full">
      {/* Domain label */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold font-heading text-foreground">{domainLabel} Roadmap</h3>
        <p className="text-sm text-muted-foreground">Click on a skill to see what you'll learn</p>
      </div>

      {/* Horizontal scrollable roadmap */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4">
        <div className="flex items-start gap-3 min-w-max">
          {skills.map((skill, index) => {
            const styles = getStatusStyles(skill.status);
            const isLast = index === skills.length - 1;
            const isExpanded = expandedSkill === skill.id;
            const completedSubTopics = getCompletedSubTopics(skill);
            const totalSubTopics = skill.subTopics.length;

            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start"
              >
                {/* Skill card with circle */}
                <div className="flex flex-col items-center w-44">
                  {/* Circle */}
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-3 transition-all ${styles.circle}`}
                  >
                    {getStatusIcon(skill.status)}
                  </div>

                  {/* Card */}
                  <div
                    onClick={() => handleSkillClick(skill.id, skill.status)}
                    className={`w-full p-4 rounded-xl border transition-all cursor-pointer hover:scale-[1.02] ${styles.card} ${skill.status === "locked" ? "cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold font-heading text-foreground">
                        {skill.name}
                      </h4>
                      {skill.status !== "locked" && (
                        isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {skill.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{skill.duration}</span>
                      </div>
                      {skill.status !== "locked" && (
                        <span className="text-primary font-medium">
                          {completedSubTopics}/{totalSubTopics}
                        </span>
                      )}
                    </div>

                    {skill.status === "current" && completedSubTopics === totalSubTopics && (
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          onMarkComplete(skill.id);
                        }}
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Mark Complete
                      </Button>
                    )}

                    {skill.status === "current" && completedSubTopics < totalSubTopics && (
                      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${(completedSubTopics / totalSubTopics) * 100}%` }}
                        />
                      </div>
                    )}

                    {skill.status === "completed" && (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-center gap-1 text-xs text-emerald-500">
                          <Check className="w-3 h-3" />
                          <span>Completed</span>
                        </div>
                        {(
                          // @ts-ignore - analysis is optional and added at runtime
                          skill.analysis
                        ) && (
                          <div className="mt-2 text-xs text-muted-foreground bg-emerald-50 rounded-md p-2">
                            {/* @ts-ignore */}
                            <div><strong>Score:</strong> {(skill.analysis as any).score ?? 'N/A'}</div>
                            {/* @ts-ignore */}
                            <div className="truncate"><strong>Feedback:</strong> {(skill.analysis as any).feedback ?? ''}</div>
                          </div>
                        )}
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

      {/* Expanded sub-topics */}
      <AnimatePresence>
        {expandedSkill && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 overflow-hidden"
          >
            {skills
              .filter((s) => s.id === expandedSkill)
              .map((skill) => (
                <div key={skill.id} className="bg-secondary/30 border border-border rounded-xl p-6">
                  <h4 className="text-lg font-semibold font-heading text-foreground mb-2">
                    What you'll learn in {skill.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete each topic to master this skill. Check off items as you learn them.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {skill.subTopics.map((subTopic) => (
                      <div
                        key={subTopic.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                          subTopic.completed
                            ? "bg-emerald-500/10 border-emerald-500/30"
                            : "bg-background border-border hover:border-primary/30"
                        }`}
                      >
                        <Checkbox
                          id={subTopic.id}
                          checked={subTopic.completed}
                          onCheckedChange={() => onSubTopicToggle(skill.id, subTopic.id)}
                          disabled={skill.status === "locked"}
                          className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                        />
                        <label
                          htmlFor={subTopic.id}
                          className={`text-sm cursor-pointer flex-1 ${
                            subTopic.completed ? "text-emerald-600 line-through" : "text-foreground"
                          }`}
                        >
                          {subTopic.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HorizontalRoadmap;
