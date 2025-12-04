"use client";

import { DesignConfig, JewelleryType, MetalType, StyleTag } from "@/types/design";
import { Sparkles, SlidersHorizontal } from "lucide-react";

interface StudioSidebarProps {
  config: DesignConfig;
  onChange: (updated: DesignConfig) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const jewelleryTypes: { value: JewelleryType; label: string }[] = [
  { value: "ring", label: "Ring" },
  { value: "earrings", label: "Earrings" },
  { value: "necklace", label: "Necklace" },
  { value: "bracelet", label: "Bracelet" },
  { value: "pendant", label: "Pendant" },
  { value: "custom", label: "Custom" },
];

const metalOptions: { value: MetalType; label: string }[] = [
  { value: "gold_14k", label: "14K Gold" },
  { value: "gold_18k", label: "18K Gold" },
  { value: "gold_22k", label: "22K Gold" },
  { value: "platinum", label: "Platinum" },
  { value: "silver", label: "Silver" },
];

const styleTags: { value: StyleTag; label: string }[] = [
  { value: "minimal", label: "Minimal" },
  { value: "heavy", label: "Heavy" },
  { value: "vintage", label: "Vintage" },
  { value: "modern", label: "Modern" },
  { value: "traditional", label: "Traditional" },
  { value: "daily_wear", label: "Daily Wear" },
  { value: "bridal", label: "Bridal" },
];

const budgetOptions = [
  { value: "under_25k", label: "Under ₹25,000" },
  { value: "25k_75k", label: "₹25,000 - ₹75,000" },
  { value: "75k_plus", label: "₹75,000+" },
];

const StudioSidebar = ({ config, onChange, onGenerate, isLoading }: StudioSidebarProps) => {
  const toggleStyle = (style: StyleTag) => {
    const exists = config.styles.includes(style);
    const updatedStyles = exists
      ? config.styles.filter((s) => s !== style)
      : [...config.styles, style];

    onChange({ ...config, styles: updatedStyles });
  };

  return (
    <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/40 backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Design Studio</p>
          <h2 className="mt-2 text-2xl font-[var(--font-playfair)] text-white">Preferences</h2>
          <p className="mt-2 text-sm text-slate-300">
            Choose your preferences and let AI suggest unique patterns.
          </p>
        </div>
        <Sparkles className="h-6 w-6 text-[#FACC6B]" />
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <div className="flex items-center justify-between text-sm font-medium text-slate-200">
            <span>Jewellery type</span>
            <span className="text-xs text-slate-500">Select one</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-3">
            {jewelleryTypes.map((item) => {
              const isActive = config.jewelleryType === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => onChange({ ...config, jewelleryType: item.value })}
                  className={`rounded-xl border px-3 py-2 text-sm transition-all duration-200 hover:border-[#FACC6B]/60 hover:bg-white/5 ${
                    isActive
                      ? "border-[#FACC6B] bg-[#FACC6B]/15 text-white"
                      : "border-white/10 text-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm font-medium text-slate-200">
            <span>Metal</span>
            <span className="text-xs text-slate-500">Choose base</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {metalOptions.map((item) => {
              const isActive = config.metal === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => onChange({ ...config, metal: item.value })}
                  className={`rounded-xl border px-3 py-2 text-sm transition-all duration-200 hover:border-[#FACC6B]/60 hover:bg-white/5 ${
                    isActive
                      ? "border-[#FACC6B] bg-[#FACC6B]/15 text-white"
                      : "border-white/10 text-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm font-medium text-slate-200">
            <span>Styles</span>
            <span className="text-xs text-slate-500">Multi-select</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {styleTags.map((tag) => {
              const isActive = config.styles.includes(tag.value);
              return (
                <button
                  key={tag.value}
                  type="button"
                  onClick={() => toggleStyle(tag.value)}
                  className={`rounded-full border px-4 py-2 text-xs transition-all duration-200 hover:border-[#FACC6B]/60 hover:bg-white/5 ${
                    isActive
                      ? "border-[#FACC6B] bg-[#FACC6B]/15 text-white"
                      : "border-white/10 text-slate-200"
                  }`}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Combine vibes like Minimal + Bridal for unique contrasts.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm font-medium text-slate-200">
            <span>Budget range</span>
            <span className="text-xs text-slate-500">Estimated</span>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {budgetOptions.map((option) => {
              const isActive = config.budgetRange === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onChange({ ...config, budgetRange: option.value as DesignConfig["budgetRange"] })}
                  className={`rounded-xl border px-3 py-2 text-sm transition-all duration-200 hover:border-[#FACC6B]/60 hover:bg-white/5 ${
                    isActive
                      ? "border-[#FACC6B] bg-[#FACC6B]/15 text-white"
                      : "border-white/10 text-slate-200"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm font-medium text-slate-200">
            <span>Describe your idea</span>
            <span className="text-xs text-slate-500">Optional prompt</span>
          </div>
          <textarea
            value={config.prompt ?? ""}
            onChange={(e) => onChange({ ...config, prompt: e.target.value })}
            placeholder="Example: A delicate platinum ring with marquise diamonds and art deco filigree."
            className="mt-3 w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#FACC6B] focus:outline-none"
            rows={3}
          />
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Prompts help the AI propose more precise motifs.</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onGenerate}
        disabled={isLoading}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FACC6B] px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-[#FACC6B]/40 transition-all duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? "Generating…" : "Generate Designs"}
      </button>
    </aside>
  );
};

export default StudioSidebar;
