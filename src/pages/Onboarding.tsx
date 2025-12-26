import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const domains = [
  { id: "tech", label: "Technology", icon: "💻" },
  { id: "data", label: "Data Science", icon: "📊" },
  { id: "design", label: "Design", icon: "🎨" },
  { id: "business", label: "Business", icon: "💼" },
  { id: "marketing", label: "Marketing", icon: "📣" },
  { id: "finance", label: "Finance", icon: "💰" },
];

const experienceLevels = [
  { id: "student", label: "Student", desc: "Currently studying" },
  { id: "graduate", label: "Fresh Graduate", desc: "0-1 years experience" },
  { id: "professional", label: "Professional", desc: "1+ years experience" },
];

const popularSkills: Record<string, string[]> = {
  tech: ["JavaScript", "Python", "React", "Node.js", "TypeScript", "Git", "SQL", "AWS"],
  data: ["Python", "SQL", "Machine Learning", "Pandas", "Statistics", "TensorFlow", "Power BI", "R"],
  design: ["Figma", "Adobe XD", "Sketch", "UI Design", "UX Research", "Prototyping", "Illustrator", "Photoshop"],
  business: ["Project Management", "Excel", "Communication", "Leadership", "Strategy", "Agile", "Negotiation", "Analytics"],
  marketing: ["SEO", "Content Writing", "Social Media", "Google Analytics", "Email Marketing", "PPC", "Copywriting", "Branding"],
  finance: ["Financial Modeling", "Excel", "Accounting", "Valuation", "Bloomberg", "Risk Analysis", "Investment Analysis", "Python"],
};

const targetRoles: Record<string, string[]> = {
  tech: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps Engineer", "Cloud Architect", "Mobile Developer"],
  data: ["Data Analyst", "Data Scientist", "ML Engineer", "Data Engineer", "Business Analyst", "AI Research Scientist"],
  design: ["UI Designer", "UX Designer", "Product Designer", "Graphic Designer", "Design Lead", "UX Researcher"],
  business: ["Product Manager", "Business Analyst", "Management Consultant", "Operations Manager", "Strategy Analyst", "Project Manager"],
  marketing: ["Digital Marketer", "Content Strategist", "SEO Specialist", "Growth Marketer", "Brand Manager", "Social Media Manager"],
  finance: ["Financial Analyst", "Investment Banker", "Risk Analyst", "Portfolio Manager", "FP&A Analyst", "Quantitative Analyst"],
};

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    domain: "",
    skills: [] as string[],
    targetRole: "",
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Navigate to dashboard
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name.trim().length > 0;
      case 2:
        return formData.experience.length > 0;
      case 3:
        return formData.domain.length > 0;
      case 4:
        return formData.skills.length > 0;
      case 5:
        return formData.targetRole.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
            <span className="text-sm text-muted-foreground">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form card */}
        <motion.div
          className="bg-gradient-card border border-border rounded-2xl p-8 shadow-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold font-heading mb-2">Welcome to SkillPath!</h2>
                <p className="text-muted-foreground mb-6">Let's start with your name.</p>
                <Input
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-lg py-6"
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold font-heading mb-2">What's your experience level?</h2>
                <p className="text-muted-foreground mb-6">This helps us tailor your learning path.</p>
                <div className="space-y-3">
                  {experienceLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setFormData({ ...formData, experience: level.id })}
                      className={`w-full p-4 rounded-xl border text-left transition-all ${
                        formData.experience === level.id
                          ? "border-primary bg-primary/10"
                          : "border-border bg-secondary/50 hover:border-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-foreground">{level.label}</div>
                          <div className="text-sm text-muted-foreground">{level.desc}</div>
                        </div>
                        {formData.experience === level.id && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold font-heading mb-2">Choose your domain</h2>
                <p className="text-muted-foreground mb-6">Select the field you're interested in.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {domains.map((domain) => (
                    <button
                      key={domain.id}
                      onClick={() => setFormData({ ...formData, domain: domain.id, skills: [], targetRole: "" })}
                      className={`p-4 rounded-xl border text-center transition-all ${
                        formData.domain === domain.id
                          ? "border-primary bg-primary/10"
                          : "border-border bg-secondary/50 hover:border-muted-foreground"
                      }`}
                    >
                      <div className="text-2xl mb-2">{domain.icon}</div>
                      <div className="font-medium text-foreground text-sm">{domain.label}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold font-heading mb-2">What skills do you have?</h2>
                <p className="text-muted-foreground mb-6">Select all that apply.</p>
                <div className="flex flex-wrap gap-2">
                  {(popularSkills[formData.domain] || popularSkills.tech).map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-2 rounded-full border transition-all ${
                        formData.skills.includes(skill)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-secondary/50 hover:border-muted-foreground text-foreground"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Selected: {formData.skills.length} skills
                </p>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold font-heading mb-2">What's your target role?</h2>
                <p className="text-muted-foreground mb-6">This is the job you're aiming for.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(targetRoles[formData.domain] || targetRoles.tech).map((role) => (
                    <button
                      key={role}
                      onClick={() => setFormData({ ...formData, targetRole: role })}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        formData.targetRole === role
                          ? "border-primary bg-primary/10"
                          : "border-border bg-secondary/50 hover:border-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">{role}</span>
                        {formData.targetRole === role && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 1}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <Button
              variant="hero"
              onClick={handleNext}
              disabled={!canProceed()}
              className="gap-2"
            >
              {step === totalSteps ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate My SkillPath
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingPage;
