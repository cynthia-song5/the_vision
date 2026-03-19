"use client";

import { Palette, RefreshCw, Award, Layers, Edit2, Check, X, Share2, Tag } from "lucide-react";
import { OutfitAnalysis, FashionItem } from "../lib/types";
import { useState } from "react";

interface AnalysisCardProps {
  data: OutfitAnalysis;
  imageUrl: string;
  onReset: () => void;
}

const COLOR_MAP: Record<string, string> = {
  black: "#0D0D0D", white: "#F8F9FA", red: "#C0392B", blue: "#2980B9",
  navy: "#1A2A4A", green: "#27AE60", emerald: "#059669", yellow: "#F1C40F",
  gold: "#C9A84C", pink: "#E91E8C", purple: "#8E44AD", brown: "#6B4226",
  tan: "#C4A882", camel: "#C19A6B", beige: "#E8D5B7", grey: "#9B9B9B",
  gray: "#9B9B9B", cream: "#FAF8F5", ivory: "#FFFFF0", orange: "#E67E22",
  rust: "#8B3A2E", burgundy: "#800020", olive: "#808000", taupe: "#8B7B70",
  "forest green": "#228B22", "slate blue": "#6A7FB5", "ice blue": "#A8C9D8",
  "powder blue": "#B0C4DE", teal: "#008080", cobalt: "#0047AB",
  "royal blue": "#4169E1", periwinkle: "#CCCCFF", lilac: "#C8A2C8",
  mauve: "#E0B0A0", blush: "#F4A7A3", champagne: "#F7E7CE",
  charcoal: "#36454F", "off-white": "#FAF9F6", ecru: "#C2B280",
};

function getSwatchColor(name: string): string {
  const key = name.toLowerCase();
  return COLOR_MAP[key] || COLOR_MAP[key.split(" ")[0]] ||
    `hsl(${Math.abs(name.charCodeAt(0) * 137) % 360}, 35%, 62%)`;
}

// Assign a subtle tinted background per item index for visual variety
const ITEM_ACCENTS = [
  { bg: "rgba(126,184,212,0.08)", border: "rgba(126,184,212,0.25)", dot: "#7EB8D4" },
  { bg: "rgba(106,127,181,0.08)", border: "rgba(106,127,181,0.25)", dot: "#6A7FB5" },
  { bg: "rgba(74,143,170,0.08)", border: "rgba(74,143,170,0.25)", dot: "#4A8FAA" },
  { bg: "rgba(90,110,160,0.08)", border: "rgba(90,110,160,0.25)", dot: "#5A6EA0" },
  { bg: "rgba(126,184,212,0.06)", border: "rgba(126,184,212,0.2)",  dot: "#7EB8D4" },
  { bg: "rgba(106,127,181,0.06)", border: "rgba(106,127,181,0.2)",  dot: "#6A7FB5" },
];

function EditableBrand({
  brand,
  onBrandChange,
}: {
  brand: string;
  onBrandChange: (brand: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(brand.toLowerCase());

  const handleSave = () => {
    onBrandChange(editValue.toLowerCase());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(brand.toLowerCase());
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-1 mt-1">
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value.toLowerCase())}
          className="font-mono text-xs font-medium bg-transparent border-b border-blue-400 outline-none"
          style={{ color: "#4A8FAA", width: "100px" }}
          autoFocus
        />
        <button
          onClick={handleSave}
          className="text-green-500 hover:text-green-600"
          style={{ fontSize: "10px" }}
        >
          <Check size={10} />
        </button>
        <button
          onClick={handleCancel}
          className="text-red-500 hover:text-red-600"
          style={{ fontSize: "10px" }}
        >
          <X size={10} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 mt-1 group">
      <Award size={10} style={{ color: "#7EB8D4" }} />
      <span
        className="font-mono text-xs font-medium cursor-text"
        style={{ color: "#4A8FAA" }}
        onClick={() => setIsEditing(true)}
      >
        {brand.toLowerCase()}
      </span>
      <Edit2 
        size={8} 
        style={{ color: "#7EB8D4", opacity: 0.6 }} 
        className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => setIsEditing(true)}
      />
    </div>
  );
}

