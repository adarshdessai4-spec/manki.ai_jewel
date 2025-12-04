"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Phone, ShieldCheck, X } from "lucide-react";

interface StartDesigningButtonProps {
  label?: string;
  className?: string;
  targetPath?: string;
  onOpen?: () => void;
  forceModal?: boolean;
}

const StartDesigningButton = ({
  label = "Start Designing",
  className = "",
  targetPath = "/studio",
  onOpen,
  forceModal = false,
}: StartDesigningButtonProps) => {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("manki_session_auth") === "true";
  });
  const [isClient] = useState<boolean>(() => typeof window !== "undefined");
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (showModal) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [showModal]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const syncAuth = () => {
      setIsAuthed(sessionStorage.getItem("manki_session_auth") === "true");
    };
    syncAuth();
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const announceAuthChange = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("storage"));
    }
    router.refresh();
  };

  const handlePrimaryClick = () => {
    const authedNow =
      typeof window !== "undefined" &&
      sessionStorage.getItem("manki_session_auth") === "true";
    setIsAuthed(authedNow);
    if (authedNow) {
      setShowModal(false);
      announceAuthChange();
      const destination = targetPath ?? "/studio";
      return router.push(destination);
    }

    onOpen?.();
    setShowModal(true);
    setStatus(null);
    setPhone("");
  };

  const handleSendOtp = () => {
    setStatus("OTP sent. Check your phone.");
  };

  const handleVerify = (destination?: string) => {
    setIsAuthed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("manki_session_auth", "true");
      localStorage.setItem("manki_auth", "true");
      window.dispatchEvent(new Event("storage"));
    }
    setShowModal(false);
    setStatus(null);
    const nextPath = destination ?? targetPath ?? "/studio";
    router.push(nextPath);
    announceAuthChange();
  };

  const handleGmailLogin = () => {
    setStatus("Signed in with Google (mock)");
    handleVerify(targetPath ?? "/studio");
  };

  return (
    <>
      <button
        type="button"
        onClick={handlePrimaryClick}
        className={className}
      >
        {label}
      </button>

      {isClient &&
        showModal &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-10">
            <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0b0f1c] p-6 sm:p-7 shadow-2xl shadow-black/60">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Secure access</p>
                  <h3 className="mt-1 text-xl font-semibold text-white">Verify to enter the studio</h3>
                  <p className="mt-1 text-sm text-slate-300">
                    Continue with mobile OTP or Gmail to start designing.
                  </p>
                </div>
                <button
                  aria-label="Close"
                  className="rounded-full border border-white/10 p-2 text-slate-200 hover:bg-white/5"
                  onClick={() => setShowModal(false)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-5 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs text-slate-400" htmlFor="phone">
                    Mobile number
                  </label>
                  <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-3 py-2">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={!phone}
                    className="rounded-full bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Send OTP
                  </button>
                  <button
                    type="button"
                    onClick={handleGmailLogin}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-white hover:border-white/30 hover:bg-white/5 transition"
                  >
                    <ShieldCheck className="h-4 w-4 text-[#FACC6B]" /> Continue with Gmail
                  </button>
                </div>

                {status && <p className="text-xs text-slate-400">{status}</p>}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default StartDesigningButton;
