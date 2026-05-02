import {
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  useCallback,
  memo,
} from "react";
import Logo from "../assets/zerobugx.png";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import toast from "react-hot-toast";
import { signupAPI } from "../api/Auth.api";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  Check,
  X,
  ShieldCheck,
  Terminal,
  Shield,
  Sparkles,
  Zap,
  Code2
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

function getPasswordStrength(password) {
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^a-zA-Z0-9]/.test(password),
  };

  const passed = Object.values(checks).filter(Boolean).length;
  let level = "weak";
  let color = "var(--color-danger)";

  if (passed >= 4) {
    level = "strong";
    color = "var(--color-accent)";
  } else if (passed >= 3) {
    level = "medium";
    color = "var(--color-warning)";
  }

  return { checks, passed, level, color };
}

const PasswordCheck = memo(function PasswordCheck({ met, label }) {
  return (
    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
      {met ? (
        <Check size={12} className="text-[var(--color-accent)] shrink-0" />
      ) : (
        <div className="w-3 h-3 rounded-full border border-white/10 shrink-0" />
      )}
      <span
        className={`transition-colors ${
          met ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-disabled)]"
        }`}
      >
        {label}
      </span>
    </div>
  );
});

export default function SignupComponent() {
  const navigate = useNavigate();
  const { isAuth, login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const formRef = useRef(null);
  const brandRef = useRef(null);

  const strength = useMemo(() => getPasswordStrength(formData.password), [formData.password]);

  useEffect(() => {
    if (isAuth) navigate("/review", { replace: true });
  }, [isAuth, navigate]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".brand-element", {
        opacity: 0,
        x: -40,
        duration: 1,
        stagger: 0.15,
        ease: "expo.out"
      });

      gsap.from(".form-element", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.3
      });
    });
    return () => ctx.revert();
  }, []);

  const validateField = useCallback((name, value) => {
    switch (name) {
      case "username":
        if (!value.trim()) return "Username required";
        if (value.trim().length < 3) return "Too short (min 3)";
        return "";
      case "email":
        if (!value.trim()) return "Email required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Invalid email";
        return "";
      case "password":
        if (!value) return "Password required";
        if (value.length < 8) return "Min 8 characters";
        return "";
      case "confirmPassword":
        if (!value) return "Confirmation required";
        if (value !== formData.password) return "Passwords must match";
        return "";
      default: return "";
    }
  }, [formData.password]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const { confirmPassword, ...signupData } = formData;
      const response = await signupAPI(signupData);
      toast.success("Account created successfully");
      if (response.data.user) login(response.data.user);
      navigate("/review");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="split-layout selection:bg-[var(--color-accent)] selection:text-white">
      {/* Brand Section */}
      <div className="brand-panel relative" ref={brandRef}>
        <div className="mesh-gradient opacity-30" />

        {/* Logo */}
        <div className="relative z-10 brand-element pt-2">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg overflow-hidden glass p-1.5 border-white/5">
              <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-lg font-black tracking-tighter text-white uppercase italic">ZeroBugX</span>
          </div>
        </div>

        {/* Bottom Content Group */}
        <div className="flex flex-col gap-6 relative z-10 mt-12 lg:mt-auto pb-2">
          {/* Headline content */}
          <div className="brand-element">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-accent)]">The Future of QA</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight mb-4 sm:mb-6">
              Ship with <br />
              <span className="gradient-text italic">Absolute</span> <br />
              Certainty.
            </h1>
            
            <p className="text-[var(--color-text-secondary)] text-sm sm:text-base max-w-sm font-medium leading-relaxed">
              Eliminate technical debt and accelerate deployments with AI-driven intelligence.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-y-4 sm:gap-y-6 brand-element">
            {[
              { icon: Terminal, label: "Advanced CLI" },
              { icon: Zap, label: "Turbo Engine" },
              { icon: Shield, label: "AES-256 Auth" },
              { icon: Code2, label: "SDK Ready" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 group cursor-default">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:border-[var(--color-accent)]/50 group-hover:bg-[var(--color-accent)]/10">
                  <item.icon size={14} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] group-hover:text-white transition-colors">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-[var(--color-bg-primary)] flex items-center justify-center p-4 sm:p-6 lg:p-12 min-h-screen lg:min-h-0">
        <div className="form-card w-full max-w-md" ref={formRef}>
          {/* Mobile Logo — visible only when brand panel is hidden */}
          <div className="lg:hidden flex items-center gap-3 mb-8 form-element justify-center">
            <div className="w-9 h-9 rounded-lg overflow-hidden glass p-1.5 border-white/5">
              <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-base font-black tracking-tighter text-white uppercase italic">ZeroBugX</span>
          </div>

          <div className="form-element mb-8 sm:mb-12 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter mb-4">Get Started</h2>
            <div className="w-12 h-1 bg-[var(--color-accent)] rounded-full mx-auto lg:mx-0" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
            <div className="form-element space-y-1.5 sm:space-y-2">
              <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-text-muted)] ml-1">Identity</label>
              <div className="relative group/input">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-disabled)] group-focus-within/input:text-[var(--color-accent)] transition-all duration-300" />
                <input
                  type="text"
                  name="username"
                  placeholder="USERNAME"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full bg-[var(--color-bg-input)] border rounded-2xl pl-12 pr-4 py-3.5 sm:py-4 text-xs font-bold tracking-widest text-white transition-all duration-500 outline-none uppercase ${
                    errors.username ? "border-[var(--color-danger)]/50" : "border-white/5 focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10"
                  }`}
                />
              </div>
              {errors.username && <p className="text-[var(--color-danger)] text-[9px] font-black uppercase tracking-widest ml-1">{errors.username}</p>}
            </div>

            <div className="form-element space-y-1.5 sm:space-y-2">
              <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-text-muted)] ml-1">E-Mail</label>
              <div className="relative group/input">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-disabled)] group-focus-within/input:text-[var(--color-accent)] transition-all duration-300" />
                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL@WORK.COM"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-[var(--color-bg-input)] border rounded-2xl pl-12 pr-4 py-3.5 sm:py-4 text-xs font-bold tracking-widest text-white transition-all duration-500 outline-none uppercase ${
                    errors.email ? "border-[var(--color-danger)]/50" : "border-white/5 focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10"
                  }`}
                />
              </div>
              {errors.email && <p className="text-[var(--color-danger)] text-[9px] font-black uppercase tracking-widest ml-1">{errors.email}</p>}
            </div>

            <div className="form-element space-y-1.5 sm:space-y-2">
              <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-text-muted)] ml-1">Security</label>
              <div className="relative group/input">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-disabled)] group-focus-within/input:text-[var(--color-accent)] transition-all duration-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className={`w-full bg-[var(--color-bg-input)] border rounded-2xl pl-12 pr-12 py-3.5 sm:py-4 text-xs font-bold tracking-widest text-white transition-all duration-500 outline-none ${
                    errors.password ? "border-[var(--color-danger)]/50" : "border-white/5 focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10"
                  }`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-disabled)] hover:text-[var(--color-accent)] transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              
              {formData.password && (passwordFocused || errors.password) && (
                <div className="animate-fade-in p-4 rounded-2xl bg-white/[0.02] border border-white/5 mt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Complexity</span>
                    <span className="text-[8px] font-black uppercase tracking-[0.3em]" style={{ color: strength.color }}>{strength.level}</span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-1 flex-1 rounded-full transition-all duration-700" style={{ backgroundColor: i <= strength.passed ? strength.color : "rgba(255,255,255,0.05)" }} />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <PasswordCheck met={strength.checks.length} label="8+ chars" />
                    <PasswordCheck met={strength.checks.number} label="1+ numeric" />
                  </div>
                </div>
              )}
            </div>

            <div className="form-element space-y-1.5 sm:space-y-2">
              <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-text-muted)] ml-1">Confirmation</label>
              <div className="relative group/input">
                <ShieldCheck size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-disabled)] group-focus-within/input:text-[var(--color-accent)] transition-all duration-300" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full bg-[var(--color-bg-input)] border rounded-2xl pl-12 pr-12 py-3.5 sm:py-4 text-xs font-bold tracking-widest text-white transition-all duration-500 outline-none ${
                    errors.confirmPassword ? "border-[var(--color-danger)]/50" : "border-white/5 focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10"
                  }`}
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-disabled)] hover:text-[var(--color-accent)] transition-colors">
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-[var(--color-danger)] text-[9px] font-black uppercase tracking-widest ml-1">{errors.confirmPassword}</p>}
            </div>

            <div className="form-element mt-6 sm:mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 sm:py-5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-2xl font-black text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] shadow-2xl shadow-[var(--color-accent)]/20 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 cursor-pointer"
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <><span>Authorize</span><ArrowRight size={18} /></>}
              </button>
            </div>
          </form>

          <div className="mt-12 form-element text-center">
            <p className="text-[var(--color-text-muted)] text-[9px] font-black uppercase tracking-[0.3em]">
              Already Registered?{" "}
              <Link to="/login" className="text-white hover:text-[var(--color-accent)] transition-all duration-300 underline underline-offset-8 decoration-[var(--color-accent)]/20 hover:decoration-[var(--color-accent)]">
                AUTHENTICATE
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}