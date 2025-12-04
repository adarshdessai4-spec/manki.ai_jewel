import { BadgeCheck, Lock, ShieldCheck, Truck } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";

const features = [
  {
    title: "Fully customizable",
    description: "Every curve, pavé, and prong can be tailored to your signature style.",
    icon: BadgeCheck,
  },
  {
    title: "Transparent estimates",
    description: "Clear pricing guidance per metal and stone quality—no surprises.",
    icon: ShieldCheck,
  },
  {
    title: "Expert craftsmanship",
    description: "Pieces are reviewed by seasoned jewellers to ensure lasting brilliance.",
    icon: Lock,
  },
  {
    title: "Secure, insured delivery",
    description: "Tracked, insured shipping with discreet packaging worldwide.",
    icon: Truck,
  },
];

const FeatureGrid = () => {
  return (
    <SectionWrapper>
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Why Manki.ai</p>
        <h2 className="text-3xl font-[var(--font-playfair)] text-white sm:text-4xl">
          Luxury tooling, modern intelligence.
        </h2>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/40 transition-all duration-200 hover:-translate-y-1 hover:border-[#FACC6B]/60 hover:shadow-[#FACC6B]/30"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FACC6B]/20 text-[#FACC6B]">
              <feature.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">{feature.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default FeatureGrid;
