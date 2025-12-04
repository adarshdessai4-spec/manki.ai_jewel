"use client";

import { useEffect, useState } from "react";
import { GeneratedDesign } from "@/types/design";
import { Eye, Heart, HeartOff, Sparkles, Rotate3d } from "lucide-react";
import Design360Viewer from "@/components/Design360Viewer";

interface StudioResultsGridProps {
  designs: GeneratedDesign[];
  isLoading: boolean;
  onToggleSave: (id: string) => void;
}

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const skeletonCards = Array.from({ length: 4 });

const StudioResultsGrid = ({ designs, isLoading, onToggleSave }: StudioResultsGridProps) => {
  const [activeDesignId, setActiveDesignId] = useState<string | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const activeDesign = designs.find((d) => d.id === activeDesignId) ?? null;

  useEffect(() => {
    if (!isViewerOpen) {
      setActiveDesignId(null);
    }
  }, [isViewerOpen]);

  if (isLoading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2">
        {skeletonCards.map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse rounded-3xl border border-white/10 bg-white/5 p-4"
          >
            <div className="aspect-[4/3] rounded-2xl bg-white/10" />
            <div className="mt-4 space-y-3">
              <div className="h-4 w-2/3 rounded-full bg-white/10" />
              <div className="h-3 w-1/2 rounded-full bg-white/10" />
              <div className="flex gap-2">
                <span className="h-6 w-16 rounded-full bg-white/10" />
                <span className="h-6 w-16 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!designs.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-slate-300">
        <Sparkles className="h-8 w-8 text-[#FACC6B]" />
        <p className="mt-4 text-lg font-semibold text-white">No designs yet</p>
        <p className="mt-2 text-sm text-slate-400">
          Start by choosing preferences and generating. Your concepts will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {designs.map((design) => (
        <div
          key={design.id}
          className="group rounded-3xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/40 transition-all duration-200 hover:-translate-y-1 hover:border-[#FACC6B]/60 hover:shadow-[#FACC6B]/30"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#FACC6B]/15 via-white/5 to-slate-900/60">
            <div className="aspect-[4/3]">
              <img
                src={design.imageUrl || "/diamond_hero_frame.png"}
                alt={`${design.name} AI preview`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.12),transparent_30%)]" />
            <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs text-slate-100 backdrop-blur">
              AI preview
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3 backdrop-blur">
              <span className="text-sm font-semibold text-white">{design.name}</span>
              <button
                type="button"
                onClick={() => onToggleSave(design.id)}
                className="rounded-full border border-white/20 bg-black/50 p-2 text-[#FACC6B] transition hover:border-[#FACC6B]/60"
                aria-label={design.isSaved ? "Unsave design" : "Save design"}
              >
                {design.isSaved ? <HeartOff className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{design.jewelleryType}</p>
                <h3 className="text-lg font-semibold text-white">{design.name}</h3>
                <p className="text-sm text-slate-300">{design.description}</p>
              </div>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200 border border-white/10">
                {formatPrice(design.estimatedPrice)}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs capitalize text-slate-200">
                {design.metal.replace(/_/g, " ")}
              </span>
              {design.styles.map((style) => (
                <span
                  key={style}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs capitalize text-slate-200"
              >
                {style.replace(/_/g, " ")}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => console.log("View details", design.id)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#FACC6B]"
              >
                <Eye className="h-4 w-4" /> View details
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveDesignId(design.id);
                  setIsViewerOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-[#FACC6B]/60 hover:text-[#FACC6B]"
              >
                <Rotate3d className="h-4 w-4" /> 3D view
              </button>
            </div>
            <span className="text-xs text-slate-400">
              Budget: {design.budgetRange.replace(/_/g, " ")}
            </span>
          </div>
          </div>
        </div>
      ))}
      {isViewerOpen && activeDesign && (
        <Design360Viewer
          name={activeDesign.name}
          imageUrl={activeDesign.imageUrl}
          onClose={() => setIsViewerOpen(false)}
        />
      )}
    </div>
  );
};

export default StudioResultsGrid;
