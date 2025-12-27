import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Map, 
  MessageCircle, 
  Trophy, 
  Sparkles,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", section: "overview" },
  { icon: Map, label: "My Roadmap", section: "roadmap" },
  { icon: MessageCircle, label: "AI Mentor", section: "mentor" },
  { icon: Trophy, label: "Achievements", section: "achievements" },
];

const DashboardSidebar = ({ activeSection, onSectionChange }: DashboardSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 sticky top-0 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-xl font-bold font-heading text-sidebar-foreground">SkillPath</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = activeSection === item.section;
          return (
            <button
              key={item.label}
              onClick={() => onSectionChange(item.section)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-sidebar-primary" : ""}`} />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <button 
          onClick={() => {
            localStorage.removeItem("skillpath_onboarding");
            window.location.href = "/";
          }}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-sidebar-accent border border-sidebar-border flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </motion.aside>
  );
};

export default DashboardSidebar;
