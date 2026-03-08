"use client";

import { Scan, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{ backgroundColor: "rgba(242,245,250,0.85)", borderColor: "#DDE2EE" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#0E1117" }}
          >
            <Scan size={14} style={{ color: "#7EB8D4" }} />
          </div>
          <span className="font-display text-base" style={{ color: "#0E1117" }}>
            The Vision
          </span>
          <span className="hidden sm:block text-xs font-body font-medium uppercase tracking-[0.18em]" style={{ color: "#8F9BB8" }}>
            · {pathname === "/" ? "Share Your Vision" : "Find Your Vision"}
          </span>
        </div>
        
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              pathname === "/" ? "text-[#0E1117]" : "text-[#8F9BB8] hover:text-[#0E1117]"
            }`}
          >
            <Scan size={14} />
            <span className="hidden sm:inline">Share</span>
          </Link>
          <Link
            href="/find-vision"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              pathname === "/find-vision" ? "text-[#0E1117]" : "text-[#8F9BB8] hover:text-[#0E1117]"
            }`}
          >
            <Search size={14} />
            <span className="hidden sm:inline">Find</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