function ItemCard({ item, index, onItemUpdate }: { item: FashionItem; index: number; onItemUpdate: (item: FashionItem) => void }) {
  const accent = ITEM_ACCENTS[index % ITEM_ACCENTS.length];
  const showSize = !!item.size && item.size.toLowerCase() !== "unknown";

  return (
    <div
      className="rounded-2xl p-5 border"
      style={{
        backgroundColor: accent.bg,
        borderColor: accent.border,
        animation: `fadeUp 0.45s ease-out ${index * 0.07}s both`,
      }}
    >
      {/* Item header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-2.5">
          <span
            className="mt-1 w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: accent.dot }}
          />
          <div>
            <p
              className="font-display text-lg leading-snug"
              style={{ color: "#0E1117" }}
            >
              {item.item_type.toLowerCase()}
            </p>
            <EditableBrand 
              brand={item.brand.toLowerCase()} 
              onBrandChange={(newBrand) => onItemUpdate({ ...item, brand: newBrand })} 
            />
            {showSize && (
              <div className="flex items-center gap-1 mt-1">
                <Tag size={10} style={{ color: "#7EB8D4" }} />
                <span
                  className="font-mono text-xs font-medium"
                  style={{ color: "#4A8FAA" }}
                >
                  {item.size.toLowerCase()}
                </span>
              </div>
            )}
          </div>
        </div>
        <span
          className="flex-shrink-0 text-xs font-body font-medium px-2.5 py-1 rounded-full border"
          style={{
            backgroundColor: "rgba(126,184,212,0.12)",
            borderColor: "rgba(126,184,212,0.3)",
            color: "#4A8FAA",
          }}
        >
          {item.style_vibe.toLowerCase()}
        </span>
      </div>

      {/* Colors */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Palette size={11} style={{ color: "#8F9BB8" }} />
          <span
            className="text-xs font-body tracking-widest"
            style={{ color: "#8F9BB8" }}
          >
            colors
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {item.colors.map((color) => (
            <div
              key={color}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border"
              style={{ backgroundColor: "#F2F5FA", borderColor: "#DDE2EE" }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0 border"
                style={{
                  backgroundColor: getSwatchColor(color),
                  borderColor: "#DDE2EE",
                }}
              />
              <span className="text-xs font-body" style={{ color: "#3E4A63" }}>
                {color.toLowerCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AnalysisCard({ data, imageUrl, onReset }: AnalysisCardProps) {
  const [analysisData, setAnalysisData] = useState(data);
  const [postStatus, setPostStatus] = useState<"idle" | "posting" | "posted">("idle");

  const handleItemUpdate = (updatedItem: FashionItem) => {
    setAnalysisData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item === updatedItem ? updatedItem : item
      )
    }));
  };

  const handlePostToFeed = () => {
    // Placeholder: avoid blocking UI with `alert` and provide instant feedback.
    setPostStatus("posting");
    setTimeout(() => setPostStatus("posted"), 400);
  };
  return (
    <div style={{ animation: "fadeUp 0.4s ease-out both" }}>
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">

        {/* Left — image + summary */}
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4]" style={{ backgroundColor: "#E4EAF4" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Outfit"
              className="w-full h-full object-cover"
            />
            {/* Overall vibe badge */}
            <div className="absolute bottom-3 left-3 right-3">
              <div
                className="rounded-xl px-3 py-2 flex items-center gap-2 backdrop-blur-md"
                style={{ backgroundColor: "rgba(14,17,23,0.75)" }}
              >
                <Layers size={13} style={{ color: "#7EB8D4" }} className="flex-shrink-0" />
                <div>
                  <p className="text-white/50 text-xs font-body" style={{ fontSize: "10px", letterSpacing: "0.12em" }}>
                    overall vibe
                  </p>
                  <p className="text-white text-xs font-body font-semibold truncate">
                    {analysisData.overall_vibe.toLowerCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Item count summary */}
          <div
            className="rounded-xl p-4 border flex items-center justify-between"
            style={{ backgroundColor: "#E4EAF4", borderColor: "#DDE2EE" }}
          >
            <div>
              <p className="font-body text-xs tracking-widest mb-0.5" style={{ color: "#8F9BB8" }}>
                items found
              </p>
              <p className="font-display text-2xl" style={{ color: "#0E1117" }}>
                {analysisData.items.length}
              </p>
            </div>
            <div className="flex -space-x-1">
              {ITEM_ACCENTS.slice(0, Math.min(analysisData.items.length, 5)).map((a, i) => (
                <span
                  key={i}
                  className="w-5 h-5 rounded-full border-2"
                  style={{ backgroundColor: a.dot, borderColor: "#E4EAF4" }}
                />
              ))}
            </div>
          </div>

          <button
            onClick={onReset}
            className="btn-outline w-full"
          >
            <RefreshCw size={13} />
            analyse another outfit
          </button>

          <button
            onClick={handlePostToFeed}
            disabled={postStatus !== "idle"}
            className="btn-primary w-full"
          >
            <Share2 size={13} />
            {postStatus === "idle"
              ? "post to feed"
              : postStatus === "posting"
                ? "posting..."
                : "posted"}
          </button>
        </div>

        {/* Right — item cards grid */}
        <div>
          <p
            className="font-body text-xs tracking-widest mb-4"
            style={{ color: "#8F9BB8" }}
          >
            identified pieces
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {analysisData.items.map((item, i) => (
              <ItemCard key={i} item={item} index={i} onItemUpdate={handleItemUpdate} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

