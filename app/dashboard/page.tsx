import Link from "next/link";
import { Bell, ChevronDown, Clock3, Heart, PenSquare, Sparkles, User } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";

const DashboardPage = () => {
  return (
    <SectionWrapper className="pt-6 sm:pt-8">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 shadow-xl shadow-black/40 backdrop-blur space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Welcome back</p>
            <h1 className="text-3xl font-[var(--font-playfair)] text-white">Your design dashboard</h1>
            <p className="text-slate-300">Launch a new AI session or pick up where you left off.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-sm text-white shadow-inner shadow-black/60">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#FACC6B]/20 text-[#FACC6B]">
                <User className="h-5 w-5" />
              </span>
              <div className="text-left leading-tight">
                <p className="text-[11px] uppercase tracking-[0.15em] text-slate-400">Logged in</p>
                <p className="text-sm font-semibold text-white">Designer</p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>
            <Link
              href="/studio"
              className="inline-flex items-center justify-center rounded-full bg-[#FACC6B] px-5 py-3 text-sm font-semibold text-[#0f0f0f] hover:text-[#0f0f0f] focus-visible:text-[#0f0f0f] active:text-[#0f0f0f] shadow-lg shadow-[#FACC6B]/30 transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FACC6B]"
            >
              Start designing now
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-slate-200 shadow-inner shadow-black/50">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Recent concepts</p>
              <Sparkles className="h-4 w-4 text-[#FACC6B]" />
            </div>
            <p className="mt-2 text-xs text-slate-400">Your latest generated ideas will appear here.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-slate-200 shadow-inner shadow-black/50">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Saved favourites</p>
              <Heart className="h-4 w-4 text-[#FACC6B]" />
            </div>
            <p className="mt-2 text-xs text-slate-400">Mark designs in the studio to collect them here.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-slate-200 shadow-inner shadow-black/50">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">In progress</p>
              <Clock3 className="h-4 w-4 text-[#FACC6B]" />
            </div>
            <p className="mt-2 text-xs text-slate-400">Track drafts you’ve opened recently.</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5 shadow-inner shadow-black/50">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Quick actions</p>
              <PenSquare className="h-4 w-4 text-[#FACC6B]" />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Link
                href="/studio"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-[#FACC6B]/60 hover:bg-white/10"
              >
                Start a new AI concept
              </Link>
              <Link
                href="/studio#saved"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-[#FACC6B]/60 hover:bg-white/10"
              >
                View saved boards
              </Link>
              <Link
                href="/studio#recent"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-[#FACC6B]/60 hover:bg-white/10"
              >
                Resume a draft
              </Link>
              <Link
                href="/studio#preferences"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-[#FACC6B]/60 hover:bg-white/10"
              >
                Update style preferences
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5 shadow-inner shadow-black/50">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Alerts</p>
              <Bell className="h-4 w-4 text-[#FACC6B]" />
            </div>
            <div className="mt-3 space-y-2 text-xs text-slate-300">
              <p>• Remember to connect real OTP/Gmail API when ready.</p>
              <p>• Saved designs sync and detail view can be added next.</p>
              <p>• Consider integrating user profile dropdown actions.</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default DashboardPage;
