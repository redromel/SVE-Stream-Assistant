import { StepBtn } from "./StepBtn";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const label = { fontFamily: "'Rajdhani', sans-serif" };

export function SimpleStat({ label: text, icon, value, onInc, onDec }: {
  label: string; icon: React.ReactNode; value: number;
  onInc: () => void; onDec: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex items-center gap-1">
        <span className="text-accent opacity-80">{icon}</span>
        <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ ...label, color: "#7a8aaa" }}>{text}</span>
      </div>
      <div className="flex items-center gap-2">
        <StepBtn dir="down" onClick={onDec} disabled={value <= 0} />
        <span className="text-4xl font-bold leading-none text-foreground tabular-nums w-10 text-center" style={mono}>{value}</span>
        <StepBtn dir="up" onClick={onInc} />
      </div>
    </div>
  );
}

export function FractionStat({ label: text, icon, value, max, onInc, onDec, onMaxInc, onMaxDec, maxCap }: {
  label: string; icon: React.ReactNode; value: number; max: number;
  onInc: () => void; onDec: () => void;
  onMaxInc: () => void; onMaxDec: () => void;
  maxCap: number;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex items-center gap-1">
        <span className="text-accent opacity-80">{icon}</span>
        <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ ...label, color: "#7a8aaa" }}>{text}</span>
      </div>
      <div className="flex items-center gap-2">
        <StepBtn dir="down" onClick={onDec} disabled={value <= 0} />
        <div className="flex items-center gap-0.5">
          <span className="text-4xl font-bold leading-none text-foreground tabular-nums" style={mono}>{value}</span>
          <span className="text-lg text-muted-foreground font-light">/</span>
          <span className="text-4xl font-bold leading-none text-muted-foreground tabular-nums" style={mono}>{max}</span>
        </div>
        <StepBtn dir="up" onClick={onInc} disabled={value >= max} />
      </div>
      <div className="flex items-center gap-2">
        <StepBtn dir="down" onClick={onMaxDec} disabled={max <= 0} />
        <span className="text-[9px] font-semibold tracking-widest uppercase text-muted-foreground/40" style={label}>max</span>
        <StepBtn dir="up" onClick={onMaxInc} disabled={max >= maxCap} />
      </div>
    </div>
  );
}
