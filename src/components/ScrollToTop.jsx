"use client";

import React, { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show when scrolled down past viewport height (past the Hero section)
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-6 md:right-10 z-30 flex flex-col items-center gap-3 group focus:outline-none transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      {/* Vertical text rotated */}
      <span className="text-[9px] uppercase tracking-[0.3em] text-[#dfba6b] font-mono [writing-mode:vertical-lr] rotate-180 group-hover:-translate-y-1 transition-transform duration-300 select-none">
        Top
      </span>
      {/* Elegant Line thread */}
      <div className="relative w-[1px] h-12 bg-white/20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[#dfba6b] -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out origin-top" />
      </div>
    </button>
  );
}
