import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";

const CallToAction = () => {
  return (
    <SectionWrapper>
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#0b0f1c] via-[#1c1d2d] to-[#facc6b]/10 p-10 shadow-xl shadow-black/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(250,204,107,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.12),transparent_40%)]" />
        <div className="relative flex flex-col gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div className="space-y-3">
            <h3 className="text-3xl font-[var(--font-playfair)] text-white sm:text-4xl">
              Ready to design your dream piece?
            </h3>
            <p className="text-slate-300">
              Open the AI Design Studio to sketch ideas, refine styles, and visualize your next heirloom.
            </p>
          </div>
          <Link
            href="/studio"
            className="inline-flex items-center justify-center rounded-full bg-[#FACC6B] px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-[#FACC6B]/40 transition-all duration-200 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FACC6B]"
          >
            Open AI Design Studio
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default CallToAction;
