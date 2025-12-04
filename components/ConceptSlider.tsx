"use client";

import { useEffect, useMemo, useState } from "react";
import SectionWrapper from "@/components/SectionWrapper";

const sampleCards = [
  {
    title: "Aurora Halo Ring",
    meta: "18K Rose Gold • Minimal",
    gradient: "from-[#FACC6B]/30 via-rose-400/20 to-white/10",
  },
  {
    title: "Celestial Cascade Cuff",
    meta: "Platinum • Modern",
    gradient: "from-cyan-400/25 via-[#FACC6B]/20 to-white/10",
  },
  {
    title: "Luminous Pendant",
    meta: "22K Gold • Bridal",
    gradient: "from-amber-300/30 via-[#FACC6B]/30 to-white/10",
  },
];

const CARD_GAP = 16;

const ConceptSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardHeight, setCardHeight] = useState(220);
  const totalSlides = useMemo(() => sampleCards.length, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 3200);
    return () => clearInterval(interval);
  }, [totalSlides]);

  useEffect(() => {
    const setHeight = () => {
      const isSmall = window.innerWidth < 640;
      setCardHeight(isSmall ? 180 : 220);
    };
    setHeight();
    window.addEventListener("resize", setHeight);
    return () => window.removeEventListener("resize", setHeight);
  }, []);

  const slideStep = cardHeight + CARD_GAP;

  return (
    <SectionWrapper>
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Concepts</p>
        <h2 className="text-3xl font-[var(--font-playfair)] text-white sm:text-4xl">
          A rotating peek at Manki.ai ideas.
        </h2>
      </div>
      <div className="relative mt-6">
        <div className="absolute inset-0 -z-10 rounded-3xl bg-[radial-gradient(circle_at_20%_20%,rgba(250,204,107,0.14),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.12),transparent_35%)] blur-3xl" />
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-2xl shadow-black/40 backdrop-blur">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(250,204,107,0.10),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.10),transparent_45%)]"
            aria-hidden
          />
          <div
            className="relative overflow-hidden px-4 sm:px-6"
            style={{ height: cardHeight }}
          >
            <div
              className="flex flex-col gap-4 transition-transform duration-700 ease-in-out"
              style={{ transform: `translateY(-${activeIndex * slideStep}px)` }}
            >
              {sampleCards.map((card) => (
                <div
                  key={card.title}
                  style={{ height: cardHeight }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/40 backdrop-blur"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
                    aria-hidden
                  />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                        Concept
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-white font-[var(--font-playfair)]">
                        {card.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-300">{card.meta}</p>
                    </div>
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-black/40 text-[#FACC6B] shadow-inner shadow-black/50">
                      <span className="text-sm font-semibold">AI</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex items-center justify-end gap-2 px-6 pb-4 pt-2">
            {sampleCards.map((_, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    isActive ? "w-8 bg-[#FACC6B]" : "w-2.5 bg-white/30"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ConceptSlider;
