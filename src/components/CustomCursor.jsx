"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isClicking, setIsClicking] = useState(false);

  // References for coordinates to use in requestAnimationFrame loop without triggering re-renders
  const posRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef({ x: -100, y: -100 });
  const requestRef = useRef();

  useEffect(() => {
    // Check if device supports touch or is a mobile screen
    const isMobile = window.matchMedia("(max-width: 768px)").matches || 
                     ("ontouchstart" in window) || 
                     (navigator.maxTouchPoints > 0);
    
    if (isMobile) {
      return; // Disable custom cursor on mobile
    }

    const handleMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Scan dynamic elements and add hover states
    const updateHoverables = () => {
      const hoverables = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, .clickable-card"
      );
      
      const onEnter = () => setIsHovering(true);
      const onLeave = () => setIsHovering(false);

      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Initial attachment
    updateHoverables();

    // Use MutationObserver to re-evaluate when layout changes (e.g. changing portfolio tabs)
    const observer = new MutationObserver(updateHoverables);
    observer.observe(document.body, { childList: true, subtree: true });

    // Smooth scroll interpolation loop
    const animateTrail = () => {
      const targetX = posRef.current.x;
      const targetY = posRef.current.y;
      
      const currentX = trailRef.current.x;
      const currentY = trailRef.current.y;

      // Linear interpolation (Lerp): 12% lag/drag for premium look
      const nextX = currentX + (targetX - currentX) * 0.12;
      const nextY = currentY + (targetY - currentY) * 0.12;

      trailRef.current = { x: nextX, y: nextY };
      setTrail({ x: nextX, y: nextY });

      requestRef.current = requestAnimationFrame(animateTrail);
    };

    requestRef.current = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(requestRef.current);
      observer.disconnect();
    };
  }, []);

  if (isHidden) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-50">
      {/* Outer Circle (Floating Trail) */}
      <div
        className={`absolute rounded-full border border-gold/40 transition-all duration-300 -translate-x-1/2 -translate-y-1/2 ${
          isHovering
            ? "w-14 h-14 bg-gold/8 border-gold/70"
            : isClicking
            ? "w-8 h-8 bg-gold/15 border-gold"
            : "w-10 h-10"
        }`}
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
        }}
      />
      {/* Inner Dot (Direct Pointer) */}
      <div
        className={`absolute rounded-full bg-gold -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${
          isHovering ? "scale-0" : isClicking ? "w-1 h-1" : "w-1.5 h-1.5"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </div>
  );
}
