import { useEffect, useRef, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/zerobugx.png";
import gsap from "gsap";
import { AuthContext } from "../context/AuthContext";
import { logoutAPI } from "../api/Auth.api";
import { LogOut, Home, Code, Menu, X, User } from "lucide-react";
import toast from "react-hot-toast";

function Navbar() {
  const navRef = useRef(null);
  const { isAuth, user, logout: ctxLogout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logoutAPI();
      ctxLogout();
      toast.success("Signed out successfully.");
      navigate("/login");
    } catch (error) {
      console.error("[Navbar] Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const NavLink = ({ to, icon: Icon, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-white/10 text-white"
            : "text-[var(--color-text-muted)] hover:bg-white/5 hover:text-[var(--color-text-secondary)]"
        }`}
      >
        <Icon size={16} />
        {children}
      </Link>
    );
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full bg-[var(--color-bg-primary)]/80 backdrop-blur-xl border-b border-[var(--color-border-subtle)] z-50"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Left Section - Logo & Links */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-[var(--color-border-default)] group-hover:border-[var(--color-accent)]/40 transition-all duration-300 shadow-sm">
              <img
                src={Logo}
                alt="ZeroBugX"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-lg font-bold text-[var(--color-text-primary)] tracking-tight hidden sm:block">
              ZeroBugX
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 border-l border-[var(--color-border-subtle)] pl-6">
            <NavLink to="/" icon={Home}>
              Home
            </NavLink>
            <NavLink to="/review" icon={Code}>
              Review
            </NavLink>
            <NavLink to="/profile" icon={User}>
              Profile
            </NavLink>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* User badge (desktop) */}
          {isAuth && user && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-[var(--color-border-subtle)]">
              <div className="w-5 h-5 rounded-full bg-[var(--color-accent-subtle)] flex items-center justify-center">
                <span className="text-[10px] font-bold text-[var(--color-accent)]">
                  {user.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                {user.username}
              </span>
            </div>
          )}

          {isAuth ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] bg-white/5 border border-[var(--color-border-subtle)] hover:bg-[var(--color-danger-subtle)] hover:border-[var(--color-danger)]/20 hover:text-[var(--color-danger)] transition-all duration-300 cursor-pointer"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] transition-all duration-200 shadow-sm"
            >
              Sign In
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[var(--color-text-muted)] hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)]/95 backdrop-blur-xl animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            <NavLink to="/" icon={Home}>
              Home
            </NavLink>
            <NavLink to="/review" icon={Code}>
              Review
            </NavLink>
            <NavLink to="/profile" icon={User}>
              Profile
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;