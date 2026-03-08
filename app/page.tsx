"use client";

import { useState, useCallback } from "react";
import { Github, Twitter } from "lucide-react";
import { DropZone } from "./components/DropZone";
import { AnalysisCard } from "./components/AnalysisCard";
import { ScanningOverlay } from "./components/ScanningOverlay";
import { Navigation } from "./components/Navigation";
import { AnalysisState } from "./lib/types";

export default function Home() {
  const [state, setState] = useState<AnalysisState>({ status: "idle" });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageAccepted = useCallback(async (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setState({ status: "uploading" });

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      setState({ status: "scanning" });

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, mimeType: file.type }),
      });

      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Analysis failed");

      setState({ status: "complete", data: json.analysis, imageUrl: url });
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  }, []);

  const handleReset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setState({ status: "idle" });
  }, [previewUrl]);

  const isLoading = state.status === "uploading" || state.status === "scanning";

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "#F2F5FA" }}>

      {/* Navigation */}
      <Navigation />

      <main className="max-w-6xl mx-auto px-6 py-12">

        {/* Hero — idle only */}
        {state.status === "idle" && (
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-body font-semibold uppercase tracking-widest mb-6 border"
              style={{ backgroundColor: "rgba(126,184,212,0.1)", borderColor: "rgba(126,184,212,0.3)", color: "#4A8FAA" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#7EB8D4" }} />
              Identify every piece in an outfit
            </div>
            <h1 className="font-display text-5xl sm:text-6xl leading-tight mb-4" style={{ color: "#0E1117" }}>
              Share your vision.
              <br />
              <em className="not-italic" style={{ color: "#7EB8D4" }}>Tag everything.</em>
            </h1>
            <p className="font-body text-base max-w-sm mx-auto" style={{ color: "#626F8C" }}>
              Upload any outfit photo — full looks, runway shots, street style — and instantly identify every item.
            </p>
          </div>
        )}

        {/* Error banner */}
        {state.status === "error" && (
          <div
            className="mb-6 p-4 rounded-xl border flex items-start gap-3"
            style={{ backgroundColor: "#FEF2F2", borderColor: "#FECACA" }}
          >
            <span className="w-5 h-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mt-0.5 text-red-500 text-xs font-bold">!</span>
            <div>
              <p className="font-body font-semibold text-red-700 text-sm">Analysis failed</p>
              <p className="font-body text-red-500 text-xs mt-0.5">{state.message}</p>
              <button onClick={handleReset} className="mt-2 text-xs font-body font-semibold text-red-600 underline underline-offset-2">
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Upload / scanning */}
        {(state.status === "idle" || state.status === "uploading" || state.status === "scanning" || state.status === "error") && (
          <div className={state.status === "idle" ? "max-w-2xl mx-auto" : ""}>
            {isLoading && previewUrl ? (
              <div className="relative rounded-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Scanning" className="w-full max-h-[500px] object-cover rounded-2xl" />
                {state.status === "scanning" && <ScanningOverlay />}
                {state.status === "uploading" && (
                  <div className="absolute inset-0 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(14,17,23,0.35)" }}>
                    <div className="rounded-xl px-5 py-3 backdrop-blur-sm" style={{ backgroundColor: "rgba(242,245,250,0.9)" }}>
                      <p className="font-body text-sm font-semibold" style={{ color: "#1A2030" }}>Preparing image…</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <DropZone onImageAccepted={handleImageAccepted} isLoading={isLoading} />
            )}
          </div>
        )}

        {/* Results */}
        {state.status === "complete" && (
          <AnalysisCard data={state.data} imageUrl={state.imageUrl} onReset={handleReset} />
        )}

        {/* How it works */}
        {state.status === "idle" && (
          <div className="mt-16 pt-12 border-t" style={{ borderColor: "#DDE2EE" }}>
            <p className="text-center text-xs font-body font-medium uppercase tracking-widest mb-8" style={{ color: "#BCC4D8" }}>
              How it works
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl mx-auto">
              {[
                { step: "01", label: "Upload", desc: "Any outfit — runway, street, editorial, mirror selfie" },
                { step: "02", label: "Scan",   desc: "AI identifies every visible clothing item and accessory" },
                { step: "03", label: "Tag",    desc: "Get item type, brand, colors, and style vibe for each piece" },
              ].map(({ step, label, desc }) => (
                <div key={step} className="text-center">
                  <div
                    className="inline-flex w-9 h-9 rounded-full items-center justify-center mb-3 border"
                    style={{ borderColor: "#DDE2EE" }}
                  >
                    <span className="font-mono text-xs" style={{ color: "#8F9BB8" }}>{step}</span>
                  </div>
                  <p className="font-display text-sm mb-1" style={{ color: "#1A2030" }}>{label}</p>
                  <p className="font-body text-xs" style={{ color: "#8F9BB8" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t mt-16" style={{ borderColor: "#DDE2EE" }}>
        <div className="max-w-6xl mx-auto px-6 py-5">
          <p className="text-xs font-body text-center" style={{ color: "#BCC4D8" }}>
            © 2025 The Vision
          </p>
        </div>
      </footer>
    </div>
  );
}

