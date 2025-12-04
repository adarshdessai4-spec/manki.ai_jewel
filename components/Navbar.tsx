"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/studio", label: "Design Studio" },
  { href: "/#how-it-works", label: "How it works" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <nav className="w-full bg-black/40 backdrop-blur border-b border-white/10 shadow-lg shadow-black/40">
        <div className="flex w-full items-center justify-between px-4 sm:px-6 lg:px-10 py-4">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#FACC6B]/80 via-white/60 to-white/10 text-black shadow-lg shadow-[#FACC6B]/40">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="currentColor"
              >
                <path d="M12 2 3 8l9 14 9-14-9-6Zm0 3.3 4.74 3.16L12 17.11 7.26 8.46 12 5.3Z" />
              </svg>
          </span>
          <div className="leading-tight">
            <p className="text-sm text-slate-300">Manki.ai</p>
            <p className="text-base text-white">Jewels</p>
          </div>
        </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-200 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/studio"
              className="rounded-full bg-[#FACC6B] px-4 py-2 text-sm font-semibold text-[#0f0f0f] hover:text-[#0f0f0f] focus-visible:text-[#0f0f0f] active:text-[#0f0f0f] shadow-lg shadow-[#FACC6B]/30 transition-transform duration-200 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FACC6B]"
              style={{ color: "#0f0f0f" }}
            >
              Start Designing
            </Link>
          </div>

          <button
            className="inline-flex items-center justify-center rounded-full border border-white/10 p-2 text-slate-100 md:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden">
          <div className="mx-4 mt-2 rounded-2xl border border-white/10 bg-black/60 backdrop-blur px-4 py-4 shadow-lg shadow-black/40">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm text-slate-100 transition-colors hover:bg-white/5"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/studio"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-[#FACC6B] px-4 py-2 text-sm font-semibold text-[#0f0f0f] hover:text-[#0f0f0f] focus-visible:text-[#0f0f0f] active:text-[#0f0f0f] shadow-lg shadow-[#FACC6B]/30 transition-transform duration-200 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FACC6B]"
                style={{ color: "#0f0f0f" }}
                onClick={() => setIsOpen(false)}
              >
                Start Designing
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
