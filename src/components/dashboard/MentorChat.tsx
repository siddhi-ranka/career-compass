import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MentorChatProps {
  domain?: string;
  currentSkill?: string;
  completedSkills?: string[];
  progressPercentage?: number;
  targetRole?: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const MentorChat = ({ domain, currentSkill, completedSkills = [], progressPercentage = 0, targetRole }: MentorChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hi there! 👋 I'm your AI career mentor for ${targetRole || 'your journey'}. ${currentSkill ? `I see you're working on ${currentSkill} - great choice!` : "Ready to start learning?"} Ask me anything about your roadmap or career!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getContextualResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes("next") || lowerMsg.includes("learn")) {
      return currentSkill 
        ? `Focus on completing ${currentSkill} first. It's fundamental for ${targetRole || 'your career'}. Once done, the next skill will unlock automatically!`
        : "Start with the first skill in your roadmap - it builds the foundation for everything else.";
    }
    
    if (lowerMsg.includes("ready") || lowerMsg.includes("job")) {
      return progressPercentage < 30
        ? `You're ${progressPercentage}% ready. Keep going! Complete more skills to boost your readiness for ${targetRole || 'jobs'}.`
        : progressPercentage < 70
          ? `You're ${progressPercentage}% ready - good progress! Focus on ${currentSkill || 'your current skill'} to level up.`
          : `Great progress! At ${progressPercentage}%, you're almost job-ready for ${targetRole || 'your target role'}!`;
    }
    
    if (lowerMsg.includes("explain") || lowerMsg.includes("what is")) {
      return currentSkill
        ? `${currentSkill} is essential for ${targetRole || 'your career'}. Focus on understanding core concepts first, then practice with small projects.`
        : "Select a skill from your roadmap and I'll help explain it in simple terms!";
    }

    return `Based on your progress (${progressPercentage}% complete), I recommend focusing on ${currentSkill || 'your next skill'}. ${completedSkills.length > 0 ? `You've already mastered ${completedSkills.slice(-2).join(' and ')} - great work!` : 'Every expert was once a beginner. Start today!'}`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    setIsTyping(true);

    try {
      const backendUrl = (import.meta.env.VITE_BACKEND_URL as string) || "http://localhost:4000";
      const resp = await fetch(`${backendUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: domain || "general", question: userInput }),
      });
      const json = await resp.json();

      let content = "";
      if (json.success && json.data) {
        if (json.data.answer) content = json.data.answer;
        else content = typeof json.data === "string" ? json.data : JSON.stringify(json.data);
      } else if (json.data && typeof json.data === "string") {
        content = json.data;
      } else if (json.error) {
        content = `Error: ${json.error}`;
      } else {
        content = getContextualResponse(userInput); // fallback
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I'm having trouble reaching the AI service right now. Please try again later.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[400px] bg-gradient-card border border-border rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold font-heading text-foreground">AI Career Mentor</h3>
          <p className="text-xs text-muted-foreground">Ask me about your roadmap</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${message.role === "user" ? "bg-accent/20" : "bg-primary/20"}`}>
                {message.role === "user" ? <User className="w-4 h-4 text-accent" /> : <Bot className="w-4 h-4 text-primary" />}
              </div>
              <div className={`max-w-[80%] px-4 py-3 rounded-xl ${message.role === "user" ? "bg-accent/10 border border-accent/20" : "bg-secondary/50 border border-border"}`}>
                <p className="text-sm text-foreground leading-relaxed">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-secondary/50 border border-border px-4 py-3 rounded-xl">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1"
          />
          <Button variant="default" size="icon" onClick={handleSend} disabled={!input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MentorChat;
