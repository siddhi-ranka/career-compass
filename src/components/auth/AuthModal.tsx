import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, Mail, User, Lock, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup";
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
}

const AuthModal = ({ isOpen, onClose, initialMode }: AuthModalProps) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">(() => initialMode ?? "signup");

  useEffect(() => {
    // When modal opens, respect the requested initial mode (signin/signup)
    if (isOpen && initialMode) setMode(initialMode);
  }, [isOpen, initialMode]);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (mode === "signup") {
      if (!formData.username.trim()) {
        newErrors.username = "Username is required";
      } else if (formData.username.trim().length < 3) {
        newErrors.username = "Username must be at least 3 characters";
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (formData.email.length < 13) {
      newErrors.email = "Email must be at least 13 characters";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const password = formData.password || "";
    const passwordRegex = /(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])/; // letter, number, special
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 5) {
      newErrors.password = "Password must be at least 5 characters";
    } else if (!passwordRegex.test(password)) {
      newErrors.password = "Password must include a letter, a number, and a special character (e.g., @)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (mode === "signup") {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

        const displayName = formData.username.trim() || userCredential.user.displayName || "User";

        // Fire-and-forget: update profile and persist to Firestore without blocking the main flow
        (async () => {
          try {
            if (formData.username.trim()) {
              await updateProfile(userCredential.user, { displayName: formData.username.trim() });
            }
          } catch (e) {
            console.error("Profile update error", e);
          }

          try {
            await setDoc(doc(db, "users", userCredential.user.uid), {
              uid: userCredential.user.uid,
              displayName,
              email: userCredential.user.email,
              createdAt: serverTimestamp(),
            }, { merge: true });
          } catch (e) {
            console.error('Firestore user write error', e);
          }
        })();

        toast.success("Account created successfully!");
        localStorage.setItem("skillpath_user", JSON.stringify({
          username: displayName,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        }));
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        toast.success("Welcome back!");
        localStorage.setItem("skillpath_user", JSON.stringify({
          username: userCredential.user.displayName || formData.username || "User",
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        }));
      }

      onClose();
      navigate("/onboarding");
    } catch (error: any) {
      console.error("Auth error:", error);
      const code = error?.code || "";

      // Helpful message when Firebase API key is not configured correctly
      const msg = (error?.message || "").toLowerCase();
      if (msg.includes("api key") || msg.includes("api-key") || msg.includes("invalid api key")) {
        toast.error("Firebase API key is invalid or missing. Please set VITE_FIREBASE_API_KEY in your .env and restart the dev server.");
      } else if (code === "auth/email-already-in-use") {
        toast.error("Email already in use.");
      } else if (code === "auth/wrong-password" || code === "auth/user-not-found") {
        toast.error("Invalid email or password.");
      } else if (code === "auth/weak-password") {
        toast.error("Password is too weak — it must be at least 5 characters and include a letter, a number, and a special character.");
      } else {
        toast.error(error?.message || "Authentication error. Please try again.");
      }
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  };

  const isFormValid = () => {
    const password = formData.password || "";
    const passwordRegex = /(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])/;

    if (mode === "signup") {
      return (
        formData.username.trim().length >= 3 &&
        formData.email.length >= 13 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
        password.length >= 5 &&
        passwordRegex.test(password)
      );
    }
    return (
      formData.email.length >= 13 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      password.length >= 5 &&
      passwordRegex.test(password)
    );
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md bg-gradient-card border border-border rounded-2xl shadow-elevated overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative px-6 pt-6 pb-4 border-b border-border">
            <button
              onClick={onClose}
              className="absolute left-4 top-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back</span>
            </button>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold font-heading text-foreground">
              {mode === "signup" ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === "signup"
                ? "Start your career journey today"
                : "Continue your learning path"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className={`pl-11 ${errors.username ? "border-destructive" : ""}`}
                  />
                </div>
                {errors.username && (
                  <p className="text-sm text-destructive mt-1">{errors.username}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`pl-11 ${errors.email ? "border-destructive" : ""}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                    placeholder="Enter password (min 5 chars, include letter, number & special)"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`pl-11 pr-11 ${errors.password ? "border-destructive" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive mt-1">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="hero"
              className="w-full"
              disabled={!isFormValid() || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  {mode === "signup" ? "Creating Account..." : "Signing In..."}
                </>
              ) : mode === "signup" ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="text-center pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
                  className="text-primary font-medium hover:underline"
                >
                  {mode === "signup" ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
