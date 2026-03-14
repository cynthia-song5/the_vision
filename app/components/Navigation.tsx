"use client";

import { Scan, Search, Users, Grid3X3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b bg-white/85 border-gray-200"
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center bg-black"
          >
            <Scan size={14} className="text-white" />
          </div>
          <span className="font-display text-lg font-bold lowercase text-black">
            the vision
          </span>
          <span className="hidden sm:block text-xs font-body font-medium tracking-[0.18em] text-gray-500 lowercase">
            ·{" "}
            {pathname === "/feed"
              ? "inspiration feed"
              : pathname === "/share"
              ? "share your vision"
              : pathname === "/find-vision"
              ? "find your vision"
              : "communities"}
          </span>
        </div>
        
        <nav className="flex items-center gap-6">
          <Link
            href="/feed"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              pathname === "/feed" ? "text-black" : "text-gray-500 hover:text-black"
            }`}
          >
            <Grid3X3 size={14} />
            <span className="hidden sm:inline lowercase">feed</span>
          </Link>
          <Link
            href="/share"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              pathname === "/share" ? "text-black" : "text-gray-500 hover:text-black"
            }`}
          >
            <Scan size={14} />
            <span className="hidden sm:inline lowercase">share</span>
          </Link>
          <Link
            href="/find-vision"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              pathname === "/find-vision" ? "text-black" : "text-gray-500 hover:text-black"
            }`}
          >
            <Search size={14} />
            <span className="hidden sm:inline lowercase">find</span>
          </Link>
          <Link
            href="/communities"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              pathname === "/communities" ? "text-black" : "text-gray-500 hover:text-black"
            }`}
          >
            <Users size={14} />
            <span className="hidden sm:inline lowercase">communities</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
