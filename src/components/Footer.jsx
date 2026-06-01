"use client";

import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundImage: "linear-gradient(rgba(45, 34, 25, 0.95), rgba(30, 22, 16, 0.98)), url('/wood_texture.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="bg-[#2d2219] border-t border-[#a88959]/30 pt-20 pb-10 px-6 md:px-12 text-zinc-400 font-light relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xl font-light tracking-[0.3em] text-white block mb-1">
                ELEVÉ
              </span>
              <span className="text-[7px] tracking-[0.55em] text-gold uppercase block mb-6">
                Interiors
              </span>
              <p className="text-xs text-zinc-300 font-light leading-relaxed max-w-sm">
                Architectural elegance and interior design tailored to visionaries who appreciate the subtle details of space and form.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white block mb-6 font-mono font-medium">
              Navigation
            </span>
            <ul className="space-y-3 text-xs">
              {[
                { label: "Home", href: "#" },
                { label: "Services", href: "#services" },
                { label: "Portfolio", href: "#portfolio" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "Contact Us", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-zinc-300 hover:text-gold transition-colors duration-300 tracking-wider"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white block mb-6 font-mono font-medium">
                Newsletter
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                Subscribe to our curated journal for architectural inspiration and design narratives.
              </p>

              {/* Minimalist email box */}
              <form onSubmit={(e) => e.preventDefault()} className="relative flex border-b border-white/15 focus-within:border-gold transition-colors duration-300">
                <input
                  type="email"
                  required
                  placeholder="ENTER EMAIL ADDRESS"
                  className="w-full bg-transparent py-2.5 text-[10px] uppercase tracking-[0.2em] text-white focus:outline-none placeholder-zinc-500"
                />
                <button
                  type="submit"
                  className="text-white hover:text-gold transition-colors duration-300 text-xs px-2"
                  aria-label="Subscribe"
                >
                  &rarr;
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-zinc-400">
            &copy; {currentYear} ELEVÉ INTERIORS. ALL RIGHTS RESERVED.
          </span>

          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-gold text-zinc-300 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold text-zinc-300 transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
