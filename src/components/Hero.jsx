"use client";

import React, { useEffect, useRef, useState } from "react";

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const introTextRef = useRef(null);
  const revealTextRef = useRef(null);
  const scrollCueRef = useRef(null);
  const imagesRef = useRef([]);
  const lastWidthRef = useRef(0);
  const viewportHeightRef = useRef(0);

  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  const totalFrames = 204;

  // Cover image drawing helper - keeps correct aspect ratio and centers image
  const drawImageProp = (ctx, img, x, y, w, h) => {
    const imgRatio = img.width / img.height;
    const canvasRatio = w / h;
    let sWidth, sHeight, sx, sy;

    if (imgRatio > canvasRatio) {
      sHeight = img.height;
      sWidth = img.height * canvasRatio;
      sx = (img.width - sWidth) / 2;
      sy = 0;
    } else {
      sWidth = img.width;
      sHeight = img.width / canvasRatio;
      sx = 0;
      sy = (img.height - sHeight) / 2;
    }

    // Floor all coordinates and sizes to prevent sub-pixel anti-aliasing frame jitter
    ctx.drawImage(
      img,
      Math.floor(sx),
      Math.floor(sy),
      Math.floor(sWidth),
      Math.floor(sHeight),
      x,
      y,
      w,
      h
    );
  };

  const resizeCanvas = (canvas) => {
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    // Use cached width/height to avoid flickering during mobile address bar resize
    const width = lastWidthRef.current || window.innerWidth;
    const height = viewportHeightRef.current || window.innerHeight;

    // Calculate scale factor to match viewport but clamp to image max size (1920x1080) to avoid upscale blur
    let scale = dpr;
    if (width * scale > 1920) {
      scale = 1920 / width;
    }
    if (height * scale > 1080) {
      scale = Math.min(scale, 1080 / height);
    }

    const expectedWidth = Math.floor(width * scale);
    const expectedHeight = Math.floor(height * scale);

    if (canvas.width !== expectedWidth || canvas.height !== expectedHeight) {
      canvas.width = expectedWidth;
      canvas.height = expectedHeight;
    }
  };

  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resizeCanvas(canvas);

    const img = imagesRef.current[index];
    // Check complete AND naturalWidth to ensure the image element is not in a 'broken' state
    if (img && img.complete && img.naturalWidth !== 0) {
      try {
        // Set high quality image smoothing to guarantee crisp textures
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawImageProp(ctx, img, 0, 0, canvas.width, canvas.height);
      } catch (e) {
        console.warn("Skipping broken image frame render at index:", index, e);
      }
    }
  };

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const tempImages = [];

    // Force scroll restoration to top on load so the animation starts correctly
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      lastWidthRef.current = window.innerWidth;
      viewportHeightRef.current = window.innerHeight;
    }

    // Lock scroll while preloading
    document.body.classList.add("no-scroll");

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");

      img.onload = () => {
        loadedCount++;
        const pct = Math.round((loadedCount / totalFrames) * 100);
        setLoadProgress(pct);

        if (loadedCount === totalFrames) {
          setTimeout(() => {
            setLoaded(true);
            document.body.classList.remove("no-scroll");
            // Draw first frame
            setTimeout(() => {
              handleResize();
            }, 100);
          }, 600); // Small delay for smooth loader fadeout
        }
      };

      img.onerror = () => {
        // Fallback for errors to prevent lockup
        loadedCount++;
        const pct = Math.round((loadedCount / totalFrames) * 100);
        setLoadProgress(pct);
        if (loadedCount === totalFrames) {
          setLoaded(true);
          document.body.classList.remove("no-scroll");
        }
      };

      img.src = `/heroimages/ezgif-frame-${frameNum}.jpg`;
      tempImages.push(img);
    }

    imagesRef.current = tempImages;

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  // Handle Resize
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;

    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;

    // Guard: On mobile, scrolling hides/shows the address bar, changing innerHeight.
    // If width did not change, we skip the canvas resizing to avoid flickering/clearing the canvas.
    if (lastWidthRef.current === currentWidth) {
      return;
    }

    lastWidthRef.current = currentWidth;
    viewportHeightRef.current = currentHeight;

    resizeCanvas(canvas);

    // Redraw current frame
    const parentRect = containerRef.current.getBoundingClientRect();
    const totalHeight = parentRect.height - currentHeight;
    const scrolled = -parentRect.top;
    const progress = Math.min(Math.max(scrolled / totalHeight, 0), 1);
    const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
    drawFrame(frameIndex);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll animation handler
  useEffect(() => {
    if (!loaded) return;

    let ticking = false;

    const updateAnimation = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      const introText = introTextRef.current;
      const revealText = revealTextRef.current;
      const scrollCue = scrollCueRef.current;

      if (!container || !canvas) return;

      const rect = container.getBoundingClientRect();
      const currentHeight = viewportHeightRef.current || window.innerHeight;
      const totalHeight = rect.height - currentHeight;
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalHeight, 0), 1);

      if (scrolled > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }

      // Map progress to frame (0 to 203)
      const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
      drawFrame(frameIndex);

      // --- Style Mutations (Direct DOM for performance) ---

      // 1. Intro Text: Fades out from progress 0 to 0.25
      if (introText) {
        const introP = Math.min(progress / 0.25, 1);
        introText.style.opacity = String(1 - introP);
        introText.style.transform = `translate(-50%, -50%) translateY(${-introP * 80}px) scale(${1 - introP * 0.05})`;
        introText.style.pointerEvents = introP >= 1 ? "none" : "auto";
      }

      // 2. Scroll Cue: Fades out from progress 0 to 0.12
      if (scrollCue) {
        const cueP = Math.min(progress / 0.12, 1);
        scrollCue.style.opacity = String(1 - cueP);
        scrollCue.style.pointerEvents = cueP >= 1 ? "none" : "auto";
      }

      // 3. Reveal Text (inside door): Fades in 0.3 to 0.6, remains visible, then zooms/fades out 0.75 to 0.95
      if (revealText) {
        let opacity = 0;
        let scale = 0.85;

        if (progress >= 0.3 && progress < 0.6) {
          const p = (progress - 0.3) / 0.3;
          opacity = p;
          scale = 0.85 + p * 0.15;
        } else if (progress >= 0.6 && progress < 0.75) {
          opacity = 1;
          scale = 1.0;
        } else if (progress >= 0.75 && progress <= 0.95) {
          const p = (progress - 0.75) / 0.2;
          opacity = 1 - p;
          scale = 1.0 + p * 1.5;
        } else if (progress > 0.95) {
          opacity = 0;
          scale = 2.5;
        }

        revealText.style.opacity = String(opacity);
        revealText.style.transform = `translate(-50%, -50%) scale(${scale})`;
        revealText.style.pointerEvents = opacity <= 0.1 ? "none" : "auto";
      }

      // 4. Canvas Zoom and Fade: scale up and fade out from 0.80 to 1.0
      if (progress >= 0.80) {
        const zoomP = (progress - 0.80) / 0.20;
        const canvasScale = 1 + zoomP * 1.5; // Gentler zoom scaling
        const canvasOpacity = 1 - zoomP;

        canvas.style.transform = `scale(${canvasScale})`;
        canvas.style.opacity = String(canvasOpacity);
        canvas.style.pointerEvents = zoomP >= 0.98 ? "none" : "auto";
      } else {
        canvas.style.transform = "scale(1)";
        canvas.style.opacity = "1";
        canvas.style.pointerEvents = "auto";
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateAnimation();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial call to set state
    updateAnimation();

    return () => window.removeEventListener("scroll", onScroll);
  }, [loaded]);

  return (
    <>
      {/* Loading Screen Overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050508] transition-all duration-1000 ease-out ${
          loaded ? "opacity-0 pointer-events-none invisible" : "opacity-100"
        }`}
      >
        <div className="text-center px-4 max-w-lg">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a880] mb-2 block font-mono">
            Bespoke Architecture & Design
          </span>
          <h1 className="text-3xl md:text-5xl font-light tracking-[0.25em] text-white mb-8">
            ELEVÉ INTERIORS
          </h1>

          {/* Luxury loading bar */}
          <div className="relative w-48 md:w-64 h-[1px] bg-white/10 mx-auto overflow-hidden mb-4">
            <div
              className="absolute left-0 top-0 h-full bg-[#c5a880] transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>

          <div className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-mono">
            Entering Experience <span className="text-[#c5a880] font-bold ml-1">{loadProgress}%</span>
          </div>
        </div>
      </div>

      {/* Hero Scroll Wrapper */}
      <div ref={containerRef} className="relative w-full bg-transparent" style={{ height: "400vh" }}>
        {/* Sticky viewport */}
        <div className="sticky top-0 w-full overflow-hidden" style={{ height: "100vh" }}>
          {/* Canvas for rendering frames */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover origin-center"
            style={{
              transform: "translate3d(0,0,0)",
              willChange: "transform",
            }}
          />

          {/* Subtle vignette overlays to make text readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/40 via-transparent to-[#050508]/60 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,5,8,0.55)_0%,rgba(5,5,8,0.20)_50%,transparent_85%)] pointer-events-none" />

          {/* 1. Intro Typography Overlaid on Closed Doors */}
          <div
            ref={introTextRef}
            className="absolute left-1/2 top-1/2 text-center w-full max-w-4xl px-6 pointer-events-none transition-all duration-75 ease-out"
            style={{ 
              transform: "translate(-50%, -50%)",
              textShadow: "0 4px 20px rgba(5,5,8,0.95), 0 2px 6px rgba(5,5,8,0.9), 0 0 1px rgba(5,5,8,0.8)"
            }}
          >
            <span className="text-xs uppercase tracking-[0.25em] sm:tracking-[0.5em] text-[#c5a880] mb-3 block font-medium">
              Welcome to Luxury Living
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight tracking-[0.08em] sm:tracking-[0.2em] text-white leading-tight uppercase mb-5 font-serif">
              ELEVÉ INTERIORS
            </h2>
            <p className="text-xs sm:text-sm md:text-base font-light tracking-[0.1em] sm:tracking-[0.2em] text-zinc-200 max-w-xl mx-auto uppercase leading-relaxed">
              Sculpting space. Crafting experience.
            </p>
          </div>

          {/* 2. Reveal Typography (revealed INSIDE the opening doors) */}
          <div
            ref={revealTextRef}
            className="absolute left-1/2 top-1/2 text-center w-full max-w-3xl px-6 pointer-events-none opacity-0 transition-all duration-75 ease-out"
            style={{ 
              transform: "translate(-50%, -50%) scale(0.85)",
              textShadow: "0 4px 24px rgba(5,5,8,0.98), 0 2px 8px rgba(5,5,8,0.95), 0 0 1px rgba(5,5,8,0.9)"
            }}
          >
            <span className="text-xs uppercase tracking-[0.25em] sm:tracking-[0.6em] text-[#c5a880] mb-3 block">
              The Art of Space
            </span>
            <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[0.08em] sm:tracking-[0.15em] text-white leading-tight mb-5 font-serif">
              BEYOND THE EXPECTED
            </h3>
            <p className="text-[11px] sm:text-xs md:text-sm font-light tracking-[0.1em] sm:tracking-[0.25em] text-zinc-200 max-w-lg mx-auto uppercase leading-loose">
              We design timeless environments tailored to your sophisticated vision.
            </p>
          </div>

          {/* Scroll cue (mouse indicator) */}
          <div
            ref={scrollCueRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-300"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-mono">
              Scroll to Enter
            </span>
            <div className="w-5 h-9 border border-zinc-500 rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-[#c5a880] rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
