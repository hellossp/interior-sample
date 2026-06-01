"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "residential",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Scroll reveal door animation states and references
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  const [shouldRenderCanvas, setShouldRenderCanvas] = useState(true);

  const isFullyRevealedRef = useRef(false);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const lastIndexRef = useRef(0);

  // Cover image drawing helper
  const drawCoverImage = (ctx, img, width, height) => {
    ctx.clearRect(0, 0, width, height);

    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;
    if (!imgWidth || !imgHeight) return;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images = imagesRef.current;
    let img = images[index];

    // Fallback logic to show the nearest loaded frame if the target frame isn't loaded yet
    if (!img) {
      for (let i = 1; i < 121; i++) {
        const left = index - i;
        const right = index + i;
        if (left >= 0 && images[left]) {
          img = images[left];
          break;
        }
        if (right < 121 && images[right]) {
          img = images[right];
          break;
        }
      }
    }

    if (!img) return;

    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width || canvas.height !== rect.height) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    drawCoverImage(ctx, img, canvas.width, canvas.height);
  };

  // Preload frame images
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (imagesRef.current.length > 0) return; // Prevent duplicate execution in StrictMode

    const totalFrames = 121;
    const loadedImages = [];

    // Prepopulate array
    for (let i = 0; i < totalFrames; i++) {
      loadedImages.push(null);
    }

    // Load first frame immediately for immediate visual coverage
    const firstImg = new Image();
    firstImg.src = "/heroimages/ezgif-frame-001.jpg";
    firstImg.onload = () => {
      loadedImages[0] = firstImg;
      if (!isFullyRevealedRef.current) {
        drawFrame(0);
      }
    };

    // Preload remaining frames
    for (let i = 2; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/heroimages/ezgif-frame-${frameNum}.jpg`;
      const index = i - 1;
      img.onload = () => {
        loadedImages[index] = img;
        if (index === lastIndexRef.current && !isFullyRevealedRef.current) {
          drawFrame(index);
        }
      };
    }

    imagesRef.current = loadedImages;
  }, []);

  // Listen to window resizing to keep the current frame properly scaled
  useEffect(() => {
    const handleResize = () => {
      if (isFullyRevealedRef.current) return;
      drawFrame(lastIndexRef.current);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll events and map progress to door animation frames
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (isFullyRevealedRef.current) return;

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // 0.0 progress = top of container enters the bottom of the viewport
      // 1.0 progress = top of container is 15% from the top of the viewport
      const startScroll = viewportHeight;
      const endScroll = viewportHeight * 0.15;
      const totalDistance = startScroll - endScroll;

      if (totalDistance <= 0) return;

      const currentDistance = startScroll - rect.top;
      let progress = currentDistance / totalDistance;
      progress = Math.max(0, Math.min(1, progress));

      const frameIndex = Math.floor(progress * 120); // Scale to 0-120
      lastIndexRef.current = frameIndex;

      drawFrame(frameIndex);

      // Lock once fully revealed (one-way reveal)
      if (progress >= 1.0) {
        setIsFullyRevealed(true);
        isFullyRevealedRef.current = true;
        window.removeEventListener("scroll", handleScroll);

        // Unmount the canvas after the CSS fade-out finishes
        setTimeout(() => {
          setShouldRenderCanvas(false);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger initially in case it's already in view
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate luxury API response delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", projectType: "residential", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 bg-transparent relative overflow-hidden">
      {/* Background decoration blur with warm gold glow */}
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-gold/8 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute -top-12 left-1/4 w-[350px] h-[350px] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span
                className="text-xs uppercase tracking-[0.4em] text-[#a88959] font-mono mb-4 block font-semibold"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
              >
                Inquiries
              </span>
              <h2
                className="text-3xl md:text-5xl font-light tracking-wide text-[#fcfaf7] font-serif mb-8"
                style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
              >
                Let's Craft Your Sanctuary
              </h2>
              <p
                className="text-sm text-zinc-300 font-light leading-relaxed mb-12 max-w-sm"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
              >
                Whether you have an upcoming villa design, commercial build-out, or custom furniture project, our team is ready to bring your vision to life.
              </p>

              <div className="space-y-8">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#a88959] block mb-2 font-mono font-medium">
                    Global Office
                  </span>
                  <p
                    className="text-sm text-zinc-200 font-light"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
                  >
                    Rue du Rhône 42, 1204 Geneva, Switzerland
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#a88959] block mb-2 font-mono font-medium">
                    Direct Contact
                  </span>
                  <a
                    href="mailto:design@eleveinteriors.com"
                    className="text-sm text-zinc-200 hover:text-[#dfba6b] transition-colors duration-300 font-light block"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
                  >
                    design@eleveinteriors.com
                  </a>
                  <a
                    href="tel:+41225501900"
                    className="text-sm text-zinc-200 hover:text-[#dfba6b] transition-colors duration-300 font-light block mt-1"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
                  >
                    +41 (22) 550 1900
                  </a>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#a88959] block mb-2 font-mono font-medium">
                    Studio Hours
                  </span>
                  <p
                    className="text-sm text-zinc-200 font-light"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
                  >
                    Monday &mdash; Friday / 09:00 &mdash; 18:00 CET
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-10 mt-12 lg:mt-0">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#a88959] block mb-4 font-mono font-medium">
                Follow the Process
              </span>
              <div className="flex gap-6">
                {["Instagram", "Pinterest", "LinkedIn", "Vimeo"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-xs uppercase tracking-widest text-zinc-400 hover:text-[#dfba6b] transition-colors duration-300"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div
            ref={containerRef}
            style={{
              backgroundImage: "linear-gradient(rgba(45, 34, 25, 0.94), rgba(30, 22, 16, 0.97)), url('/wood_texture.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="lg:col-span-7 bg-[#2d2219] border border-[#a88959]/35 p-8 md:p-12 relative overflow-hidden shadow-[0_8px_32px_0_rgba(26,20,15,0.3)]"
          >
            {shouldRenderCanvas && (
              <canvas
                ref={canvasRef}
                className={`absolute inset-0 w-full h-full z-20 transition-opacity duration-1000 ${isFullyRevealed
                    ? "opacity-0 pointer-events-none"
                    : "pointer-events-auto opacity-100"
                  } hidden md:block`}
              />
            )}
            {submitted ? (
              <div
                style={{
                  backgroundImage: "linear-gradient(rgba(45, 34, 25, 0.98), rgba(30, 22, 16, 0.99)), url('/wood_texture.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#2d2219] z-10 transition-all duration-500"
              >
                <span className="text-4xl text-[#a88959] mb-6">&bull; &bull; &bull;</span>
                <h3 className="text-2xl font-light text-[#fcfaf7] font-serif mb-4 uppercase tracking-[0.1em]">
                  Consultation Request Received
                </h3>
                <p className="text-sm text-zinc-300 font-light leading-relaxed max-w-sm">
                  Thank you for reaching out. A Senior Architect from our team will contact you within 24 business hours to discuss your project.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-xs uppercase tracking-[0.2em] text-[#e5cfa3] border-b border-[#a88959]/40 hover:border-gold hover:text-gold pb-1 transition-all duration-300 font-light"
                >
                  Send another inquiry
                </button>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-10">
              <h3 className="text-xl font-light text-[#fcfaf7] tracking-[0.15em] uppercase font-serif pb-4 border-b border-white/10">
                Book a Consultation
              </h3>

              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-white/15 py-2.5 text-sm text-[#fcfaf7] focus:outline-none focus:border-[#a88959] transition-colors duration-300"
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 top-2.5 text-zinc-400 text-xs uppercase tracking-[0.25em] font-light pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#a88959] peer-focus:tracking-[0.3em] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#a88959]"
                >
                  Your Name
                </label>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-white/15 py-2.5 text-sm text-[#fcfaf7] focus:outline-none focus:border-[#a88959] transition-colors duration-300"
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-2.5 text-zinc-400 text-xs uppercase tracking-[0.25em] font-light pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#a88959] peer-focus:tracking-[0.3em] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#a88959]"
                >
                  Email Address
                </label>
              </div>

              {/* Project Type */}
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#a88959] block font-mono font-medium">
                  Project Type
                </span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { id: "residential", label: "Residential" },
                    { id: "commercial", label: "Commercial" },
                    { id: "furniture", label: "Bespoke" },
                  ].map((type) => (
                    <label
                      key={type.id}
                      className={`flex items-center justify-center border py-3 px-4 cursor-pointer text-xs uppercase tracking-[0.1em] transition-all duration-300 ${formData.projectType === type.id
                        ? "border-[#a88959] text-[#e5cfa3] bg-[#a88959]/10 font-medium"
                        : "border-white/15 text-zinc-400 hover:border-white/30 hover:text-white"
                        }`}
                    >
                      <input
                        type="radio"
                        name="projectType"
                        value={type.id}
                        checked={formData.projectType === type.id}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-white/15 py-2.5 text-sm text-[#fcfaf7] resize-none focus:outline-none focus:border-[#a88959] transition-colors duration-300"
                />
                <label
                  htmlFor="message"
                  className="absolute left-0 top-2.5 text-zinc-400 text-xs uppercase tracking-[0.25em] font-light pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#a88959] peer-focus:tracking-[0.3em] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#a88959]"
                >
                  Project Details
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#a88959] text-[#1a1714] hover:bg-gold hover:text-[#0b0c10] uppercase tracking-[0.25em] text-xs font-semibold py-4 flex items-center justify-center gap-2 disabled:opacity-50 transition-all duration-300"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-[#1a1714]" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Submit Project Inquiry"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
