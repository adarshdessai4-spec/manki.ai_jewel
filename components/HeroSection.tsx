import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";

const HeroSection = () => {
  return (
    <SectionWrapper className="pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.15em] text-slate-200">
            AI-Powered Jewellery Design Studio
          </span>
          <h1 className="text-4xl leading-tight text-white sm:text-5xl lg:text-6xl font-[var(--font-playfair)]">
            Design your own jewellery, powered by AI.
          </h1>
          <p className="text-lg text-slate-300">
            Craft bespoke rings, pendants, bracelets and more with intelligent prompts
            and curated materials. Manki.ai Jewels blends technology with artisan
            craftsmanship.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/studio"
              className="inline-flex items-center justify-center rounded-full bg-[#FACC6B] px-6 py-3 text-sm font-semibold text-[#0f0f0f] hover:text-[#0f0f0f] focus-visible:text-[#0f0f0f] active:text-[#0f0f0f] shadow-lg shadow-[#FACC6B]/40 transition-all duration-200 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FACC6B]"
              style={{ color: "#0f0f0f" }}
            >
              Start Designing
            </Link>
            <Link
              href="#design-gallery"
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View sample designs
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-[radial-gradient(circle_at_20%_20%,rgba(250,204,107,0.14),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.12),transparent_35%)] blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-black/40">
            <div className="relative flex aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] items-center justify-center overflow-hidden">
              <video
                src="/diamond_hero_cropped.mp4"
                className="absolute inset-0 h-full w-full object-contain pointer-events-none"
                autoPlay
                loop
                muted
                playsInline
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
