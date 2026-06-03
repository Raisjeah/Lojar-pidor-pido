/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Truck, Heart } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  badge: string;
  subtitle: string;
  desc: string;
  bgClass: string;
  accentText: string;
  accentBg: string;
  ctaText: string;
}

export default function BannerSlider({ onCtaClick }: { onCtaClick: () => void }) {
  const [current, setCurrent] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      badge: 'PROPORTION SPECIALS',
      title: 'EDISYUN LOKAL "TIMOR PRIDE"',
      subtitle: 'Premium Tais Culture Collection 🇹🇱',
      desc: 'Husi koze modernu ho toke tradisionál Tais Timor. Hoodie, sapatu, no xapeu ho kualidade aas durbabel.',
      bgClass: 'bg-gradient-to-tr from-[#660022] to-[#990033]',
      accentText: 'text-timoryellow',
      accentBg: 'bg-[#FFEE44] text-maroon hover:bg-[#FFEE44]/90',
      ctaText: 'Haree Produtu'
    },
    {
      id: 2,
      badge: 'CAMPANHA PROMOCIONAL',
      title: 'FRETE GRÁTIS EM DILI DEIT!',
      subtitle: 'Apenas Hoje - Promoção Especial 📦',
      desc: "Iha parte Munisípiu Dili la selu taxa transportador (Gratis Ongkir). Ami entrega to'o oituan oituan nia odomat.",
      bgClass: 'bg-gradient-to-tr from-[#DD1C39] to-[#FF6666]',
      accentText: 'text-white',
      accentBg: 'bg-[#660022] hover:bg-[#660022]/90 text-white',
      ctaText: 'Sosa Agora'
    },
    {
      id: 3,
      badge: 'AKSESÓRIOS ESPETAKULÁR',
      title: 'JOIAS E RELÓJI PREMIUM',
      subtitle: 'Style of Tomorrow, in Dili Today ⏱️',
      desc: "Dili Chrono leather watch, anting, ouklu retro ho kualidade as. Zoom detalle ki'ik sira ho lense visual.",
      bgClass: 'bg-gradient-to-tr from-[#330011] to-[#660022]',
      accentText: 'text-[#FFEE44]',
      accentBg: 'bg-[#FFEE44] text-maroon hover:bg-[#FFEE44]/90',
      ctaText: 'Hili Akesórios'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  // Emojis for floating right items
  const getItemEmoji = (id: number) => {
    if (id === 1) return '👕';
    if (id === 2) return '🚚';
    return '⏱️';
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#660022] rounded-3xl shadow-md h-[340px] md:h-[380px] border border-slate-100">
      {/* Absolute top ribbon banner strip */}
      <div className="absolute top-0 left-0 right-0 py-1.5 bg-[#FFEE44] text-[#660022] text-[10px] md:text-xs font-bold text-center tracking-widest uppercase flex items-center justify-center gap-1.5 px-4 z-20 shadow-xs">
        <Truck size={12} /> FRETE GRÁTIS EM DILI! APENAS HOJE! <Heart size={10} className="fill-maroon" />
      </div>

      {/* Banner list */}
      <div 
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div 
            key={slide.id}
            className={`min-w-full h-full flex items-center px-6 md:px-16 text-white ${slide.bgClass} relative pt-8`}
          >
            {/* Blurry organic blob from Sleek design */}
            <div className="absolute right-[-50px] top-[-50px] w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute left-[-100px] bottom-[-100px] w-72 h-72 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

            {/* Slide Content layout: split layout */}
            <div className="w-full md:w-2/3 flex flex-col z-10 text-left">
              <span className="bg-white/15 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block w-fit shadow-xs">
                {slide.badge}
              </span>
              
              <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-none mb-2 text-white">
                {slide.title}
              </h1>
              
              <p className={`text-base md:text-lg font-semibold ${slide.accentText} mb-2`}>
                {slide.subtitle}
              </p>
              
              <p className="text-white/80 text-xs md:text-sm leading-relaxed mb-5 max-w-lg">
                {slide.desc}
              </p>

              <div>
                <button
                  id={`banner-cta-btn-${slide.id}`}
                  onClick={onCtaClick}
                  className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold tracking-wide transition-all duration-350 transform hover:scale-105 active:scale-95 shadow-sm cursor-pointer ${slide.accentBg}`}
                >
                  {slide.ctaText}
                </button>
              </div>
            </div>

            {/* Right side floating category badge from Sleek HTML */}
            <div className="hidden md:flex md:w-1/3 justify-center z-10">
              <div className="w-36 h-36 bg-white/15 rounded-full flex items-center justify-center border-4 border-white/35 border-dashed animate-pulse duration-3000">
                <span className="text-5xl">{getItemEmoji(slide.id)}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Manual direction navigators */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer hidden sm:flex z-20 backdrop-blur-xs border border-white/10"
      >
        <ChevronLeft size={18} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer hidden sm:flex z-20 backdrop-blur-xs border border-white/10"
      >
        <ChevronRight size={18} />
      </button>

      {/* Progress indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-350 cursor-pointer ${
              current === i ? 'w-8 bg-[#FFEE44]' : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
