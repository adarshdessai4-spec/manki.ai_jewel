"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import SectionWrapper from "@/components/SectionWrapper";
import StartDesigningButton from "@/components/StartDesigningButton";

const DashboardPage = () => {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => {
      const authed = sessionStorage.getItem("manki_session_auth") === "true";
      setIsAuthed(authed);
      if (authed) {
        router.replace("/studio");
      }
    };
    check();
    window.addEventListener("storage", check);
    return () => window.removeEventListener("storage", check);
  }, [router]);

  return (
    <SectionWrapper className="pt-12 pb-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/40 backdrop-blur">
        <div className="flex items-center gap-3 text-[#FACC6B]">
          <Sparkles className="h-5 w-5" />
          <p className="text-xs uppercase tracking-[0.25em]">Design dashboard</p>
        </div>
        <h1 className="mt-3 text-3xl font-[var(--font-playfair)] text-white">
          Redirecting to the AI Design Studio
        </h1>
        <p className="mt-2 text-slate-300">
          Your dashboard now lives inside the studio experience. We&apos;ll take you there automatically.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => router.replace("/studio")}
            className="inline-flex items-center gap-2 rounded-full bg-[#FACC6B] px-6 py-3 text-sm font-semibold text-[#0f0f0f] shadow-lg shadow-[#FACC6B]/30 transition hover:scale-[1.02]"
          >
            Go to Design Studio <ArrowRight className="h-4 w-4" />
          </button>
          {isAuthed === false && (
            <StartDesigningButton
              label="Login to continue"
              targetPath="/studio"
              forceModal
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white hover:border-white/30 hover:bg-white/5"
            />
          )}
        </div>
        <p className="mt-4 text-xs text-slate-500">
          If you&apos;re not redirected, use the button above to jump into the studio.
        </p>
      </div>
    </SectionWrapper>
  );
};

export default DashboardPage;
