"use client";

interface ConfidenceMeterProps {
  value: number; // 0 to 1
}

export function ConfidenceMeter({ value }: ConfidenceMeterProps) {
  const pct = Math.round(value * 100);

  const getLabel = () => {
    if (pct >= 90) return "very high";
    if (pct >= 75) return "high";
    if (pct >= 55) return "moderate";
    return "low";
  };

  const getColor = () => {
    if (pct >= 75) return "bg-ice";
    if (pct >= 55) return "bg-slate-400";
    return "bg-slate-500";
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-body font-medium text-slate-400 tracking-widest">
          confidence
        </span>
        <span className="text-xs font-mono font-semibold text-slate-600">
          {getLabel()} · {pct}%
        </span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${getColor()}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
