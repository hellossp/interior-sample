"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Portfolio() {
  const [filter, setFilter] = useState("all");

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
    { id: "furniture", label: "Bespoke Furniture" },
  ];

  const projects = [
    {
      id: 1,
      title: "The Concrete Sanctuary",
      category: "residential",
      desc: "Minimalist living room balancing raw concrete walls with warm brass elements and curated textiles.",
      src: "/portfolio_living.png",
      size: "md:col-span-2 md:row-span-1",
      location: "Geneva, Switzerland",
    },
    {
      id: 2,
      title: "The Obsidian Kitchen",
      category: "residential",
      desc: "Sleek kitchen architecture combining dark brushed oak cabinets and custom white marble features.",
      src: "/portfolio_kitchen.png",
      size: "md:col-span-1 md:row-span-1",
      location: "Milan, Italy",
    },
    {
      id: 3,
      title: "Velvet Haven Suite",
      category: "furniture",
      desc: "Bespoke bedroom styling featuring a custom velvet headboard, oak wall detailing, and warm ambient light.",
      src: "/portfolio_bedroom.png",
      size: "md:col-span-1 md:row-span-1",
      location: "London, UK",
    },
    {
      id: 4,
      title: "The Gilded Library Lounge",
      category: "commercial",
      desc: "Sophisticated library lounge for a private club, complete with custom floor-to-ceiling shelving.",
      src: "/portfolio_lounge.png",
      size: "md:col-span-2 md:row-span-1",
      location: "New York, USA",
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-24 md:py-32 px-6 md:px-12 bg-transparent relative overflow-hidden">
      {/* Background radial gold glows */}
      <div className="absolute -top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gold/8 blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gold/4 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div>
            <span 
              className="text-xs uppercase tracking-[0.4em] text-[#a88959] font-mono mb-4 block font-semibold"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
            >
              Showcase
            </span>
            <h2 
              className="text-3xl md:text-5xl font-light tracking-wide text-[#fcfaf7] font-serif"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
            >
              Bespoke Spaces
            </h2>
            <div className="w-16 h-[1px] bg-gold mt-6" />
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`text-xs uppercase tracking-[0.2em] font-medium pb-2 transition-all duration-300 border-b relative ${
                  filter === cat.id
                    ? "text-[#dfba6b] border-[#dfba6b]"
                    : "text-zinc-300 border-transparent hover:text-white"
                }`}
                style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden bg-white/5 border border-white/50 aspect-[4/3] md:aspect-auto md:h-[450px] ${project.size} transition-all duration-500 hover:border-gold/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)]`}
            >
              {/* Image Container with zoom effect */}
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={project.src}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 ease-out md:group-hover:scale-105"
                  priority={project.id <= 2}
                />
                {/* Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent opacity-85 md:opacity-60 md:group-hover:opacity-85 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Text Info */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10 pointer-events-none z-10">
                <span 
                  className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2 block md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                >
                  {project.location}
                </span>
                <h3 
                  className="text-xl md:text-2xl font-light text-white mb-2 font-serif md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
                >
                  {project.title}
                </h3>
                <p 
                  className="text-xs text-zinc-300 font-light leading-relaxed max-w-md md:h-0 md:opacity-0 md:overflow-hidden md:group-hover:h-auto md:group-hover:opacity-100 transition-all duration-700 delay-75"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
                >
                  {project.desc}
                </p>
              </div>

              {/* Top border highlight on hover */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gold/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
