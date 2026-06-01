import React from "react";

export default function Services() {
  const services = [
    {
      num: "01",
      title: "Residential Architecture",
      desc: "Creating private sanctuaries. We design custom luxury homes, penthouses, and estates tailored to the unique narratives of their inhabitants.",
      details: ["Bespoke Layouts", "Spatial Optimization", "Material Curation", "3D Rendering"],
    },
    {
      num: "02",
      title: "Commercial & Retail",
      desc: "Architecting spaces that elevate brands. From luxury showrooms and boutiques to inspiring offices that optimize creativity and collaboration.",
      details: ["Identity Integration", "Flow Analysis", "Lighting Architecture", "Ergonomic Layouts"],
    },
    {
      num: "03",
      title: "Bespoke Furniture Design",
      desc: "Tailoring unique centerpieces. We design custom furniture, millwork, and lighting fixtures crafted by world-class artisans.",
      details: ["Noble Materials", "Custom Fabrication", "Artisanal Collaboration", "Detail Drafting"],
    },
    {
      num: "04",
      title: "Interior Styling & Art Curation",
      desc: "Adding the final touches of soul. Curation of rare artworks, sculptures, custom fabrics, and accessories to tie the environment together.",
      details: ["Fine Art Sourcing", "Textile Styling", "Color Choreography", "Antique Acquisition"],
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 bg-transparent relative overflow-hidden">
      {/* Background radial gold glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-[#c5a880]/8 blur-[130px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#c5a880]/4 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span 
            className="text-xs uppercase tracking-[0.4em] text-[#a88959] font-mono mb-4 block font-semibold"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
          >
            Our Specialties
          </span>
          <h2 
            className="text-3xl md:text-5xl font-light tracking-wide text-[#fcfaf7] font-serif leading-tight"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
          >
            We translate architectural vision into physical emotions.
          </h2>
          <div className="w-16 h-[1px] bg-gold mt-6" />
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative w-full aspect-[0.9] xs:aspect-[1.05] sm:aspect-[1.45] md:aspect-[1.3] lg:aspect-[1.5] flex flex-col justify-between items-center text-center px-[15%] pt-[13%] pb-[18%] xs:px-[14%] xs:pt-[12%] xs:pb-[16%] sm:px-[13%] sm:pt-[11%] sm:pb-[15%] transition-all duration-500 hover:-translate-y-1 rounded-sm overflow-hidden bg-[#0f0a06]/45 backdrop-blur-[2.5px]"
            >
              {/* Ornate Gold Frame Overlay on Top */}
              <div
                style={{
                  backgroundImage: "url('/card-bg/77d1273a-a7aa-4f3b-a057-5c6413345f64.png')",
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat"
                }}
                className="absolute inset-0 pointer-events-none z-20 drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)] group-hover:drop-shadow-[0_18px_35px_rgba(168,137,89,0.28)] transition-all duration-500"
              />

              {/* Top Content: Number and Title */}
              <div className="w-full flex flex-col items-center z-10">
                <span className="text-[10px] xs:text-xs sm:text-sm font-light text-[#dfba6b] font-serif tracking-wider select-none block mb-1">
                  {service.num}
                </span>
                <h3 className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-serif text-[#fcfaf7] font-bold tracking-wide leading-tight mb-2">
                  {service.title}
                </h3>
              </div>

              {/* Middle Content: Description */}
              <div className="w-full flex flex-col items-center my-auto py-1 sm:py-2 z-10">
                <p className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-zinc-200 font-sans font-light leading-relaxed max-w-md line-clamp-2 xs:line-clamp-3 sm:line-clamp-4 md:line-clamp-none">
                  {service.desc}
                </p>
              </div>

              {/* Bottom Content: Divider and Tags */}
              <div className="w-full flex flex-col items-center z-10">
                <div className="w-6 sm:w-12 h-[1px] bg-[#dfba6b]/40 mb-1.5 sm:mb-3" />
                <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 sm:gap-x-4 sm:gap-y-2 text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs font-medium tracking-wider text-[#e5cfa3] uppercase font-sans">
                  {service.details.map((detail, idx) => (
                    <span key={idx} className="hover:text-white transition-colors duration-300">
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

