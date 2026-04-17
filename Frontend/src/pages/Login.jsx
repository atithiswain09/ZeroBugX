import { useState, useEffect, useRef, useContext } from "react";
import Logo from "../assets/zerobugx.png";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { loginAPI } from "../api/Auth.api";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
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

  const containerRef = useRef(null);
  const cardRef = useRef(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuth) navigate("/review", { replace: true });
  }, [isAuth, navigate]);

  // Entry animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.96,
        duration: 0.7,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Enter a valid email address";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
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
      const res = await loginAPI(formData);
      const { user } = res.data;

      login(user);
      toast.success(res.data.message || "Login successful!");

      setFormData({ email: "", password: "" });
      navigate("/review");
    } catch (error) {
      const msg = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(msg);

      // Show field-level errors from validation
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
      className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center px-4 py-8"
    >
      {/* Background gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--color-accent)]/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--color-indigo)]/5 rounded-full blur-[100px]" />
      </div>

      <div
        ref={cardRef}
        className="relative w-full max-w-[420px] p-8 rounded-2xl glass shadow-xl"
        style={{ boxShadow: "var(--shadow-xl)" }}
      >
        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl overflow-hidden mb-4 ring-2 ring-[var(--color-accent)]/20 shadow-lg animate-float">
            <img
              src={Logo}
              alt="ZeroBugX"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold gradient-text tracking-tight">
            Welcome Back
          </h1>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">
            Sign in to your ZeroBugX account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Email Field */}
          <div>
            <label
              htmlFor="login-email"
              className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              />
              <input
                id="login-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
                className={`w-full bg-[var(--color-bg-input)] border rounded-xl pl-10 pr-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] outline-none transition-all duration-200 focus:ring-2 ${
                  errors.email
                    ? "border-[var(--color-danger)] focus:ring-[var(--color-danger)]/30"
                    : "border-[var(--color-border-subtle)] focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]/20"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-[var(--color-danger)] text-xs mt-1.5 animate-fade-in">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="login-password"
              className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="current-password"
                className={`w-full bg-[var(--color-bg-input)] border rounded-xl pl-10 pr-12 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] outline-none transition-all duration-200 focus:ring-2 ${
                  errors.password
                    ? "border-[var(--color-danger)] focus:ring-[var(--color-danger)]/30"
                    : "border-[var(--color-border-subtle)] focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[var(--color-danger)] text-xs mt-1.5 animate-fade-in">
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-xl font-semibold text-sm shadow-lg shadow-[var(--color-accent)]/20 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-[var(--color-text-muted)] text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-medium transition-colors"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}