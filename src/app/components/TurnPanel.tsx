import { RefreshCw } from "lucide-react";
import type { Player } from "../../types/player";

const raj = { fontFamily: "'Rajdhani', sans-serif" };
const mono = { fontFamily: "'JetBrains Mono', monospace" };
const cinzel = { fontFamily: "'Cinzel', serif" };

export function TurnPanel({ turn, activePlayer, players, goesFirst, onNextTurn, onReset, onSwapFirst }: {
  turn: number;
  activePlayer: 0 | 1;
  players: [Player, Player];
  goesFirst: 0 | 1;
  onNextTurn: () => void;
  onReset: () => void;
  onSwapFirst: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 px-4">
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground" style={raj}>Turn</span>
        <span className="text-6xl font-black leading-none text-foreground tabular-nums" style={mono}>
          {String(turn).padStart(2, "0")}
        </span>
      </div>

      <div className="w-full rounded border border-accent/30 bg-accent/5 px-3 py-2 text-center">
        <span className="text-[9px] block font-bold tracking-widest uppercase text-muted-foreground mb-0.5" style={raj}>Active Player</span>
        <span className="text-sm font-bold text-accent" style={cinzel}>{players[activePlayer].name}</span>
      </div>

      <div className="w-full flex flex-col gap-1">
        <span className="text-[9px] font-bold tracking-widest uppercase text-muted-foreground text-center" style={raj}>Goes First</span>
        <div className="flex rounded overflow-hidden border border-border">
          {([0, 1] as const).map((idx) => (
            <button
              key={idx}
              onClick={() => goesFirst !== idx && onSwapFirst()}
              className={`flex-1 py-1.5 text-[10px] font-bold tracking-wide uppercase transition-all ${
                goesFirst === idx
                  ? "bg-accent/20 text-accent border-accent/40"
                  : "bg-transparent text-muted-foreground hover:text-foreground"
              }`}
              style={raj}
            >
              {players[idx].name.length > 8 ? `P${idx + 1}` : players[idx].name}
            </button>
          ))}
        </div>
      </div>

      <div className="w-px flex-1 bg-border/50 min-h-4" />

      <button onClick={onNextTurn}
        className="w-full py-2.5 rounded font-bold tracking-widest uppercase text-xs bg-accent text-accent-foreground hover:bg-accent/90 active:scale-[0.97] transition-all duration-150 shadow-[0_0_16px_rgba(228,170,58,0.25)]"
        style={raj}
      >
        End Turn
      </button>

      <button onClick={onReset}
        className="w-full py-2 rounded font-semibold tracking-widest uppercase text-xs border border-border text-muted-foreground hover:border-destructive/60 hover:text-destructive active:scale-[0.97] transition-all duration-150 flex items-center justify-center gap-1.5"
        style={raj}
      >
        <RefreshCw size={11} /> Reset
      </button>
    </div>
  );
}