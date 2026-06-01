"use client";

import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Fade in the navbar after the user scrolls a bit
      setVisible(scrollY > window.innerHeight * 0.4);
      // Add blurred background when scrolling past the first section
      setScrolled(scrollY > window.innerHeight * 0.95);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      style={
        scrolled
          ? {
              backgroundImage: "linear-gradient(rgba(45, 34, 25, 0.96), rgba(30, 22, 16, 0.98)), url('/wood_texture.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
        (visible || mobileMenuOpen) ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
      } ${
        scrolled
          ? "bg-[#2d2219] border-b border-[#a88959]/30 py-4 shadow-[0_2px_20px_rgba(0,0,0,0.15)]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex flex-col">
          <span className="text-xl font-light tracking-[0.3em] text-white hover:text-gold transition-colors duration-300">
            ELEVÉ
          </span>
          <span className="text-[7px] tracking-[0.55em] text-gold uppercase mt-0.5">
            Interiors
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs uppercase tracking-[0.25em] text-zinc-300 hover:text-gold transition-colors duration-300 font-light"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="text-xs uppercase tracking-[0.2em] border border-gold/40 text-gold px-6 py-2.5 rounded-none hover:bg-gold hover:text-[#0b0c10] hover:border-gold transition-all duration-300 ease-out font-medium"
          >
            Book Consultation
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-6 h-6 gap-1.5 focus:outline-none"
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-[1px] bg-white transition-all duration-300 ${
              mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`w-5 h-[1px] bg-white transition-all duration-300 ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-[1px] bg-white transition-all duration-300 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-[#2d2219] z-30 transition-all duration-500 md:hidden flex flex-col items-center justify-center gap-8 ${
          mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        }`}
        style={{
          paddingTop: "80px",
          backgroundImage: "linear-gradient(rgba(45, 34, 25, 0.98), rgba(30, 22, 16, 0.99)), url('/wood_texture.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Elegant Close Button inside Drawer */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-6 text-zinc-300 hover:text-gold transition-colors duration-300 w-10 h-10 flex items-center justify-center focus:outline-none"
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {navItems.map((item, idx) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg uppercase tracking-[0.3em] text-white hover:text-gold transition-colors duration-300 font-light"
            style={{
              transitionDelay: mobileMenuOpen ? `${idx * 75}ms` : "0ms",
              transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
              transitionProperty: "all",
            }}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMobileMenuOpen(false)}
          className="text-xs uppercase tracking-[0.2em] border border-gold/40 text-gold px-8 py-3 rounded-none hover:bg-gold hover:text-[#0b0c10] hover:border-gold transition-all duration-300 ease-out font-medium mt-4"
        >
          Book Consultation
        </a>
      </div>
    </nav>
  );
}
