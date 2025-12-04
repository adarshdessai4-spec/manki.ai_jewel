export type JewelleryType =
  | "ring"
  | "earrings"
  | "necklace"
  | "bracelet"
  | "pendant"
  | "custom";

export type MetalType =
  | "gold_14k"
  | "gold_18k"
  | "gold_22k"
  | "platinum"
  | "silver";

export type StyleTag =
  | "minimal"
  | "heavy"
  | "vintage"
  | "modern"
  | "traditional"
  | "daily_wear"
  | "bridal";

export interface DesignConfig {
  jewelleryType: JewelleryType;
  metal: MetalType;
  styles: StyleTag[];
  budgetRange: "under_25k" | "25k_75k" | "75k_plus";
  prompt?: string;
}

export interface GeneratedDesign {
  id: string;
  name: string;
  jewelleryType: JewelleryType;
  metal: MetalType;
  styles: StyleTag[];
  budgetRange: DesignConfig["budgetRange"];
  estimatedPrice: number;
  description: string;
  imageUrl: string;
  isSaved?: boolean;
}
