import { motion } from "framer-motion";
import { UserPlus, Search, Map, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Tell us about your current skills, experience level, and career aspirations."
  },
  {
    number: "02",
    icon: Search,
    title: "AI Analyzes Your Gap",
    description: "Our AI compares your profile against real job requirements to identify skill gaps."
  },
  {
    number: "03",
    icon: Map,
    title: "Get Your Roadmap",
    description: "Receive a personalized, time-bound learning path with curated resources."
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Track & Achieve",
    description: "Follow your roadmap, complete projects, and watch your readiness score grow."
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-secondary/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4">
            How <span className="text-gradient">SkillPath</span> Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Four simple steps to transform your career trajectory.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Step number with icon */}
                <div className="relative inline-flex mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-card border border-border flex items-center justify-center relative z-10">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-semibold font-heading mb-2 text-foreground">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
