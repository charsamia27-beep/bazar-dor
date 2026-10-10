import { toBn } from "@/lib/utils";

export default function ChangeBadge({ change, className = "" }) {
  const pct = toBn(Math.abs(Number(change?.pct || 0)).toFixed(1));
  if (change?.dir === "up")
    return <span className={`text-xs font-semibold text-red-600 ${className}`}>▲ {pct}%</span>;
  if (change?.dir === "down")
    return <span className={`text-xs font-semibold text-green-700 ${className}`}>▼ {pct}%</span>;
  return <span className={`text-xs font-semibold text-gray-400 ${className}`}>— {pct}%</span>;
}
