"use client";

import { useState, useCallback } from "react";
import { Search, Upload, X, Award, Palette, Tag } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { FashionItem } from "../lib/types";

interface DatabaseOutfit {
  id: string;
  image: string;
  items: FashionItem[];
  overall_vibe: string;
  matchScore?: number;
}

interface MatchResult {
  uploadedAnalysis: {
    items: FashionItem[];
    overall_vibe: string;
  };
  matches: DatabaseOutfit[];
}

export default function FindVision() {
  const [state, setState] = useState<'idle' | 'uploading' | 'searching' | 'results' | 'error'>('idle');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    const url = URL.createObjectURL(file);
    setUploadedImage(url);
    setState('uploading');
    setError(null);

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      setState('searching');

      const response = await fetch("/api/find-vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, mimeType: file.type }),
      });

      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Search failed");

      setMatchResult(json);
      setState('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setState('error');
    }
  }, []);

  const handleReset = useCallback(() => {
    if (uploadedImage) URL.revokeObjectURL(uploadedImage);
    setUploadedImage(null);
    setMatchResult(null);
    setError(null);
    setState('idle');
  }, [uploadedImage]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  }, [handleImageUpload]);

  const isLoading = state === 'uploading' || state === 'searching';

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "#F2F5FA" }}>
      <Navigation />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-body font-semibold uppercase tracking-widest mb-6 border"
            style={{ backgroundColor: "rgba(126,184,212,0.1)", borderColor: "rgba(126,184,212,0.3)", color: "#4A8FAA" }}
          >
            <Search size={12} />
            Visual Fashion Discovery
          </div>
          <h1 className="font-display text-5xl sm:text-6xl leading-tight mb-4" style={{ color: "#0E1117" }}>
            Find your vision.
            <br />
            <em className="not-italic" style={{ color: "#7EB8D4" }}>Discover similar looks.</em>
          </h1>
          <p className="font-body text-base max-w-md mx-auto" style={{ color: "#626F8C" }}>
            Upload a fashion item and discover matching outfits from our curated collection based on style, colors, and aesthetic.
          </p>
        </div>

        {/* Error */}
        {state === 'error' && (
          <div
            className="mb-6 p-4 rounded-xl border flex items-start gap-3 max-w-2xl mx-auto"
            style={{ backgroundColor: "#FEF2F2", borderColor: "#FECACA" }}
          >
            <span className="w-5 h-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mt-0.5 text-red-500 text-xs font-bold">!</span>
            <div>
              <p className="font-body font-semibold text-red-700 text-sm">Search failed</p>
              <p className="font-body text-red-500 text-xs mt-0.5">{error}</p>
              <button onClick={handleReset} className="mt-2 text-xs font-body font-semibold text-red-600 underline underline-offset-2">
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Upload Area */}
        {(state === 'idle' || state === 'error') && (
          <div className="max-w-2xl mx-auto">
            <div
              className="relative rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all hover:border-[#7EB8D4]"
              style={{ borderColor: "#DDE2EE", backgroundColor: "rgba(126,184,212,0.02)" }}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <Upload size={48} style={{ color: "#7EB8D4", margin: "0 auto 1.5rem" }} />
              <h3 className="font-display text-xl mb-2" style={{ color: "#0E1117" }}>
                Upload a fashion photo
              </h3>
              <p className="font-body text-sm" style={{ color: "#8F9BB8" }}>
                Any clothing item, accessory, or complete outfit
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && uploadedImage && (
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={uploadedImage} alt="Analyzing" className="w-full max-h-[400px] object-cover rounded-2xl" />
              <div className="absolute inset-0 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(14,17,23,0.35)" }}>
                <div className="rounded-xl px-5 py-3 backdrop-blur-sm" style={{ backgroundColor: "rgba(242,245,250,0.9)" }}>
                  <p className="font-body text-sm font-semibold" style={{ color: "#1A2030" }}>
                    {state === 'uploading' ? 'Preparing image...' : 'Finding matching outfits...'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {state === 'results' && matchResult && (
          <div>
            {/* Uploaded Image + Analysis */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-lg mb-4" style={{ color: "#0E1117" }}>Your Upload</h3>
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4]" style={{ backgroundColor: "#E4EAF4" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={uploadedImage!} alt="Your upload" className="w-full h-full object-cover" />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-display text-lg mb-4" style={{ color: "#0E1117" }}>Detected Items</h3>
                  <div className="space-y-3">
                    {matchResult.uploadedAnalysis.items.map((item, i) => (
                      <div
                        key={i}
                        className="rounded-xl p-4 border"
                        style={{ backgroundColor: "#F8F9FA", borderColor: "#DDE2EE" }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-display text-sm" style={{ color: "#0E1117" }}>{item.item_type}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Award size={10} style={{ color: "#7EB8D4" }} />
                              <span className="font-mono text-xs" style={{ color: "#4A8FAA" }}>{item.brand}</span>
                              {item.size && item.size !== "Unknown" && (
                                <>
                                  <Tag size={10} style={{ color: "#7EB8D4" }} />
                                  <span className="font-mono text-xs" style={{ color: "#4A8FAA" }}>{item.size}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <span
                            className="text-xs font-body font-medium px-2 py-1 rounded-full border"
                            style={{
                              backgroundColor: "rgba(126,184,212,0.12)",
                              borderColor: "rgba(126,184,212,0.3)",
                              color: "#4A8FAA",
                            }}
                          >
                            {item.style_vibe}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.colors.map((color) => (
                            <span
                              key={color}
                              className="text-xs px-2 py-1 rounded-full"
                              style={{ backgroundColor: "#E4EAF4", color: "#626F8C" }}
                            >
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Matching Outfits */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-2xl" style={{ color: "#0E1117" }}>
                  Matching Outfits ({matchResult.matches.length})
                </h3>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border font-body text-sm font-medium transition-all"
                  style={{ borderColor: "#DDE2EE", color: "#626F8C" }}
                >
                  <X size={14} />
                  Clear Search
                </button>
              </div>

              {matchResult.matches.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-body text-sm" style={{ color: "#8F9BB8" }}>
                    No matching outfits found. Try uploading a different image.
                  </p>
                </div>
              ) : (
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
                  {matchResult.matches.map((outfit) => (
                    <div key={outfit.id} className="break-inside-avoid mb-6">
                      <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#DDE2EE" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={outfit.image}
                          alt={outfit.overall_vibe}
                          className="w-full aspect-[3/4] object-cover"
                        />
                        <div className="p-4" style={{ backgroundColor: "#F8F9FA" }}>
                          <h4 className="font-display text-sm mb-2" style={{ color: "#0E1117" }}>
                            {outfit.overall_vibe}
                          </h4>
                          <div className="space-y-2">
                            {outfit.items.slice(0, 3).map((item, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs">
                                <span style={{ color: "#626F8C" }}>{item.item_type}</span>
                                <span style={{ color: "#8F9BB8" }}>·</span>
                                <span style={{ color: "#4A8FAA" }}>{item.brand}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
