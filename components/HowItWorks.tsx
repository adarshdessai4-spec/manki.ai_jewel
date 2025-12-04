import { Gem, Sparkles, Wand2 } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";

const steps = [
  {
    title: "Tell us your taste",
    description: "Choose the jewellery type, preferred metal, budget, and inspirations.",
    icon: Sparkles,
  },
  {
    title: "AI crafts unique patterns",
    description: "Our models sketch refined motifs and luxury-ready silhouettes in seconds.",
    icon: Wand2,
  },
  {
    title: "Jewellers bring it to life",
    description: "Expert artisans review, perfect, and craft your bespoke piece with care.",
    icon: Gem,
  },
];

const HowItWorks = () => {
  return (
    <SectionWrapper id="how-it-works">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">How it works</p>
        <h2 className="text-3xl font-[var(--font-playfair)] text-white sm:text-4xl">
          From idea to heirloom, guided by AI.
        </h2>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {steps.map((step, idx) => (
          <div
            key={step.title}
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/40 transition-all duration-200 hover:-translate-y-1 hover:border-[#FACC6B]/60 hover:shadow-[#FACC6B]/30"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FACC6B]/20 text-[#FACC6B]">
              <step.icon className="h-5 w-5" />
            </div>
            <p className="mt-6 text-sm text-slate-400">Step {idx + 1}</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{step.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default HowItWorks;
