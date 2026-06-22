import { useState, useRef, useEffect } from "react";
import { Check, X } from "lucide-react";
import { SVE_CLASSES, PRONOUN_OPTIONS } from "../../types/const";
import type { Player } from "../../types/player";

export function PlayerConfigDrawer({ player, onUpdate, onClose }: {
  player: Player;
  onUpdate: (patch: Partial<Player>) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState({
    name: player.name,
    playerClassUniverse: player.playerClassUniverse,
    pronouns: player.pronouns,
    customPronouns: player.customPronouns,
  });

  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => { nameRef.current?.focus(); }, []);
  const commit = () => { onUpdate(draft); onClose(); };

  const inputCls = "w-full rounded border border-border bg-input-background px-3 py-1.5 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-accent/60 transition-colors";
  const labelCls = "block text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-1";
  const raj = { fontFamily: "'Rajdhani', sans-serif" };

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg border border-accent/30 bg-secondary/40">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-widest uppercase text-accent" style={raj}>Player Config</span>
        <div className="flex gap-1.5">
          <button onClick={commit} className="flex items-center gap-1 px-2.5 py-1 rounded bg-accent text-accent-foreground text-xs font-bold tracking-wide hover:bg-accent/90 active:scale-95 transition-all" style={raj}>
            <Check size={11} strokeWidth={3} /> Save
          </button>
          <button onClick={onClose} className="flex items-center justify-center w-6 h-6 rounded border border-border text-muted-foreground hover:text-foreground transition-colors">
            <X size={12} />
          </button>
        </div>
      </div>

      <div>
        <label className={labelCls}>Display Name</label>
        <input ref={nameRef} className={inputCls} value={draft.name} maxLength={24}
          onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
          onKeyDown={(e) => { if (e.key === "Enter") commit(); }}
          placeholder="Player name" style={raj}
        />
      </div>

      <div>
        <label className={labelCls}>Class / Universe</label>
        <select className={inputCls + " cursor-pointer"} value={draft.playerClassUniverse}
          onChange={(e) => setDraft((d) => ({ ...d, playerClassUniverse: e.target.value }))}
          style={raj}
        >
          <option value="">— Unset —</option>
          {SVE_CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label className={labelCls}>Pronouns</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {PRONOUN_OPTIONS.map((p) => (
            <button key={p} onClick={() => setDraft((d) => ({ ...d, pronouns: p }))}
              className={`px-2.5 py-1 rounded text-xs font-semibold tracking-wide border transition-all active:scale-95 ${
                draft.pronouns === p
                  ? "bg-accent/20 border-accent/60 text-accent"
                  : "bg-secondary/60 border-border text-muted-foreground hover:border-accent/30 hover:text-foreground"
              }`}
              style={raj}
            >{p}</button>
          ))}
        </div>
        {draft.pronouns === "Custom" && (
          <input className={inputCls} value={draft.customPronouns} maxLength={32}
            onChange={(e) => setDraft((d) => ({ ...d, customPronouns: e.target.value }))}
            placeholder="e.g. xe/xem" style={raj}
          />
        )}
      </div>
    </div>
  );
}