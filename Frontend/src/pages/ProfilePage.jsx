import { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { logoutAPI } from "../api/Auth.api";
import toast from "react-hot-toast";
import gsap from "gsap";
import Navbar from "../components/Navbar";
import { User, Mail, Calendar, LogOut, Code, ArrowRight } from "lucide-react";

export default function ProfilePage() {
  const { user, isAuth, logout: ctxLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutAPI();
      ctxLogout();
      toast.success("Signed out successfully.");
      navigate("/login");
    } catch {
      toast.error("Logout failed.");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!isAuth || !user) return null;

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar />

      <div className="pt-28 pb-16 px-4 flex justify-center items-start min-h-screen">
        <div className="w-full max-w-md">
          {/* Main Card */}
          <div className="fade-up bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Subtle top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[var(--color-accent)]/10 blur-[50px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] flex items-center justify-center mb-5 shadow-inner">
                <span className="text-2xl font-bold text-[var(--color-text-primary)]">
                  {user.username?.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* User Info */}
              <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">
                {user.username}
              </h1>
              <p className="text-sm text-[var(--color-text-muted)] mb-8">
                {user.email}
              </p>

              {/* Info Rows */}
              <div className="w-full space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]">
                  <User size={18} className="text-[var(--color-text-muted)]" />
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-disabled)] font-semibold mb-0.5">Username</p>
                    <p className="text-sm text-[var(--color-text-secondary)] font-medium">{user.username}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]">
                  <Mail size={18} className="text-[var(--color-text-muted)]" />
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-disabled)] font-semibold mb-0.5">Email</p>
                    <p className="text-sm text-[var(--color-text-secondary)] font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]">
                  <Calendar size={18} className="text-[var(--color-text-muted)]" />
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-disabled)] font-semibold mb-0.5">Joined</p>
                    <p className="text-sm text-[var(--color-text-secondary)] font-medium">{formatDate(user.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="fade-up mt-6 space-y-3">
            <button
              onClick={() => navigate("/review")}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white transition-all group shadow-lg shadow-[var(--color-accent)]/10 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Code size={18} />
                <span className="text-sm font-semibold">Start Code Review</span>
              </div>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-transparent border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:text-[var(--color-danger)] hover:border-[var(--color-danger)]/30 hover:bg-[var(--color-danger)]/5 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <LogOut size={18} />
                <span className="text-sm font-medium">Sign Out</span>
              </div>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
