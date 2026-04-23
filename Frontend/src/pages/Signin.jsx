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
    color = "var(--color-success)";
  } else if (passed >= 3) {
    level = "medium";
    color = "var(--color-warning)";
  }

  return { checks, passed, level, color };
}

const PasswordCheck = memo(function PasswordCheck({ met, label }) {
  return (
    <div className="flex items-center gap-1.5 text-xs">
      {met ? (
        <Check size={14} className="text-[var(--color-success)] shrink-0" />
      ) : (
        <X size={14} className="text-[var(--color-text-disabled)] shrink-0" />
      )}
      <span
        className={`truncate ${
          met
            ? "text-[var(--color-text-secondary)]"
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
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5"
      >
        {label}
      </label>

      <div className="relative">
        <Icon
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
        />

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
          className={`w-full bg-[var(--color-bg-input)] border rounded-xl pl-10 ${
            showToggle ? "pr-12" : "pr-4"
          } py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] outline-none transition-all duration-200 focus:ring-2 ${
            error
              ? "border-[var(--color-danger)] focus:ring-[var(--color-danger)]/30"
              : "border-[var(--color-border-subtle)] focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]/20"
          }`}
        />

        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors p-1"
            aria-label={toggleState ? "Hide password" : "Show password"}
          >
            {toggleState ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <p className="text-[var(--color-danger)] text-xs mt-1.5 animate-fade-in">
          {error}
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
        y: 20,
        scale: 0.98,
        duration: 0.6,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const validateField = useCallback(
    (name, value) => {
      switch (name) {
        case "username":
          if (!value.trim()) return "Username is required";
          if (value.trim().length < 3) return "At least 3 characters";
          if (value.trim().length > 30) return "Max 30 characters";
          if (!/^[a-zA-Z0-9_]+$/.test(value.trim()))
            return "Letters, numbers, underscores only";
          return "";

        case "email":
          if (!value.trim()) return "Email is required";
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
            return "Enter a valid email address";
          return "";

        case "password":
          if (!value) return "Password is required";
          if (value.length < 8) return "At least 8 characters";
          if (!/[a-z]/.test(value)) return "Must include a lowercase letter";
          if (!/[A-Z]/.test(value)) return "Must include an uppercase letter";
          if (!/[0-9]/.test(value)) return "Must include a number";
          return "";

        case "confirmPassword":
          if (!value) return "Please confirm your password";
          if (value !== formData.password) return "Passwords do not match";
          return "";

        default:
          return "";
      }
    },
    [formData.password]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      if (!prev[name]) return prev;
      return { ...prev, [name]: "" };
    });
  }, []);

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;

      if (name === "password") setPasswordFocused(false);

      const error = validateField(name, value);

      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
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
      toast.error("Please fix the errors below.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { confirmPassword, ...signupData } = formData;

      const trimmedData = {
        username: signupData.username.trim(),
        email: signupData.email.trim(),
        password: signupData.password,
      };

      const response = await signupAPI(trimmedData);
      toast.success(response.data.message || "Account created!");

      if (response.data.user) {
        login(response.data.user);
      }

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/review");
    } catch (error) {
      const msg =
        error.response?.data?.message || "Signup failed. Please try again.";
      toast.error(msg);

      if (error.response?.data?.errors) {
        const fieldErrors = {};
        error.response.data.errors.forEach((err) => {
          fieldErrors[err.field] = err.message;
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center p-4 sm:p-8"
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[var(--color-indigo)]/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[var(--color-accent)]/5 rounded-full blur-[100px]" />
      </div>

      <div
        ref={cardRef}
        className="relative w-full max-w-[400px] p-6 sm:p-8 rounded-2xl glass shadow-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)]"
      >
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden mb-4 ring-2 ring-[var(--color-indigo)]/20 shadow-lg animate-float">
            <img
              src={Logo}
              alt="ZeroBugX"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold gradient-text-indigo tracking-tight">
            Create Account
          </h1>
          <p className="text-[var(--color-text-muted)] text-xs sm:text-sm mt-1 text-center">
            Join ZeroBugX and review code with AI
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <InputField
            id="signup-username"
            name="username"
            label="Username"
            placeholder="your_username"
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
            placeholder="you@example.com"
            icon={Mail}
            autoComplete="email"
            value={formData.email}
            error={errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <InputField
            id="signup-password"
            name="password"
            label="Password"
            placeholder="Create a strong password"
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
            <div className="animate-fade-in space-y-2.5 p-3.5 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-1.5 flex-1 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor:
                        i <= strength.passed
                          ? strength.color
                          : "var(--color-border-subtle)",
                    }}
                  />
                ))}
              </div>

              <p className="text-xs font-semibold" style={{ color: strength.color }}>
                Strength: <span className="capitalize">{strength.level}</span>
              </p>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-y-1.5 gap-x-2">
                <PasswordCheck met={strength.checks.length} label="8+ chars" />
                <PasswordCheck met={strength.checks.lowercase} label="Lowercase" />
                <PasswordCheck met={strength.checks.uppercase} label="Uppercase" />
                <PasswordCheck met={strength.checks.number} label="Number" />
              </div>
            </div>
          )}

          <InputField
            id="signup-confirm-password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Re-enter your password"
            icon={Lock}
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
            className="w-full py-3.5 mt-2 bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-hover)] text-white rounded-xl font-semibold text-sm shadow-lg shadow-[var(--color-indigo)]/20 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-[var(--color-text-muted)] text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[var(--color-indigo)] hover:text-[var(--color-indigo-hover)] font-semibold transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}