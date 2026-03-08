"use client";

import { Scan } from "lucide-react";

export function ScanningOverlay() {
  return (
    <div
      className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-4 z-10 backdrop-blur-sm"
      style={{ backgroundColor: "rgba(14,17,23,0.65)" }}
    >
      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        <div
          className="absolute left-0 right-0 h-px"
          style={{
            background: "linear-gradient(to right, transparent, #7EB8D4, transparent)",
            opacity: 0.9,
            animation: "scanLine 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Corner brackets */}
      {[
        "top-4 left-4 border-t-2 border-l-2",
        "top-4 right-4 border-t-2 border-r-2",
        "bottom-4 left-4 border-b-2 border-l-2",
        "bottom-4 right-4 border-b-2 border-r-2",
      ].map((cls, i) => (
        <span
          key={i}
          className={`absolute w-5 h-5 ${cls}`}
          style={{ borderColor: "#7EB8D4" }}
        />
      ))}

      {/* Center pulse icon */}
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{ backgroundColor: "rgba(126,184,212,0.25)" }}
        />
        <div
          className="relative w-11 h-11 rounded-full flex items-center justify-center border"
          style={{ backgroundColor: "rgba(126,184,212,0.15)", borderColor: "rgba(126,184,212,0.5)" }}
        >
          <Scan size={20} style={{ color: "#7EB8D4" }} />
        </div>
      </div>

      <div className="text-center">
        <p className="font-body text-xs font-semibold text-white tracking-[0.22em] uppercase">
          Scanning
        </p>
        <p className="font-body text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
          Identifying all items…
        </p>
      </div>

      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1 h-1 rounded-full animate-pulse"
            style={{ backgroundColor: "#7EB8D4", animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}

