import { Sparkles } from "lucide-react";

export function SuperEvoButton({ used, available, onUse }: {
  used: boolean; available: boolean; onUse: () => void;
}) {
  if (used) {
    return (
      <div className="flex items-center justify-center gap-2 w-full py-2.5 rounded border border-border/40 bg-muted/20">
        <Sparkles size={13} className="text-muted-foreground/40" />
        <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground/40" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
          Super Evo Used
        </span>
      </div>
    );
  }

  return (
    <button
      onClick={onUse}
      disabled={!available}
      className={`w-full py-2.5 rounded border font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.97] ${
        available
          ? "border-[#7b4ea8]/60 bg-[#7b4ea8]/10 text-[#c084fc] hover:bg-[#7b4ea8]/20 hover:border-[#7b4ea8]/80 shadow-[0_0_12px_rgba(123,78,168,0.2)]"
          : "border-border/40 bg-muted/10 text-muted-foreground/40 cursor-not-allowed"
      }`}
      style={{ fontFamily: "'Rajdhani', sans-serif" }}
    >
      <Sparkles size={13} />
      {available ? "Super Evolution" : "Super Evo (Locked)"}
    </button>
  );
}