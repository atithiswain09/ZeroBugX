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
  ShieldCheck
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
        <X size={12} className="text-[var(--color-text-disabled)] shrink-0" />
      )}
      <span
        className={`truncate transition-colors ${
          met
            ? "text-[var(--color-text-primary)]"
            : "text-[var(--color-text-disabled)]"
        }`}
      >
        {label}
      </span>
    </div>
  );
});

const InputField = memo(function InputField({
  id,
  name,
  type = "text",
  label,
  placeholder,
  icon: Icon,
  autoComplete,
  showToggle,
  toggleState,
  onToggle,
  value,
  error,
  onChange,
  onBlur,
  onFocus,
}) {
  return (
    <div className="group/input">
      <label
        htmlFor={id}
        className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-2 group-focus-within/input:text-[var(--color-accent)] transition-colors"
      >
        {label}
      </label>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon
            size={16}
            className={`transition-colors duration-300 ${
              error ? "text-[var(--color-danger)]" : "text-[var(--color-text-muted)] group-focus-within/input:text-[var(--color-accent)]"
            }`}
          />
        </div>

        <input
          id={id}
          type={showToggle ? (toggleState ? "text" : "password") : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          autoComplete={autoComplete}
          className={`w-full bg-[var(--color-bg-input)] border rounded-2xl pl-12 ${
            showToggle ? "pr-12" : "pr-4"
          } py-3.5 text-sm font-medium text-white placeholder:text-[var(--color-text-disabled)] outline-none transition-all duration-300 ${
            error
              ? "border-[var(--color-danger)]/50 focus:border-[var(--color-danger)] focus:ring-4 focus:ring-[var(--color-danger)]/10"
              : "border-white/5 focus:border-[var(--color-accent)]/50 focus:ring-4 focus:ring-[var(--color-accent)]/10"
          }`}
        />

        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-0 top-0 bottom-0 px-4 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
            aria-label={toggleState ? "Hide password" : "Show password"}
          >
            {toggleState ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>

      {error && (
        <p className="text-[var(--color-danger)] text-[10px] font-bold mt-2 animate-fade-in flex items-center gap-1">
          <X size={10} /> {error}
        </p>
      )}
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

  const containerRef = useRef(null);
  const cardRef = useRef(null);

  const strength = useMemo(() => {
    return getPasswordStrength(formData.password);
  }, [formData.password]);

  useEffect(() => {
    if (isAuth) navigate("/review", { replace: true });
  }, [isAuth, navigate]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 1,
        ease: "power4.out",
      });
      
      gsap.to(".bg-orb", {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        duration: "random(10, 20)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const validateField = useCallback(
    (name, value) => {
      switch (name) {
        case "username":
          if (!value.trim()) return "Username required";
          if (value.trim().length < 3) return "Too short (min 3)";
          if (!/^[a-zA-Z0-9_]+$/.test(value.trim()))
            return "Letters/numbers/underscores only";
          return "";

        case "email":
          if (!value.trim()) return "Email required";
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
            return "Invalid email format";
          return "";

        case "password":
          if (!value) return "Password required";
          if (value.length < 8) return "Min 8 characters";
          return "";

        case "confirmPassword":
          if (!value) return "Confirmation required";
          if (value !== formData.password) return "Passwords must match";
          return "";

        default:
          return "";
      }
    },
    [formData.password]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (name === "password") setPasswordFocused(false);
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validateField]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix form errors.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { confirmPassword, ...signupData } = formData;
      const response = await signupAPI(signupData);
      toast.success("Welcome to ZeroBugX!");
      if (response.data.user) login(response.data.user);
      navigate("/review");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Dynamic Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="bg-orb absolute top-0 -left-20 w-[400px] h-[400px] bg-[var(--color-accent)]/5 rounded-full blur-[100px]" />
        <div className="bg-orb absolute bottom-0 -right-20 w-[400px] h-[400px] bg-[var(--color-indigo)]/5 rounded-full blur-[100px]" />
      </div>

      <div
        ref={cardRef}
        className="relative w-full max-w-[440px] p-8 sm:p-10 rounded-[2.5rem] glass-morphism z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 rounded-3xl overflow-hidden mb-6 p-4 bg-white/5 border border-white/10 shadow-2xl animate-float">
            <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">
            Create <span className="gradient-text">Account</span>
          </h1>
          <p className="text-[var(--color-text-muted)] text-xs font-bold uppercase tracking-[0.1em]">
            ZeroBugX AI Intelligence
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <InputField
            id="signup-username"
            name="username"
            label="Username"
            placeholder="JohnDoe"
            icon={User}
            autoComplete="username"
            value={formData.username}
            error={errors.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <InputField
            id="signup-email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="john@example.com"
            icon={Mail}
            autoComplete="email"
            value={formData.email}
            error={errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <div className="space-y-4">
            <InputField
              id="signup-password"
              name="password"
              label="Password"
              placeholder="••••••••"
              icon={Lock}
              autoComplete="new-password"
              showToggle
              toggleState={showPassword}
              onToggle={() => setShowPassword((prev) => !prev)}
              value={formData.password}
              error={errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={() => setPasswordFocused(true)}
            />

            {formData.password && (passwordFocused || errors.password) && (
              <div className="animate-fade-in p-5 rounded-2xl bg-white/[0.02] border border-white/5 shadow-inner">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">
                    Security Level
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: strength.color }}>
                    {strength.level}
                  </span>
                </div>
                
                <div className="flex gap-1.5 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-1 flex-1 rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: i <= strength.passed ? strength.color : "rgba(255,255,255,0.05)",
                        boxShadow: i <= strength.passed ? `0 0 10px ${strength.color}40` : "none"
                      }}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <PasswordCheck met={strength.checks.length} label="8+ Chars" />
                  <PasswordCheck met={strength.checks.lowercase} label="Lowercase" />
                  <PasswordCheck met={strength.checks.uppercase} label="Uppercase" />
                  <PasswordCheck met={strength.checks.number} label="Number" />
                </div>
              </div>
            )}
          </div>

          <InputField
            id="signup-confirm-password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••"
            icon={ShieldCheck}
            autoComplete="new-password"
            showToggle
            toggleState={showConfirmPassword}
            onToggle={() => setShowConfirmPassword((prev) => !prev)}
            value={formData.confirmPassword}
            error={errors.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full group py-4 mt-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] shadow-2xl shadow-[var(--color-accent)]/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-[var(--color-text-muted)] text-[11px] font-bold uppercase tracking-widest mt-10">
          Have an account?{" "}
          <Link
            to="/login"
            className="text-white hover:text-[var(--color-accent)] transition-colors underline underline-offset-4 decoration-[var(--color-accent)]/30"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}