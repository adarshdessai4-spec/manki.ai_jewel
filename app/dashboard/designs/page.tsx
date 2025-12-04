"use client";

import Link from "next/link";
import { BookmarkCheck, Grid, Play, Sparkles } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";

const designSamples = [
  {
    title: "Sunburst Kundan Set",
    status: "In progress",
    updated: "Updated 2d ago",
    accent: "#FACC6B",
  },
  {
    title: "Lattice Diamond Cuff",
    status: "Ready for feedback",
    updated: "Updated 5h ago",
    accent: "#9AE6B4",
  },
  {
    title: "Pearl Cascade Chandbali",
    status: "Saved concept",
    updated: "Updated 1w ago",
    accent: "#93C5FD",
  },
  {
    title: "Emerald Halo Ring",
    status: "In review",
    updated: "Updated 3d ago",
    accent: "#FBCFE8",
  },
  {
    title: "Sculpted Platinum Band",
    status: "Draft",
    updated: "Updated 1h ago",
    accent: "#C4B5FD",
  },
  {
    title: "Art Deco Brooch",
    status: "Saved concept",
    updated: "Updated 4d ago",
    accent: "#FDE68A",
  },
];

const DesignsPage = () => {
  return (
    <SectionWrapper className="pt-10 pb-16">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">My designs</p>
            <h1 className="text-3xl font-[var(--font-playfair)] text-white sm:text-4xl">
              Your jewellery board
            </h1>
            <p className="text-slate-300">Continue, review, or save the pieces you love.</p>
          </div>
          <Link
            href="/studio"
            className="inline-flex items-center justify-center rounded-full bg-[#FACC6B] px-5 py-3 text-sm font-semibold text-[#0f0f0f] shadow-lg shadow-[#FACC6B]/30 transition hover:scale-[1.02]"
          >
            Generate new designs
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/40 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Recent & saved</p>
                <p className="text-xs text-slate-400">Sorted by latest updates</p>
              </div>
              <Grid className="h-5 w-5 text-[#FACC6B]" />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {designSamples.map((design) => (
                <div
                  key={design.title}
                  className="rounded-2xl border border-white/10 bg-black/30 p-4 shadow-inner shadow-black/50"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-semibold text-white">{design.title}</p>
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: design.accent }}
                      aria-hidden
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-400">{design.updated}</p>
                  <p className="mt-1 text-xs text-slate-300">{design.status}</p>
                  <div className="mt-3 flex gap-2">
                    <Link
                      href="/studio"
                      className="rounded-full border border-white/15 px-3 py-2 text-xs text-white hover:border-[#FACC6B]/60 hover:text-[#FACC6B]"
                    >
                      Continue
                    </Link>
                    <Link
                      href="/studio#saved"
                      className="rounded-full border border-white/15 px-3 py-2 text-xs text-white hover:border-[#FACC6B]/60 hover:text-[#FACC6B]"
                    >
                      View board
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-5 shadow-inner shadow-black/50">
              <div className="flex items-center gap-3">
                <BookmarkCheck className="h-5 w-5 text-[#FACC6B]" />
                <div>
                  <p className="text-sm font-semibold text-white">Saved favourites</p>
                  <p className="text-xs text-slate-400">Keep your best concepts handy.</p>
                </div>
              </div>
              <div className="mt-3 space-y-2 text-sm text-slate-200">
                <p>• Tap the heart in studio results to pin designs here.</p>
                <p>• Use “View board” to review assets for each concept.</p>
                <p>• Export flows can be wired to send renders to clients.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-5 shadow-inner shadow-black/50">
              <div className="flex items-center gap-3">
                <Play className="h-5 w-5 text-[#FACC6B]" />
                <div>
                  <p className="text-sm font-semibold text-white">Next steps</p>
                  <p className="text-xs text-slate-400">Keep momentum on your pipeline.</p>
                </div>
              </div>
              <div className="mt-3 grid gap-2 text-sm text-slate-200">
                <Link href="/studio#recent" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:border-[#FACC6B]/60 hover:text-[#FACC6B]">
                  Resume recent drafts
                </Link>
                <Link href="/studio#preferences" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:border-[#FACC6B]/60 hover:text-[#FACC6B]">
                  Adjust style preferences
                </Link>
                <Link href="/dashboard/profile" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:border-[#FACC6B]/60 hover:text-[#FACC6B]">
                  Update profile details
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-5 shadow-inner shadow-black/50">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-[#FACC6B]" />
                <div>
                  <p className="text-sm font-semibold text-white">Tips</p>
                  <p className="text-xs text-slate-400">Get better outputs from the AI.</p>
                </div>
              </div>
              <div className="mt-3 space-y-2 text-sm text-slate-200">
                <p>• Add materials + motifs in prompts: “18K gold, meenakari, floral filigree”.</p>
                <p>• Set 2–3 style tags for clarity; avoid long lists.</p>
                <p>• Use budget ranges to steer gemstone/metal complexity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default DesignsPage;
