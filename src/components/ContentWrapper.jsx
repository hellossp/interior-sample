"use client";

import React from "react";
import Image from "next/image";

export default function ContentWrapper({ children }) {
  return (
    <div className="relative w-full min-h-screen">
      {/* Background layer: Single unblurred, bright hallway image */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <Image 
          src="/web-bg/give_me_the_background_image_202606012236.jpeg" 
          alt="Luxury Hallway Background"
          fill
          className="object-cover"
          priority
        />
        {/* Warm semi-transparent dark overlay to mute the bright, busy background details for text readability */}
        <div className="absolute inset-0 bg-[#0d0a07]/50 pointer-events-none" />
        {/* Very subtle top gradient just to transition from Hero's dark bottom edge, fading out quickly */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/40 via-transparent to-transparent h-48 pointer-events-none" />
      </div>

      {/* Actual page sections */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}

