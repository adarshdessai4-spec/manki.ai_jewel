import {
  DesignConfig,
  GeneratedDesign,
  JewelleryType,
  MetalType,
  StyleTag,
} from "@/types/design";

const basePriceMap: Record<DesignConfig["budgetRange"], number> = {
  under_25k: 22000,
  "25k_75k": 52000,
  "75k_plus": 110000,
};

const metalMultiplier: Record<MetalType, number> = {
  gold_14k: 0.9,
  gold_18k: 1,
  gold_22k: 1.15,
  platinum: 1.25,
  silver: 0.7,
};

const styleVariance: Partial<Record<StyleTag, number>> = {
  minimal: -0.05,
  heavy: 0.15,
  vintage: 0.1,
  modern: 0.05,
  traditional: 0.08,
  daily_wear: -0.02,
  bridal: 0.18,
};

const adjectives = [
  "Celestial",
  "Luminous",
  "Ethereal",
  "Aurora",
  "Radiant",
  "Seraphic",
  "Midnight",
  "Opulent",
];

const motifs = [
  "Halo",
  "Cascade",
  "Lattice",
  "Aurora",
  "Crescent",
  "Lyra",
  "Verve",
  "Noir",
];

const styleLabels: Record<StyleTag, string> = {
  minimal: "Minimal",
  heavy: "Heavy",
  vintage: "Vintage",
  modern: "Modern",
  traditional: "Traditional",
  daily_wear: "Daily Wear",
  bridal: "Bridal",
};

const metalLabels: Record<MetalType, string> = {
  gold_14k: "14K Gold",
  gold_18k: "18K Gold",
  gold_22k: "22K Gold",
  platinum: "Platinum",
  silver: "Sterling Silver",
};

const jewelleryLabels: Record<JewelleryType, string> = {
  ring: "Ring",
  earrings: "Earrings",
  necklace: "Necklace",
  bracelet: "Bracelet",
  pendant: "Pendant",
  custom: "Custom Piece",
};

const pickRandom = <T,>(items: T[]): T =>
  items[Math.floor(Math.random() * items.length)];

const buildDescription = (
  design: GeneratedDesign,
  prompt?: string
): string => {
  const styleText = design.styles.map((s) => styleLabels[s]).join(", ");
  const promptHint = prompt ? ` Inspired by: ${prompt}.` : "";
  return `A ${styleText.toLowerCase()} ${jewelleryLabels[design.jewelleryType].toLowerCase()} crafted in ${metalLabels[design.metal]}, featuring balanced proportions and signature Manki.ai detailing.${promptHint}`;
};

const derivePrice = (config: DesignConfig, index: number): number => {
  const base = basePriceMap[config.budgetRange];
  const metalFactor = metalMultiplier[config.metal];
  const styleFactor =
    config.styles.reduce((acc, style) => acc + (styleVariance[style] ?? 0), 0) +
    1;
  const randomness = 0.9 + Math.sin(index + config.styles.length) * 0.08;
  return Math.round(base * metalFactor * styleFactor * randomness);
};

const buildName = (type: JewelleryType, styles: StyleTag[]): string => {
  const adjective = pickRandom(adjectives);
  const motif = pickRandom(motifs);
  const primaryStyle = styles[0] ? styleLabels[styles[0]] : "Signature";
  return `${adjective} ${primaryStyle} ${motif}`;
};

export const generateMockDesigns = async (
  config: DesignConfig
): Promise<GeneratedDesign[]> => {
  const styles = config.styles.length ? config.styles : (["modern"] as StyleTag[]);
  const count = Math.max(4, Math.min(styles.length + 3, 6));

  const designs: GeneratedDesign[] = Array.from({ length: count }).map((_, index) => {
    const id = crypto.randomUUID();
    const name = buildName(config.jewelleryType, styles);
    const design: GeneratedDesign = {
      id,
      name,
      jewelleryType: config.jewelleryType,
      metal: config.metal,
      styles,
      budgetRange: config.budgetRange,
      estimatedPrice: derivePrice(config, index),
      description: "",
      imageUrl: "",
      isSaved: false,
    };

    design.description = buildDescription(design, config.prompt);
    return design;
  });

  // Simulate slight latency for UX realism
  await new Promise((resolve) => setTimeout(resolve, 450));
  return designs;
};
