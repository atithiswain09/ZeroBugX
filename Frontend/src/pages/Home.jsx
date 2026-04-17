import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useContext } from "react";
import gsap from "gsap";
import { ArrowRight, Code2, Zap, Shield, Sparkles } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function HomePage() {
  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out",
      });
      gsap.from(".hero-cta", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.4,
        ease: "power3.out",
      });
      gsap.from(".feature-card", {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        delay: 0.6,
        ease: "power3.out",
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Code2,
      title: "Smart Review",
      desc: "AI analyzes your code for bugs, patterns, and improvements.",
      color: "var(--color-accent)",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Get instant feedback powered by advanced AI models.",
      color: "var(--color-warning)",
    },
    {
      icon: Shield,
      title: "Security Scan",
      desc: "Detect vulnerabilities and security anti-patterns.",
      color: "var(--color-indigo)",
    },
  ];

  return (
    <div
      ref={heroRef}
      className="w-full min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center px-4 pt-20 pb-16 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--color-accent)]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-indigo)]/5 rounded-full blur-[120px]" />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-3xl text-center z-10">
        <div className="hero-title inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-accent-subtle)] border border-[var(--color-accent)]/20 mb-6">
          <Sparkles size={14} className="text-[var(--color-accent)]" />
          <span className="text-xs font-medium text-[var(--color-accent)]">
            AI-Powered Code Intelligence
          </span>
        </div>

        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
          <span className="text-[var(--color-text-primary)]">
            Ship Better Code,
          </span>
          <br />
          <span className="gradient-text">Zero Bugs.</span>
        </h1>

        <p className="hero-subtitle mt-6 text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-xl mx-auto leading-relaxed">
          Paste your code, describe what you need, and let AI review it
          instantly. Catch bugs, improve quality, and learn—all in one place.
        </p>

        <div className="hero-cta mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(isAuth ? "/review" : "/signup")}
            className="group px-8 py-3.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-xl font-semibold text-sm shadow-lg shadow-[var(--color-accent)]/25 transition-all duration-300 active:scale-[0.97] flex items-center gap-2 cursor-pointer"
          >
            <span>Start Reviewing</span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          {!isAuth && (
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Feature Cards */}
      <div
        ref={featuresRef}
        className="relative z-10 mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full px-4"
      >
        {features.map((f, i) => (
          <div
            key={i}
            className="feature-card group p-5 rounded-xl glass hover:border-white/15 transition-all duration-300 hover:-translate-y-1"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              style={{ backgroundColor: `color-mix(in srgb, ${f.color} 15%, transparent)` }}
            >
              <f.icon size={20} style={{ color: f.color }} />
            </div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
              {f.title}
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
