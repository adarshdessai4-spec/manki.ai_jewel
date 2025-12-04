import SectionWrapper from "@/components/SectionWrapper";

const designs = [
  {
    name: "Aurora Halo Ring",
    metal: "18K Rose Gold",
    styles: ["Minimal", "Bridal"],
    gradient: "from-[#FACC6B]/30 via-rose-300/20 to-white/5",
  },
  {
    name: "Nova Lattice Necklace",
    metal: "Platinum",
    styles: ["Modern", "Statement"],
    gradient: "from-cyan-400/25 via-[#FACC6B]/25 to-white/5",
  },
  {
    name: "Elysian Droplet Earrings",
    metal: "22K Gold",
    styles: ["Vintage", "Bridal"],
    gradient: "from-amber-300/30 via-[#FACC6B]/30 to-white/5",
  },
  {
    name: "Seraphina Pendant",
    metal: "14K White Gold",
    styles: ["Minimal", "Daily Wear"],
    gradient: "from-slate-500/30 via-[#FACC6B]/20 to-white/5",
  },
];

const DesignGalleryPreview = () => {
  return (
    <SectionWrapper id="design-gallery">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Sample AI Design Concepts</p>
        <h2 className="text-3xl font-[var(--font-playfair)] text-white sm:text-4xl">
          A glimpse of what you can create inside the studio.
        </h2>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {designs.map((design) => (
          <div
            key={design.name}
            className="group rounded-3xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/40 transition-all duration-200 hover:-translate-y-1 hover:border-[#FACC6B]/60 hover:shadow-[#FACC6B]/30"
          >
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${design.gradient}`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.12),transparent_30%)]" />
              <div className="absolute inset-0 flex items-end justify-start p-4">
                <span className="rounded-full bg-black/60 px-3 py-1 text-xs text-slate-100 backdrop-blur">
                  AI preview
                </span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold text-white">{design.name}</h3>
              <p className="text-sm text-slate-300">{design.metal}</p>
              <div className="flex flex-wrap gap-2">
                {design.styles.map((style) => (
                  <span
                    key={style}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                  >
                    {style}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default DesignGalleryPreview;
