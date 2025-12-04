"use client";

import { useEffect, useState } from "react";
import { Activity, AlertTriangle, IndianRupee, RefreshCw } from "lucide-react";

type RateRow = {
  karat: number;
  perGram: number;
  perTola: number;
};

type GoldRatesResponse =
  | {
      success: true;
      updatedAt: string;
      rates: RateRow[];
      base: { spotUsd: number; usdInr: number };
    }
  | {
      success: false;
      message: string;
    };

const formatInr = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const GoldRatesCard = () => {
  const [data, setData] = useState<GoldRatesResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const loadRates = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/gold-rates");
      const json = (await res.json()) as GoldRatesResponse;
      setData(json);
    } catch (err) {
      console.error(err);
      setData({ success: false, message: "Unable to load live pricing" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRates();
  }, []);

  const lastUpdated =
    data && data.success ? new Date(data.updatedAt).toLocaleTimeString("en-IN") : null;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-inner shadow-black/40">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-white">
          <IndianRupee className="h-5 w-5 text-[#FACC6B]" />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Daily pricing</p>
            <p className="text-sm font-semibold">Gold rate (INR)</p>
          </div>
        </div>
        <button
          type="button"
          onClick={loadRates}
          className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 text-xs text-slate-200 hover:border-[#FACC6B]/60 hover:text-[#FACC6B]"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {data?.success ? (
        <>
          <div className="mt-4 grid gap-2 text-sm text-slate-200">
            {data.rates.map((row) => (
              <div
                key={row.karat}
                className="grid grid-cols-[1fr_1fr_1fr] items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-xs sm:text-sm"
              >
                <span className="font-semibold text-white">{row.karat}K</span>
                <span className="text-slate-200">Gram: {formatInr(row.perGram)}</span>
                <span className="text-slate-200">Tola: {formatInr(row.perTola)}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-slate-500">
            Spot: ${Math.round(data.base.spotUsd)} /oz • USD/INR {data.base.usdInr?.toFixed(2)} •
            Updated {lastUpdated ?? "recently"}
          </p>
        </>
      ) : (
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-3 py-3 text-sm text-slate-200">
          <AlertTriangle className="h-5 w-5 text-amber-400" />
          <div>
            <p className="font-semibold text-white">Live rates unavailable</p>
            <p className="text-xs text-slate-400">
              {data?.success === false ? data.message : "Please refresh to retry."}
            </p>
          </div>
        </div>
      )}

      {loading && (
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
          <Activity className="h-4 w-4 animate-spin text-[#FACC6B]" /> Fetching latest prices...
        </div>
      )}
    </div>
  );
};

export default GoldRatesCard;
