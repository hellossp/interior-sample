"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function Portfolio() {
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalMounted, setIsModalMounted] = useState(false);

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
      fullDesc: "Designed as a serene retreat from urban intensity, this living environment pairs the raw, tactile texture of industrial concrete walls with the refined elegance of bespoke brushed brass details. Custom-designed low profile seating and Belgian linen curtains balance the acoustics of the high-ceilinged room, while linear shadow gaps create clean boundaries between floor, walls, and ceiling planes.",
      src: "/portfolio_living.png",
      size: "md:col-span-2 md:row-span-1",
      location: "Geneva, Switzerland",
      client: "Private Resident",
      year: "2025",
      scope: "Interior Design & Space Planning",
    },
    {
      id: 2,
      title: "The Obsidian Kitchen",
      category: "residential",
      desc: "Sleek kitchen architecture combining dark brushed oak cabinets and custom white marble features.",
      fullDesc: "A masterclass in contrast, shadow, and functionality. This kitchen architectural design is anchored by a monolithic 4-meter island of pure white Calacatta marble, set against floor-to-ceiling custom oak cabinetry finished in a deep matte obsidian stain. All storage and high-end appliances are hidden behind touch-latch panels to maintain clean architectural sightlines.",
      src: "/portfolio_kitchen.png",
      size: "md:col-span-1 md:row-span-1",
      location: "Milan, Italy",
      client: "Vance Design Group",
      year: "2024",
      scope: "Kitchen Architecture & Material Spec",
    },
    {
      id: 3,
      title: "Velvet Haven Suite",
      category: "furniture",
      desc: "Bespoke bedroom styling featuring a custom velvet headboard, oak wall detailing, and warm ambient light.",
      fullDesc: "Crafted to embody luxury hospitality in a private home, the Velvet Haven Suite is centered on a bespoke floor-to-ceiling fluted headboard, upholstered in a rich forest-green velvet. Framed by custom-stained white oak wall paneling, the suite features integrated dimmable LED reading lights and floating side tables carved from solid travertine stone.",
      src: "/portfolio_bedroom.png",
      size: "md:col-span-1 md:row-span-1",
      location: "London, UK",
      client: "Boutique Hotel Residence",
      year: "2025",
      scope: "Bespoke Furnishing & Lighting",
    },
    {
      id: 4,
      title: "The Gilded Library Lounge",
      category: "commercial",
      desc: "Sophisticated library lounge for a private club, complete with custom floor-to-ceiling shelving.",
      fullDesc: "Created for an exclusive members club, the Gilded Library Lounge blends traditional literary warmth with modern spatial luxury. It features custom-designed floor-to-ceiling walnut bookcases, an integrated wet bar behind slide-away doors, and curated vintage lounge seating reupholstered in mohair and deep cognac-colored Italian leather.",
      src: "/portfolio_lounge.png",
      size: "md:col-span-2 md:row-span-1",
      location: "New York, USA",
      client: "The Gilded Club",
      year: "2026",
      scope: "Commercial Space Planning & Furnishing",
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  // Manage body scroll lock and modal animations
  useEffect(() => {
    if (selectedProject) {
      document.body.classList.add("no-scroll");
      // Small timeout to trigger CSS transition after mounting
      const t = setTimeout(() => setIsModalMounted(true), 50);
      return () => {
        clearTimeout(t);
        document.body.classList.remove("no-scroll");
      };
    } else {
      setIsModalMounted(false);
    }
  }, [selectedProject]);

  const handleCloseModal = () => {
    setIsModalMounted(false);
    // Wait for fadeout animation before unmounting state
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  };

  return (
    <section id="portfolio" className="py-24 md:py-32 px-6 md:px-12 bg-transparent relative overflow-hidden">
      {/* Background radial gold glows */}
      <div className="absolute -top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gold/8 blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gold/4 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <RevealOnScroll direction="up" duration={800}>
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
        </RevealOnScroll>

        {/* Portfolio Grid */}
        <RevealOnScroll direction="up" duration={1000} delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group relative overflow-hidden bg-white/5 border border-white/50 aspect-[4/3] md:aspect-auto md:h-[450px] ${project.size} transition-all duration-500 hover:border-gold/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] cursor-pointer text-left w-full block clickable-card`}
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
                  
                  {/* Micro interaction CTA text in card */}
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#e5cfa3] mt-3 block opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Explore Project &rarr;
                  </span>
                </div>

                {/* Top border highlight on hover */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gold/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10 pointer-events-none" />
              </button>
            ))}
          </div>
        </RevealOnScroll>
      </div>

      {/* Lightbox / Details Modal */}
      {selectedProject && (
        <div 
          onClick={handleCloseModal}
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#050508]/85 backdrop-blur-md transition-opacity duration-300 flex-col ${
            isModalMounted ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Modal Container */}
          <div 
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
            className={`bg-[#0f0a06]/95 border border-[#a88959]/35 max-w-5xl w-full max-h-[90vh] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row shadow-[0_24px_60px_rgba(0,0,0,0.85)] rounded-sm transition-all duration-500 transform ${
              isModalMounted ? "translate-y-0 scale-100" : "translate-y-8 scale-95"
            }`}
          >
            {/* Close Button Mobile */}
            <button 
              onClick={handleCloseModal}
              className="md:hidden absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white"
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Left Column: Image Section */}
            <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-0 md:h-[600px] bg-[#0b0c10] overflow-hidden">
              <Image 
                src={selectedProject.src}
                alt={selectedProject.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Right Column: Narrative Section */}
            <div className="w-full md:w-1/2 p-8 sm:p-10 md:p-12 flex flex-col justify-between overflow-y-auto relative h-full md:max-h-[600px]">
              {/* Close Button Desktop */}
              <button 
                onClick={handleCloseModal}
                className="hidden md:flex absolute top-6 right-6 text-zinc-400 hover:text-gold transition-colors duration-300 w-8 h-8 items-center justify-center text-xl focus:outline-none"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="pr-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-mono font-medium block mb-2">
                  {selectedProject.location}
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-light text-white font-serif tracking-wide leading-tight mb-6">
                  {selectedProject.title}
                </h3>

                <p className="text-sm text-zinc-300 font-light leading-relaxed mb-8">
                  {selectedProject.fullDesc}
                </p>

                {/* Project Specs Table */}
                <div className="border-t border-white/10 pt-6 space-y-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-500 uppercase tracking-wider font-mono">Client</span>
                    <span className="text-zinc-200 font-light">{selectedProject.client}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-3">
                    <span className="text-zinc-500 uppercase tracking-wider font-mono">Year</span>
                    <span className="text-zinc-200 font-light">{selectedProject.year}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-3">
                    <span className="text-zinc-500 uppercase tracking-wider font-mono">Category</span>
                    <span className="text-zinc-200 font-light capitalize">{selectedProject.category}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-3">
                    <span className="text-zinc-500 uppercase tracking-wider font-mono">Scope</span>
                    <span className="text-zinc-200 font-light">{selectedProject.scope}</span>
                  </div>
                </div>
              </div>

              {/* Action Button inside Modal */}
              <div className="mt-8 md:mt-12 border-t border-white/10 pt-6">
                <a 
                  href="#contact"
                  onClick={handleCloseModal}
                  className="inline-flex items-center text-xs uppercase tracking-[0.2em] text-gold hover:text-white transition-colors duration-300 font-semibold group"
                >
                  Inquire About Similar Designs 
                  <span className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
