"use client";

import React, { useState } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Elevé Interiors completely re-imagined our Geneva penthouse. Their obsession with small details—like the custom brass reveals and the concrete alignment—turned our home into a physical work of art. They design with unmatched poetry.",
      author: "Elena Rostova",
      role: "Private Homeowner",
      location: "Geneva, Switzerland",
    },
    {
      quote:
        "Working with the studio was a masterclass in architectural execution. They listened to our branding requirements but elevated the aesthetics to a level that commands attention. Our clients are constantly in awe of the main lobby.",
      author: "Marcus Vance",
      role: "Founder, Vance Chambers",
      location: "Milan, Italy",
    },
    {
      quote:
        "Every space they touch gets a distinct soul. They don't just arrange furniture; they craft a choreography of natural light, noble materials, and acoustic comfort. The living experience they created is absolutely timeless.",
      author: "Sophia Chen",
      role: "Creative Director",
      location: "London, UK",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 px-6 md:px-12 bg-transparent relative overflow-hidden">
      {/* Background decoration with warm backlit gold glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-gold/10 blur-[130px] pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span 
            className="text-xs uppercase tracking-[0.4em] text-[#a88959] font-mono mb-4 block font-semibold"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
          >
            Testimonials
          </span>
          <h2 
            className="text-3xl md:text-5xl font-light tracking-wide text-[#fcfaf7] font-serif"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
          >
            Client Voices
          </h2>
          <div className="w-12 h-[1px] bg-gold mt-6 mx-auto" />
        </div>

        {/* Carousel Container */}
        <div
          style={{
            backgroundImage: "linear-gradient(rgba(45, 34, 25, 0.94), rgba(30, 22, 16, 0.97)), url('/wood_texture.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="relative bg-[#2d2219] border border-[#a88959]/35 p-8 sm:p-12 md:p-16 text-center shadow-[0_8px_32px_0_rgba(26,20,15,0.3)]"
        >
          {/* Quote Icon representation */}
          <span className="text-6xl md:text-8xl text-[#a88959]/15 font-serif absolute top-6 left-6 select-none pointer-events-none">
            “
          </span>

          <div className="relative w-full overflow-hidden">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className={`transition-all duration-700 flex flex-col items-center justify-center ${idx === activeIndex
                    ? "relative opacity-100 scale-100 pointer-events-auto z-10 w-full"
                    : "absolute inset-0 opacity-0 scale-95 pointer-events-none z-0 w-full"
                  }`}
              >
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light italic leading-relaxed text-[#fcfaf7] max-w-3xl mb-8 px-2 sm:px-6 md:px-12">
                  {t.quote}
                </p>

                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium text-[#e5cfa3] tracking-[0.1em] mb-1">
                    {t.author}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-300 font-mono font-medium">
                    {t.role} &bull; {t.location}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-12 border-t border-white/10 pt-8">
            <button
              onClick={prevTestimonial}
              className="text-xs uppercase tracking-[0.2em] text-[#e5cfa3] hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
              aria-label="Previous testimonial"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-300">&larr;</span> Prev
            </button>

            {/* Pagination Indicators */}
            <div className="flex gap-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? "bg-[#a88959] w-4" : "bg-white/20 hover:bg-white/40"
                    }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="text-xs uppercase tracking-[0.2em] text-[#e5cfa3] hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
              aria-label="Next testimonial"
            >
              Next <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
