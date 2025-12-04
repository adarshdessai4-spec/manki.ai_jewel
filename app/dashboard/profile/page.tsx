"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShieldCheck, Smartphone, User, Wand2 } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { useRouter } from "next/navigation";

type ProfileData = {
  name: string;
  email: string;
  phone: string;
  plan: string;
  region: string;
};

const defaultProfile: ProfileData = {
  name: "Designer",
  email: "designer@manki.ai",
  phone: "+91 98765 43210",
  plan: "Designer sandbox",
  region: "India",
};

const ProfilePage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedProfile = localStorage.getItem("manki_profile");
    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile) as Partial<ProfileData>;
        setProfile({
          ...defaultProfile,
          ...parsed,
        });
      } catch {
        setProfile(defaultProfile);
      }
    } else {
      setProfile(defaultProfile);
    }
  }, []);

  const handleChange = (key: keyof ProfileData, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveProfile = () => {
    const trimmedProfile: ProfileData = {
      name: profile.name.trim() || defaultProfile.name,
      email: profile.email.trim() || defaultProfile.email,
      phone: profile.phone.trim() || defaultProfile.phone,
      plan: profile.plan.trim() || defaultProfile.plan,
      region: profile.region.trim() || defaultProfile.region,
    };
    setProfile(trimmedProfile);
    if (typeof window !== "undefined") {
      localStorage.setItem("manki_profile", JSON.stringify(trimmedProfile));
      localStorage.setItem("manki_user_name", trimmedProfile.name);
      window.dispatchEvent(new Event("storage")); // keep navbar in sync
    }
    setStatus("Profile updated");
    setTimeout(() => setStatus(null), 1500);
    router.push("/dashboard");
  };

  return (
    <SectionWrapper className="pt-10 pb-16">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Profile</p>
            <h1 className="text-3xl font-[var(--font-playfair)] text-white sm:text-4xl">
              Designer Account
            </h1>
            <p className="text-slate-300">Manage your identity, security, and studio preferences.</p>
          </div>
          <Link
            href="/studio"
            className="inline-flex items-center justify-center rounded-full bg-[#FACC6B] px-5 py-3 text-sm font-semibold text-[#0f0f0f] shadow-lg shadow-[#FACC6B]/30 transition hover:scale-[1.02]"
          >
            Open AI Studio
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/40 backdrop-blur">
            <div className="flex items-center gap-4 border-b border-white/10 pb-5">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#FACC6B]/20 text-[#FACC6B]">
                <User className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm text-slate-400">You are logged in as</p>
                <p className="text-lg font-semibold text-white">{profile.name}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-200 shadow-inner shadow-black/50">
                <p className="text-[11px] uppercase tracking-[0.15em] text-slate-400">Display name</p>
                <input
                  value={profile.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter your name"
                  className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-200 shadow-inner shadow-black/50">
                <p className="text-[11px] uppercase tracking-[0.15em] text-slate-400">Email</p>
                <input
                  value={profile.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  type="email"
                  placeholder="designer@manki.ai"
                  className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-200 shadow-inner shadow-black/50">
                <p className="text-[11px] uppercase tracking-[0.15em] text-slate-400">Phone</p>
                <input
                  value={profile.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-200 shadow-inner shadow-black/50">
                <p className="text-[11px] uppercase tracking-[0.15em] text-slate-400">Plan</p>
                <input
                  value={profile.plan}
                  onChange={(e) => handleChange("plan", e.target.value)}
                  placeholder="Designer sandbox"
                  className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-200 shadow-inner shadow-black/50">
                <p className="text-[11px] uppercase tracking-[0.15em] text-slate-400">Region</p>
                <input
                  value={profile.region}
                  onChange={(e) => handleChange("region", e.target.value)}
                  placeholder="India"
                  className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleSaveProfile}
                className="inline-flex items-center justify-center rounded-full bg-[#FACC6B] px-5 py-3 text-sm font-semibold text-[#0f0f0f] shadow-lg shadow-[#FACC6B]/30 transition hover:scale-[1.01]"
              >
                Save profile
              </button>
              {status && <p className="text-xs text-[#FACC6B]">{status}</p>}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-5 shadow-inner shadow-black/50">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-[#FACC6B]" />
                <div>
                  <p className="text-sm font-semibold text-white">Security & access</p>
                  <p className="text-xs text-slate-400">Two-factor, sessions, and device approvals.</p>
                </div>
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-200">
                <p>• OTP login enabled (mock). Connect your provider to enforce real checks.</p>
                <p>• Gmail sign-in available. Wire up OAuth to replace the sandbox flow.</p>
                <p>• Active session: this browser. Use logout in the navbar dropdown to end it.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-5 shadow-inner shadow-black/50">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-[#FACC6B]" />
                <div>
                  <p className="text-sm font-semibold text-white">Preferences</p>
                  <p className="text-xs text-slate-400">Tune styles to personalise generations.</p>
                </div>
              </div>
              <div className="mt-3 grid gap-2 text-sm text-slate-200">
                <p>Primary metal: 18K gold</p>
                <p>Style bias: Minimal x Classic</p>
                <p>Budget range: ₹25k – ₹75k</p>
                <Link
                  href="/studio#preferences"
                  className="mt-2 inline-flex items-center gap-2 text-[#FACC6B] hover:underline"
                >
                  <Wand2 className="h-4 w-4" /> Update in studio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ProfilePage;
