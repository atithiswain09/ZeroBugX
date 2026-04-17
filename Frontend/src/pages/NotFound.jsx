import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nf-code", {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "back.out(1.7)",
      });
      gsap.from(".nf-text", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.3,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center min-h-screen bg-[var(--color-bg-primary)] px-4"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--color-danger)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative text-center max-w-md">
        {/* 404 Number */}
        <div className="nf-code relative inline-block mb-6">
          <span className="text-[8rem] sm:text-[10rem] font-black leading-none gradient-text select-none">
            404
          </span>
        </div>

        {/* Icon + Message */}
        <div className="nf-text flex items-center justify-center gap-2 mb-3">
          <AlertTriangle size={20} className="text-[var(--color-warning)]" />
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">
            Page Not Found
          </h2>
        </div>

        <p className="nf-text text-[var(--color-text-muted)] text-sm mb-8 max-w-xs mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/")}
          className="nf-text inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-semibold text-sm shadow-lg shadow-[var(--color-accent)]/20 transition-all duration-200 active:scale-[0.97] cursor-pointer"
        >
          <Home size={16} />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
}
