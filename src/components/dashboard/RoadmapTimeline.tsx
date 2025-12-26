import { motion } from "framer-motion";
import { Check, Clock, Lock, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: "completed" | "current" | "locked";
  skills: string[];
  resources?: { name: string; url: string }[];
}

interface RoadmapTimelineProps {
  steps: RoadmapStep[];
}

const RoadmapTimeline = ({ steps }: RoadmapTimelineProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="w-4 h-4" />;
      case "current":
        return <Clock className="w-4 h-4" />;
      case "locked":
        return <Lock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500 text-background border-emerald-500";
      case "current":
        return "bg-primary text-primary-foreground border-primary animate-pulse-ring";
      case "locked":
        return "bg-secondary text-muted-foreground border-border";
      default:
        return "";
    }
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative pl-16"
          >
            {/* Status icon */}
            <div
              className={`absolute left-3 w-7 h-7 rounded-full border-2 flex items-center justify-center ${getStatusStyles(step.status)}`}
            >
              {getStatusIcon(step.status)}
            </div>

            {/* Card */}
            <div
              className={`p-5 rounded-xl border transition-all ${
                step.status === "current"
                  ? "bg-gradient-card border-primary/50 shadow-glow"
                  : step.status === "completed"
                  ? "bg-secondary/30 border-border"
                  : "bg-secondary/20 border-border opacity-60"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold font-heading text-foreground mb-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                  {step.duration}
                </span>
              </div>

              {/* Skills tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {step.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Resources */}
              {step.status !== "locked" && step.resources && (
                <div className="flex flex-wrap gap-2">
                  {step.resources.map((resource) => (
                    <Button
                      key={resource.name}
                      variant="ghost"
                      size="sm"
                      className="text-xs gap-1"
                    >
                      <BookOpen className="w-3 h-3" />
                      {resource.name}
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapTimeline;
