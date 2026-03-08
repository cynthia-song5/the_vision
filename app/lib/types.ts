export interface FashionItem {
  item_type: string;
  brand: string;
  colors: string[];
  style_vibe: string;
  size: string;
}

export interface OutfitAnalysis {
  items: FashionItem[];
  overall_vibe: string;
}

export type AnalysisState =
  | { status: "idle" }
  | { status: "uploading" }
  | { status: "scanning" }
  | { status: "complete"; data: OutfitAnalysis; imageUrl: string }
  | { status: "error"; message: string };
