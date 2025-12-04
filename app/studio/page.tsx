"use client";

import { useState } from "react";
import StudioSidebar from "@/components/studio/StudioSidebar";
import StudioResultsGrid from "@/components/studio/StudioResultsGrid";
import { DesignConfig, GeneratedDesign } from "@/types/design";
import { generateMockDesigns } from "@/lib/mockGenerator";

const defaultConfig: DesignConfig = {
  jewelleryType: "ring",
  metal: "gold_18k",
  styles: ["minimal"],
  budgetRange: "25k_75k",
  prompt: "",
};

const StudioPage = () => {
  const [config, setConfig] = useState<DesignConfig>(defaultConfig);
  const [designs, setDesigns] = useState<GeneratedDesign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await generateMockDesigns(config);
      setDesigns(results);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while generating designs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleSave = (id: string) => {
    setDesigns((prev) =>
      prev.map((design) =>
        design.id === id ? { ...design, isSaved: !design.isSaved } : design
      )
    );
  };

  return (
    <div className="py-10 lg:py-16">
      <div className="mb-8 space-y-3 text-center lg:text-left">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Studio</p>
        <h1 className="text-3xl font-[var(--font-playfair)] text-white sm:text-4xl">
          AI Design Studio
        </h1>
        <p className="text-slate-300">
          Configure your preferences and let Manki.ai craft tailored jewellery concepts.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <StudioSidebar
          config={config}
          onChange={setConfig}
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />

        <div className="space-y-4">
          {error && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {error}
            </div>
          )}
          <StudioResultsGrid
            designs={designs}
            isLoading={isLoading}
            onToggleSave={handleToggleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default StudioPage;
