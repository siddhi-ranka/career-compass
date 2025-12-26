import { motion } from "framer-motion";
import { 
  BarChart3, 
  BookOpen, 
  BrainCircuit, 
  FileText, 
  Rocket, 
  Trophy,
  ChevronRight
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Skill Gap Analysis",
    description: "Our AI analyzes job requirements and compares them with your current skills to identify exactly what you need to learn.",
    gradient: "from-primary to-cyan-400"
  },
  {
    icon: Rocket,
    title: "Personalized Roadmaps",
    description: "Get a week-by-week learning plan tailored to your pace, schedule, and career goals.",
    gradient: "from-accent to-orange-400"
  },
  {
    icon: BookOpen,
    title: "Curated Resources",
    description: "Access hand-picked courses, tutorials, and documentation filtered by relevance and quality.",
    gradient: "from-violet-500 to-purple-400"
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your learning journey with visual dashboards and milestone celebrations.",
    gradient: "from-emerald-500 to-green-400"
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Build a job-ready resume with AI-suggested skills and project descriptions.",
    gradient: "from-pink-500 to-rose-400"
  },
  {
    icon: Trophy,
    title: "Gamified Learning",
    description: "Earn badges, maintain streaks, and unlock achievements as you progress.",
    gradient: "from-amber-500 to-yellow-400"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4">
            Everything You Need to{" "}
            <span className="text-gradient">Level Up</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete toolkit designed to transform career uncertainty into confident action.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10"
                style={{ backgroundImage: `linear-gradient(135deg, hsl(var(--primary) / 0.2), transparent)` }}
              />
              
              <div className="h-full bg-gradient-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-background" />
                </div>
                
                <h3 className="text-xl font-semibold font-heading mb-2 text-foreground">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>

                <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
