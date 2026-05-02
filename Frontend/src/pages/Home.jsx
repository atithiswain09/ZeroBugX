import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useContext } from "react";
import gsap from "gsap";
import { ArrowRight, Code2, Zap, Shield, Sparkles, Terminal, Cpu, Braces } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function HomePage() {
  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from(".hero-content > *", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out",
      });

      // Floating elements animation
      gsap.to(".floating-code", {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-5, 5)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.5,
          from: "random"
        }
      });

      // Feature cards stagger
      gsap.from(".feature-card", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.5,
        ease: "back.out(1.7)",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Code2,
      title: "Smart Review",
      desc: "Deep analysis for logical bugs, performance bottlenecks, and pattern violations.",
      color: "var(--color-accent)",
    },
    {
      icon: Zap,
      title: "Instant Results",
      desc: "Millisecond-latency feedback powered by Gemini 1.5 Pro architecture.",
      color: "var(--color-indigo)",
    },
    {
      icon: Shield,
      title: "Security Hardening",
      desc: "Proactive detection of SQL injection, XSS, and insecure dependencies.",
      color: "var(--color-purple)",
    },
  ];

  const floatingSnippets = [
    { text: "const fix = ai.analyze(code);", top: "15%", left: "10%", delay: 0 },
    { text: "function optimize() { ... }", top: "25%", right: "15%", delay: 1 },
    { text: "npm install @zerobugx/core", bottom: "20%", left: "15%", delay: 0.5 },
    { text: "if (bug) { resolve(null); }", bottom: "30%", right: "12%", delay: 1.5 },
  ];

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 relative overflow-hidden"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[var(--color-accent)]/5 rounded-full blur-[120px] animate-pulse-soft" />
        <div className="absolute bottom-0 right-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-[var(--color-indigo)]/5 rounded-full blur-[100px] animate-pulse-soft" style={{ animationDelay: '-2s' }} />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Floating Code Snippets (Desktop Only) */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {floatingSnippets.map((s, i) => (
          <div
            key={i}
            className="floating-code absolute glass px-4 py-2 rounded-lg border border-white/5 text-[10px] font-mono text-[var(--color-text-muted)] shadow-2xl"
            style={{ 
              top: s.top, 
              left: s.left, 
              right: s.right, 
              bottom: s.bottom,
              transitionDelay: `${s.delay}s`
            }}
          >
            {s.text}
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="hero-content relative max-w-4xl text-center z-10 px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-bg-elevated)] border border-white/5 mb-8 shadow-xl">
          <Sparkles size={14} className="text-[var(--color-accent)]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
            Next-Gen Code Intelligence
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6 sm:mb-8">
          <span className="text-white">Build </span>
          <span className="gradient-text">Flawless</span>
          <br />
          <span className="text-white/40 italic font-light">Software.</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12 px-2">
          Experience the most advanced AI code auditor. Paste your logic, 
          configure your constraints, and let <span className="text-white font-semibold">ZeroBugX</span> handle the rest.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={() => navigate(isAuth ? "/review" : "/signup")}
            className="group relative px-10 py-4 bg-[var(--color-accent)] text-white rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] active:scale-95 flex items-center gap-3 cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span>Get Started Free</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {!isAuth && (
            <button
              onClick={() => navigate("/login")}
              className="px-10 py-4 glass text-[var(--color-text-primary)] rounded-2xl font-bold text-sm transition-all duration-300 hover:bg-white/10 active:scale-95 cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="relative z-10 mt-16 sm:mt-24 md:mt-32 w-full max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card group p-5 sm:p-8 rounded-2xl sm:rounded-3xl glass hover:border-[var(--color-accent)]/30 transition-all duration-500 hover:-translate-y-2 flex flex-col items-start"
            >
              <div
                className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                style={{ 
                  backgroundColor: `${f.color}15`,
                  border: `1px solid ${f.color}30`
                }}
              >
                <f.icon size={24} style={{ color: f.color }} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                {f.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {f.desc}
              </p>
              
              <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors">
                <span>Learn More</span>
                <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Footer */}
      <div className="mt-16 sm:mt-24 md:mt-32 opacity-30 grayscale hover:grayscale-0 transition-all duration-500 flex flex-wrap justify-center gap-6 sm:gap-12 items-center px-4 sm:px-6">
        <div className="flex items-center gap-2 font-black text-lg sm:text-xl"><Terminal size={20}/> LOGIC</div>
        <div className="flex items-center gap-2 font-black text-lg sm:text-xl"><Cpu size={20}/> CORE</div>
        <div className="flex items-center gap-2 font-black text-lg sm:text-xl"><Braces size={20}/> SYNTAX</div>
      </div>
    </div>
  );
}
