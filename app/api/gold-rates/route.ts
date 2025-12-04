import { NextResponse } from "next/server";

const GOLD_API = "https://api.metals.live/v1/spot/gold";
const USD_INR_API = "https://open.er-api.com/v6/latest/USD";

const GRAMS_PER_OUNCE = 31.1034768;
const GRAMS_PER_TOLA = 11.6638038;
const KARATS = [24, 22, 20, 18, 14] as const;

type Karat = (typeof KARATS)[number];

type GoldResponse = [number, number][];

const purityFactor = (karat: Karat) => karat / 24;

export const revalidate = 1800; // 30 minutes

export async function GET() {
  try {
    const [goldRes, fxRes] = await Promise.all([
      fetch(GOLD_API, { next: { revalidate } }),
      fetch(USD_INR_API, { next: { revalidate } }),
    ]);

    const goldJson = (await goldRes.json()) as GoldResponse;
    const fxJson = (await fxRes.json()) as { rates?: Record<string, number> };

    const usdInr = fxJson?.rates?.INR ?? null;
    const spotUsd = Array.isArray(goldJson) ? goldJson[0]?.[1] : null;

    if (!usdInr || !spotUsd) {
      throw new Error("Missing price data");
    }

    const pricePerGramInr = (spotUsd / GRAMS_PER_OUNCE) * usdInr;
    const build = KARATS.map((karat) => {
      const factor = purityFactor(karat);
      const perGram = pricePerGramInr * factor;
      return {
        karat,
        perGram,
        perTola: perGram * GRAMS_PER_TOLA,
      };
    });

    return NextResponse.json({
      success: true,
      updatedAt: new Date().toISOString(),
      currency: "INR",
      base: {
        spotUsd,
        usdInr,
      },
      rates: build,
    });
  } catch (error) {
    console.error("gold-rates error", error);
    return NextResponse.json(
      {
        success: false,
        message: "Live pricing unavailable. Please try again shortly.",
      },
      { status: 500 }
    );
  }
}
