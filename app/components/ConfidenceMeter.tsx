"use client";

interface ConfidenceMeterProps {
  value: number; // 0 to 1
}

export function ConfidenceMeter({ value }: ConfidenceMeterProps) {
  const pct = Math.round(value * 100);

  const getLabel = () => {
    if (pct >= 90) return "Very High";
    if (pct >= 75) return "High";
    if (pct >= 55) return "Moderate";
    return "Low";
  };

  const getColor = () => {
    if (pct >= 75) return "bg-gold";
    if (pct >= 55) return "bg-amber-400";
    return "bg-ink-300";
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-body font-medium text-ink-400 uppercase tracking-widest">
          Confidence
        </span>
        <span className="text-xs font-mono font-semibold text-ink-600">
          {getLabel()} · {pct}%
        </span>
      </div>
      <div className="h-1.5 bg-ink-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${getColor()}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
