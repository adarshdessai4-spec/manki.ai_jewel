"use client";

import { useEffect, useRef, useState } from "react";
import { MoveHorizontal, RotateCw, X } from "lucide-react";

interface Design360ViewerProps {
  name: string;
  imageUrl?: string;
  onClose: () => void;
}

const Design360Viewer = ({ name, imageUrl, onClose }: Design360ViewerProps) => {
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [autoSpin, setAutoSpin] = useState(true);
  const dragX = useRef<number | null>(null);
  const dragY = useRef<number | null>(null);
  const texture = imageUrl || "/diamond_hero_frame.png";

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    if (!autoSpin) return;
    let frame: number;
    const spin = () => {
      setYaw((prev) => (prev + 0.8) % 360);
      frame = requestAnimationFrame(spin);
    };
    frame = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(frame);
  }, [autoSpin]);

  const handleDrag = (deltaX: number, deltaY: number) => {
    setYaw((prev) => (prev + deltaX * 0.3 + 360) % 360);
    setPitch((prev) => Math.max(-75, Math.min(75, prev + deltaY * 0.25)));
  };

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f1c] p-6 shadow-2xl shadow-black/70">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">3D View</p>
            <h3 className="text-xl font-semibold text-white">{name}</h3>
            <p className="text-sm text-slate-400">
              Drag to orbit or auto-spin; jump to front, side, top, and bottom angles instantly.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/15 p-2 text-slate-200 hover:border-[#FACC6B]/60 hover:text-[#FACC6B]"
            aria-label="Close 360 view"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div
          className="mt-6 h-72 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-black/30 to-[#FACC6B]/10 shadow-inner shadow-black/60"
          onMouseDown={(e) => {
            dragX.current = e.clientX;
            dragY.current = e.clientY;
            setAutoSpin(false);
          }}
          onMouseUp={() => {
            dragX.current = null;
            dragY.current = null;
          }}
          onMouseLeave={() => {
            dragX.current = null;
            dragY.current = null;
          }}
          onMouseMove={(e) => {
            if (dragX.current !== null && dragY.current !== null) {
              handleDrag(e.clientX - dragX.current, e.clientY - dragY.current);
              dragX.current = e.clientX;
              dragY.current = e.clientY;
            }
          }}
          onTouchStart={(e) => {
            dragX.current = e.touches[0]?.clientX ?? null;
            dragY.current = e.touches[0]?.clientY ?? null;
            setAutoSpin(false);
          }}
          onTouchMove={(e) => {
            if (dragX.current !== null && dragY.current !== null) {
              handleDrag(
                e.touches[0].clientX - dragX.current,
                e.touches[0].clientY - dragY.current
              );
              dragX.current = e.touches[0].clientX;
              dragY.current = e.touches[0].clientY;
            }
          }}
          onTouchEnd={() => {
            dragX.current = null;
            dragY.current = null;
          }}
          style={{ perspective: "1200px" }}
        >
          <div
            className="relative h-full w-full"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${pitch}deg) rotateY(${yaw}deg)`,
              transition: autoSpin ? "transform 0.08s linear" : "none",
            }}
          >
            <div
              className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-white/10 shadow-[0_0_60px_rgba(250,204,107,0.35)]"
              style={{
                backgroundImage: `url(${texture}), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06), rgba(0,0,0,0.5))`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/25 bg-black/10 blur-[0.5px]" />
            <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.15),transparent_45%),radial-gradient(circle_at_20%_80%,rgba(250,204,107,0.25),transparent_40%)]" />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200">
            <MoveHorizontal className="h-4 w-4 text-[#FACC6B]" /> Drag to rotate
          </div>
          <button
            type="button"
            onClick={() => setAutoSpin((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200 hover:border-[#FACC6B]/60 hover:text-[#FACC6B]"
          >
            <RotateCw className="h-4 w-4" /> {autoSpin ? "Pause auto-spin" : "Resume auto-spin"}
          </button>
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
            <button
              type="button"
              onClick={() => {
                setAutoSpin(false);
                setPitch(0);
                setYaw(0);
              }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:border-[#FACC6B]/60 hover:text-[#FACC6B]"
            >
              Front
            </button>
            <button
              type="button"
              onClick={() => {
                setAutoSpin(false);
                setPitch(0);
                setYaw(90);
              }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:border-[#FACC6B]/60 hover:text-[#FACC6B]"
            >
              Left
            </button>
            <button
              type="button"
              onClick={() => {
                setAutoSpin(false);
                setPitch(0);
                setYaw(270);
              }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:border-[#FACC6B]/60 hover:text-[#FACC6B]"
            >
              Right
            </button>
            <button
              type="button"
              onClick={() => {
                setAutoSpin(false);
                setPitch(-70);
                setYaw(0);
              }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:border-[#FACC6B]/60 hover:text-[#FACC6B]"
            >
              Top
            </button>
            <button
              type="button"
              onClick={() => {
                setAutoSpin(false);
                setPitch(55);
                setYaw(0);
              }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:border-[#FACC6B]/60 hover:text-[#FACC6B]"
            >
              Bottom
            </button>
          </div>
          <span className="text-slate-500">ESC to close</span>
        </div>
      </div>
    </div>
  );
};

export default Design360Viewer;
