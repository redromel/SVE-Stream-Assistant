import { useState } from "react";
import { Shield, Zap, Star, Settings } from "lucide-react";
import { MAX_PP, MAX_EVO } from "../../types/const";
import type { Player } from "../../types/player";
import { SimpleStat, FractionStat } from "./Stats";
import { SuperEvoButton } from "./SuperEvoButton";
import { PlayerConfigDrawer } from "./PlayerConfigDrawer";

const raj = { fontFamily: "'Rajdhani', sans-serif" };
const cinzel = { fontFamily: "'Cinzel', serif" };

export function PlayerPanel({ player, side, isActive, playerIdx, goesFirst, turn, onUpdate }: {
  player: Player;
  side: "left" | "right";
  isActive: boolean;
  playerIdx: 0 | 1;
  goesFirst: 0 | 1;
  turn: number;
  onUpdate: (patch: Partial<Player>) => void;
}) {
  const [configOpen, setConfigOpen] = useState(false);

  const goesSecond = playerIdx !== goesFirst;
  const superEvoAvailable = !player.superEvoUsed && (goesSecond ? turn >= 6 : turn >= 7);
  const displayPronouns = player.pronouns === "Custom" ? player.customPronouns : player.pronouns;

  const borderGlow = isActive ? "border-accent/60 shadow-[0_0_24px_rgba(228,170,58,0.15)]" : "border-border";

  return (
    <div className={`relative flex flex-col gap-4 p-5 rounded-lg border bg-card transition-all duration-300 ${borderGlow}`}>
      {/* Active side strip */}
      <div
        className={`absolute top-0 w-1 h-full transition-all duration-300 ${isActive ? "bg-accent" : "bg-transparent"}`}
        style={{ [side === "left" ? "left" : "right"]: 0, borderRadius: side === "left" ? "0.375rem 0 0 0.375rem" : "0 0.375rem 0.375rem 0" }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5 min-w-0">
          <h2 className="text-lg font-bold tracking-wide uppercase truncate" style={{ ...cinzel, color: isActive ? "#e4aa3a" : "#e8dfc8" }}>
            {player.name}
          </h2>
          <div className="flex items-center gap-1.5 flex-wrap">
            {goesSecond
              ? <span className="text-[10px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded bg-[#4a7fc1]/15 text-[#4a7fc1] border border-[#4a7fc1]/30" style={raj}>Goes 2nd</span>
              : <span className="text-[10px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded bg-accent/10 text-accent/70 border border-accent/20" style={raj}>Goes 1st</span>
            }
            {player.playerClassUniverse && (
              <span className="text-[10px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded bg-primary/20 text-foreground/60 border border-border" style={raj}>{player.playerClassUniverse}</span>
            )}
            {displayPronouns && (
              <span className="text-[10px] font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded bg-muted text-muted-foreground" style={raj}>{displayPronouns}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
          {isActive && (
            <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/30" style={raj}>Active</span>
          )}
          <button
            onClick={() => setConfigOpen((v) => !v)}
            className={`flex items-center justify-center w-6 h-6 rounded border transition-all active:scale-95 ${
              configOpen ? "border-accent/60 text-accent bg-accent/10" : "border-border text-muted-foreground hover:border-accent/30 hover:text-foreground"
            }`}
          >
            <Settings size={12} />
          </button>
        </div>
      </div>

      {configOpen && <PlayerConfigDrawer player={player} onUpdate={onUpdate} onClose={() => setConfigOpen(false)} />}

      <div className="h-px bg-border" />

      {/* Stats row */}
      <div className="flex items-start justify-around gap-1">
        <SimpleStat label="DEF" icon={<Shield size={11} />}
          value={player.defense}
          onInc={() => onUpdate({ defense: player.defense + 1 })}
          onDec={() => onUpdate({ defense: Math.max(0, player.defense - 1) })}
        />
        <div className="w-px self-stretch bg-border/50" />
        <FractionStat label="PP" icon={<Zap size={11} />}
          value={player.pp} max={player.maxPP} maxCap={MAX_PP}
          onInc={() => onUpdate({ pp: Math.min(player.maxPP, player.pp + 1) })}
          onDec={() => onUpdate({ pp: Math.max(0, player.pp - 1) })}
          onMaxInc={() => onUpdate({ maxPP: Math.min(MAX_PP, player.maxPP + 1) })}
          onMaxDec={() => onUpdate({ maxPP: Math.max(0, player.maxPP - 1), pp: Math.min(player.pp, Math.max(0, player.maxPP - 1)) })}
        />
        <div className="w-px self-stretch bg-border/50" />
        <FractionStat label="EVO" icon={<Star size={11} />}
          value={player.evoPoints} max={player.maxEvoPoints} maxCap={MAX_EVO}
          onInc={() => onUpdate({ evoPoints: Math.min(player.maxEvoPoints, player.evoPoints + 1) })}
          onDec={() => onUpdate({ evoPoints: Math.max(0, player.evoPoints - 1) })}
          onMaxInc={() => onUpdate({ maxEvoPoints: Math.min(MAX_EVO, player.maxEvoPoints + 1) })}
          onMaxDec={() => onUpdate({ maxEvoPoints: Math.max(0, player.maxEvoPoints - 1), evoPoints: Math.min(player.evoPoints, Math.max(0, player.maxEvoPoints - 1)) })}
        />
      </div>

      <SuperEvoButton used={player.superEvoUsed} available={superEvoAvailable} onUse={() => onUpdate({ superEvoUsed: true })} />
    </div>
  );
}