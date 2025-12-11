import { QuoteStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: QuoteStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "draft":
        return "bg-slate-700 text-slate-300 border border-slate-600";
      case "sent":
        return "bg-amber-500/20 text-amber-400 border border-amber-500/30";
      case "accepted":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
      case "invoiced":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
      case "paid":
        return "bg-emerald-600 text-white border border-emerald-500";
      default:
        return "bg-slate-700 text-slate-300";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles()}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
