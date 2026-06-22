import { ChevronUp, ChevronDown } from "lucide-react";

export function StepBtn({ dir, onClick, disabled }: {
  dir: "up" | "down"; onClick: () => void; disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center w-7 h-7 rounded border border-border bg-secondary/60 text-muted-foreground hover:text-accent hover:border-accent/50 active:scale-95 transition-all duration-100 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-muted-foreground disabled:hover:border-border"
    >
      {dir === "up" ? <ChevronUp size={14} strokeWidth={2.5} /> : <ChevronDown size={14} strokeWidth={2.5} />}
    </button>
  );
}