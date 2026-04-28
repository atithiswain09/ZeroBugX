import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // Don't show custom cursor on mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const onMouseMove = (e) => {
      setIsHidden(false);
      const { clientX: x, clientY: y } = e;

      // Primary dot (fast)
      gsap.to(cursorRef.current, {
        x,
        y,
        duration: 0.1,
        ease: "power2.out",
      });

      // Follower circle (lagged)
      gsap.to(followerRef.current, {
        x,
        y,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const onMouseEnter = () => setIsHidden(false);
    const onMouseLeave = () => setIsHidden(true);

    const onMouseDown = () => {
      gsap.to(followerRef.current, {
        scale: 0.8,
        duration: 0.2,
      });
    };

    const onMouseUp = () => {
      gsap.to(followerRef.current, {
        scale: 1,
        duration: 0.2,
      });
    };

    // Detect interactive elements for hover effect
    const onMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.closest("button") || 
        target.closest("a") || 
        target.closest("input") || 
        target.closest("textarea") ||
        window.getComputedStyle(target).cursor === "pointer";
      
      if (isInteractive) {
        setIsHovering(true);
        gsap.to(followerRef.current, {
          scale: 1.5,
          backgroundColor: "rgba(34, 197, 94, 0.15)", // var(--color-accent-subtle)
          borderColor: "var(--color-accent)",
          duration: 0.3,
        });
        gsap.to(cursorRef.current, {
          scale: 0.5,
          duration: 0.3,
        });
      } else {
        setIsHovering(false);
        gsap.to(followerRef.current, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(99, 102, 241, 0.4)", // var(--color-indigo)
          duration: 0.3,
        });
        gsap.to(cursorRef.current, {
          scale: 1,
          duration: 0.3,
        });
      }
    };

    if (!isMobile) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseenter", onMouseEnter);
      window.addEventListener("mouseleave", onMouseLeave);
      window.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("mouseover", onMouseOver);
      
      // Hide default cursor on the whole body when moving
      document.body.style.cursor = "none";
      
      // But we need to make sure buttons still show something if the custom cursor fails
      const style = document.createElement("style");
      style.innerHTML = `
        a, button, input, textarea, [role="button"] {
          cursor: none !important;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseenter", onMouseEnter);
        window.removeEventListener("mouseleave", onMouseLeave);
        window.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("mouseover", onMouseOver);
        window.removeEventListener("resize", checkMobile);
        document.body.style.cursor = "auto";
        document.head.removeChild(style);
      };
    }
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Follower Ring */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border-2 border-[var(--color-indigo)]/40 pointer-events-none z-[9999] transition-opacity duration-300 ${
          isHidden ? "opacity-0" : "opacity-100"
        }`}
        style={{ willChange: "transform" }}
      />
      {/* Inner Dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-[var(--color-indigo)] pointer-events-none z-[9999] transition-opacity duration-300 ${
          isHidden ? "opacity-0" : "opacity-100"
        }`}
        style={{ willChange: "transform" }}
      />
    </>
  );
}
