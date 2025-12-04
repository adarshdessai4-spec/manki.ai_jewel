"use client";

import { useEffect, useState } from "react";
import StartDesigningButton from "@/components/StartDesigningButton";
import GoldRatesCard from "@/components/GoldRatesCard";
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
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);
  const [config, setConfig] = useState<DesignConfig>(defaultConfig);
  const [designs, setDesigns] = useState<GeneratedDesign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const syncAuth = () => setIsAuthed(sessionStorage.getItem("manki_session_auth") === "true");
    syncAuth();
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

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

  if (isAuthed === false) {
    return (
      <div className="py-16">
        <div className="mx-auto max-w-2xl space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-xl shadow-black/40 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Restricted</p>
          <h1 className="text-3xl font-[var(--font-playfair)] text-white">Login required</h1>
          <p className="text-slate-300">
            Please log in to access the AI Design Studio and generate concepts.
          </p>
          <div className="flex justify-center">
            <StartDesigningButton
              label="Login to continue"
              targetPath="/studio"
              forceModal
              className="inline-flex items-center justify-center rounded-full bg-[#FACC6B] px-6 py-3 text-sm font-semibold text-[#0f0f0f] hover:text-[#0f0f0f] focus-visible:text-[#0f0f0f] active:text-[#0f0f0f] shadow-lg shadow-[#FACC6B]/40 transition-all duration-200 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FACC6B]"
            />
          </div>
        </div>
      </div>
    );
  }

  if (isAuthed === null) {
    return <div className="py-16 text-center text-slate-300">Checking access…</div>;
  }

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

      <div className="mb-8">
        <GoldRatesCard />
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
