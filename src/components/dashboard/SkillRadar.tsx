import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: "strong" | "weak" | "missing";
  importance: "core" | "supporting" | "optional";
}

interface SkillRadarProps {
  skills: Skill[];
}

const SkillRadar = ({ skills }: SkillRadarProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "strong":
        return "bg-emerald-500";
      case "weak":
        return "bg-amber-500";
      case "missing":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case "core":
        return "text-primary border-primary/30 bg-primary/10";
      case "supporting":
        return "text-accent border-accent/30 bg-accent/10";
      case "optional":
        return "text-muted-foreground border-border bg-secondary";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-3">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${getLevelColor(skill.level)}`} />
            <span className="font-medium text-foreground">{skill.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full border ${getImportanceBadge(skill.importance)}`}>
              {skill.importance}
            </span>
            <span className={`text-xs capitalize ${
              skill.level === "strong" ? "text-emerald-500" :
              skill.level === "weak" ? "text-amber-500" : "text-destructive"
            }`}>
              {skill.level}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillRadar;
