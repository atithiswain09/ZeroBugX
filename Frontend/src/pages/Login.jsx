import { useState, useEffect, useRef, useContext } from "react";
import Logo from "../assets/zerobugx.png";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { loginAPI } from "../api/Auth.api";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2, Shield, Sparkles, Terminal, Zap, Fingerprint } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function LoginComponent() {
  const navigate = useNavigate();
  const { login, isAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef(null);
  const brandRef = useRef(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuth) navigate("/review", { replace: true });
  }, [isAuth, navigate]);

  // Entry animation
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

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "Authentication email required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid secure format";
        return "";
      case "password":
        if (!value) return "Access key required";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await loginAPI(formData);
      login(res.data.user);
      toast.success("Access Granted");
      navigate("/review");
    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="split-layout selection:bg-[var(--color-accent)] selection:text-white">
      {/* Left Panel: Branding */}
      <div className="brand-panel relative" ref={brandRef}>
        <div className="mesh-gradient opacity-30" />

        {/* Logo */}
        <div className="relative z-10 brand-element pt-2">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg overflow-hidden glass p-1.5 border-white/5">
              <img src={Logo} alt="ZeroBugX" className="w-full h-full object-contain" />
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
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-accent)]">Core Protocol 2.0</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight mb-4 sm:mb-6">
              Debug the <br />
              <span className="gradient-text italic">Impossible</span> <br />
              Today.
            </h1>
            
            <p className="text-[var(--color-text-secondary)] text-sm sm:text-base max-w-sm font-medium leading-relaxed">
              Access the most advanced debugging infrastructure ever built for professional engineering teams.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-y-4 sm:gap-y-6 brand-element">
            {[
              { icon: Terminal, label: "Live Runtime" },
              { icon: Zap, label: "Instant Sync" },
              { icon: Shield, label: "Secure Vault" },
              { icon: Fingerprint, label: "Biometric ID" }
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

      {/* Right Panel: Form */}
      <div className="bg-[var(--color-bg-primary)] flex items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden min-h-screen lg:min-h-0">
        <div className="form-card w-full max-w-md" ref={formRef}>
          {/* Mobile Logo — visible only when brand panel is hidden */}
          <div className="lg:hidden flex items-center gap-3 mb-8 form-element justify-center">
            <div className="w-9 h-9 rounded-lg overflow-hidden glass p-1.5 border-white/5">
              <img src={Logo} alt="ZeroBugX" className="w-full h-full object-contain" />
            </div>
            <span className="text-base font-black tracking-tighter text-white uppercase italic">ZeroBugX</span>
          </div>

          <div className="form-element mb-8 sm:mb-12 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter mb-4">Identify</h2>
            <div className="w-12 h-1 bg-[var(--color-accent)] rounded-full mx-auto lg:mx-0" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
            <div className="form-element space-y-1.5 sm:space-y-2">
              <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-text-muted)] ml-1">Secure E-Mail</label>
              <div className="relative group/input">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-disabled)] group-focus-within/input:text-[var(--color-accent)] transition-all duration-300" />
                <input
                  type="email"
                  name="email"
                  placeholder="AUTHORITY@ZEROBUGX.COM"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-[var(--color-bg-input)] border rounded-2xl pl-12 pr-4 py-3.5 sm:py-4 text-xs font-bold tracking-widest text-white transition-all duration-500 outline-none uppercase ${
                    errors.email 
                      ? "border-[var(--color-danger)]/50 focus:border-[var(--color-danger)]" 
                      : "border-white/5 focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10"
                  }`}
                />
              </div>
              {errors.email && <p className="text-[var(--color-danger)] text-[9px] font-black uppercase tracking-widest ml-1">{errors.email}</p>}
            </div>

            <div className="form-element space-y-1.5 sm:space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Access Key</label>
                <button type="button" className="text-[8px] font-black uppercase tracking-widest text-[var(--color-accent)] hover:text-white transition-colors">
                  Lost Key?
                </button>
              </div>
              <div className="relative group/input">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-disabled)] group-focus-within/input:text-[var(--color-accent)] transition-all duration-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-[var(--color-bg-input)] border rounded-2xl pl-12 pr-12 py-3.5 sm:py-4 text-xs font-bold tracking-widest text-white transition-all duration-500 outline-none ${
                    errors.password 
                      ? "border-[var(--color-danger)]/50 focus:border-[var(--color-danger)]" 
                      : "border-white/5 focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-disabled)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-[var(--color-danger)] text-[9px] font-black uppercase tracking-widest ml-1">{errors.password}</p>}
            </div>

            <div className="form-element mt-6 sm:mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 sm:py-5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-2xl font-black text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] shadow-2xl shadow-[var(--color-accent)]/20 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 cursor-pointer"
              >
                {isSubmitting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    <span>Initialize</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 sm:mt-12 form-element text-center">
            <p className="text-[var(--color-text-muted)] text-[9px] font-black uppercase tracking-[0.3em]">
              New Operative?{" "}
              <Link to="/signup" className="text-white hover:text-[var(--color-accent)] transition-all duration-300 underline underline-offset-8 decoration-[var(--color-accent)]/20 hover:decoration-[var(--color-accent)]">
                ENROLL NOW
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}