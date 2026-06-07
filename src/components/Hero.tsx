/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronsDown, Sparkles, Smartphone, Laptop } from 'lucide-react';
import { getYouTubeID } from '../utils';

interface HeroProps {
  heroVerticalUrl: string;
  heroHorizontalUrl: string;
}

const rotatingWords = [
  "Conecta con tu audiencia",
  "Retén la atención del primer frame",
  "Convierte vistas en resultados",
  "Haz que el algoritmo trabaje para ti"
];

export default function Hero({ heroVerticalUrl, heroHorizontalUrl }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const vertId = getYouTubeID(heroVerticalUrl);
  const horizId = getYouTubeID(heroHorizontalUrl);

  return (
    <section className="pt-24 md:pt-28 min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background radial soft light glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[280px] sm:w-[500px] md:w-[700px] h-[280px] sm:h-[500px] md:h-[700px] rounded-full bg-indigo-500/[0.04] blur-[100px] md:blur-[140px]" 
          style={{ animation: 'pulseGlow 8s ease-in-out infinite' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full py-12 lg:py-16 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[9px] font-semibold tracking-widest uppercase text-white/50">
            Disponible para proyectos
          </span>
        </div>

        {/* Dynamic Title */}
        <h1 className="text-3.5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl mx-auto">
          No solo edito videos.<br />
          <span className="text-shimmer">Creo piezas que convierten.</span>
        </h1>

        {/* Word Rotation Widget */}
        <div className="mt-6 h-10 flex items-center justify-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={wordIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-sm sm:text-base md:text-lg text-indigo-400 font-medium flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-indigo-300 fill-indigo-400/20" />
              {rotatingWords[wordIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Frame Showcases */}
        <div className="mt-14 md:mt-20 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          
          {/* Vertical Phone Device */}
          <div className="relative flex flex-col items-center">
            <div className="phone-frame">
              <div className="phone-notch"></div>
              <div className="phone-screen bg-neutral-900">
                {vertId ? (
                  <iframe 
                    src={`https://www.youtube.com/embed/${vertId}?autoplay=1&mute=1&loop=1&playlist=${vertId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&enablejsapi=1`} 
                    allow="autoplay; encrypted-media" 
                    title="Vertical Content Preview"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white/30 text-xs">
                    <Smartphone className="w-8 h-8 mb-2 opacity-50" />
                    Introduce link de YouTube para ver video vertical
                  </div>
                )}
                {/* Visual live label with flashing indicator */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#020202]/70 backdrop-blur-md border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                  <span className="text-[8px] font-mono font-medium tracking-wider text-white">9:16 REELS</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/30 via-transparent to-transparent pointer-events-none z-10" />
              </div>
              <div className="phone-home"></div>
            </div>
            
            <div className="mt-4 text-center">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-white/30">
                Contenido Vertical
              </span>
              <p className="text-xs text-white/50 mt-1">Reels · TikToks · Shorts</p>
            </div>
          </div>

          {/* Connect separator lines */}
          <div className="hidden lg:flex flex-col items-center gap-3 opacity-20">
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-indigo-500"></div>
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            <div className="w-px h-16 bg-gradient-to-b from-indigo-500 to-transparent"></div>
          </div>

          {/* Horizontal Laptop Device */}
          <div className="relative flex flex-col items-center w-full max-w-[440px]">
            <div className="laptop-frame w-full">
              <div className="laptop-screen-frame bg-neutral-900">
                <div className="laptop-notch-dot"></div>
                <div className="laptop-screen">
                  {horizId ? (
                    <iframe 
                      src={`https://www.youtube.com/embed/${horizId}?autoplay=1&mute=1&loop=1&playlist=${horizId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&enablejsapi=1`} 
                      allow="autoplay; encrypted-media" 
                      title="Horizontal Content Preview"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white/30 text-xs aspect-video">
                      <Laptop className="w-8 h-8 mb-2 opacity-50" />
                      Introduce link de YouTube para ver video horizontal
                    </div>
                  )}
                  {/* Visual live label & aspect */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#020202]/70 backdrop-blur-md border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                    <span className="text-[8px] font-mono font-medium tracking-wider text-white">16:9 WIDE</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/30 via-transparent to-transparent pointer-events-none z-10" />
                </div>
              </div>
              <div className="laptop-base"></div>
            </div>

            <div className="mt-4 text-center">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-white/30">
                Contenido Horizontal
              </span>
              <p className="text-xs text-white/50 mt-1">YouTube · Comerciales · Documentales</p>
            </div>
          </div>

        </div>

        {/* Scroll Hint */}
        <div className="mt-16 flex flex-col items-center gap-1.5 text-white/20 hover:text-white/40 transition-colors cursor-pointer">
          <span className="text-[9px] font-semibold tracking-widest uppercase">
            Descubre mi trabajo
          </span>
          <ChevronsDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
