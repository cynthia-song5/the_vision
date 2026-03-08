"use client";

import { useState, useCallback } from "react";
import { DropZone } from "../components/DropZone";
import { AnalysisCard } from "../components/AnalysisCard";
import { ScanningOverlay } from "../components/ScanningOverlay";
import { Navigation } from "../components/Navigation";
import { AnalysisState } from "../lib/types";

export default function Share() {
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
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero — idle only */}
        {state.status === "idle" && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6 border border-gray-300 bg-gray-50 text-gray-700 lowercase">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-gray-500" />
              identify every piece in an outfit
            </div>
            <h1 className="text-4xl font-bold text-black mb-4 lowercase">
              share your vision.
              <br />
              <em className="not-italic text-gray-600 lowercase">tag everything.</em>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium lowercase">
              upload any outfit photo — full looks, runway shots, street style — and instantly identify every item.
            </p>
          </div>
        )}

        {/* Error banner */}
        {state.status === "error" && (
          <div className="mb-6 p-4 rounded-xl border flex items-start gap-3 bg-red-50 border-red-200">
            <span className="w-5 h-5 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center mt-0.5 text-red-500 text-xs font-bold">!</span>
            <div>
              <p className="font-medium text-red-700 text-sm lowercase">analysis failed</p>
              <p className="font-normal text-red-500 text-xs mt-0.5 lowercase">{state.message}</p>
              <button onClick={handleReset} className="mt-2 text-xs font-medium text-red-600 underline underline-offset-2 lowercase">
                try again
              </button>
            </div>
          </div>
        )}

        {/* Upload / scanning */}
        {(state.status === "idle" || state.status === "uploading" || state.status === "scanning" || state.status === "error") && (
          <div className={state.status === "idle" ? "max-w-2xl mx-auto" : ""}>
            {isLoading && previewUrl ? (
              <div className="relative rounded-2xl overflow-hidden">
                <img src={previewUrl} alt="Scanning" className="w-full max-h-[500px] object-cover rounded-2xl" />
                {state.status === "scanning" && <ScanningOverlay />}
                {state.status === "uploading" && (
                  <div className="absolute inset-0 rounded-2xl flex items-center justify-center bg-black/35">
                    <div className="rounded-xl px-5 py-3 backdrop-blur-sm bg-white/90">
                      <p className="text-sm font-medium text-gray-900 lowercase">preparing image…</p>
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
          <div className="mt-16 pt-12 border-t border-gray-200">
            <p className="text-sm font-medium mb-8 text-gray-500 lowercase">
              how it works
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl mx-auto">
              {[
                { step: "01", label: "upload", desc: "any outfit — runway, street, editorial, mirror selfie" },
                { step: "02", label: "scan",   desc: "ai identifies every visible clothing item and accessory" },
                { step: "03", label: "tag",    desc: "get item type, brand, colors, and style vibe for each piece" },
              ].map(({ step, label, desc }) => (
                <div key={step} className="text-center">
                  <div className="inline-flex w-9 h-9 rounded-full items-center justify-center mb-3 border border-gray-300">
                    <span className="font-mono text-xs text-gray-600">{step}</span>
                  </div>
                  <p className="text-sm mb-1 text-gray-900 font-medium lowercase">{label}</p>
                  <p className="text-xs text-gray-600 font-normal lowercase">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t mt-16 border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <p className="text-xs font-normal text-center text-gray-500 lowercase">
            © 2025 the vision
          </p>
        </div>
      </footer>
    </div>
  );
}
