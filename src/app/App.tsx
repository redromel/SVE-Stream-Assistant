import { useState, useCallback } from "react";
import { MAX_PP } from "../types/const";
import type { GameState, Player } from "../types/player";
import { PlayerPanel } from "./components/PlayerPanel";
import { TurnPanel } from "./components/TurnPanel";

function makeInitialState(
  goesFirst: 0 | 1 = 0,
  p1?: Partial<Player>,
  p2?: Partial<Player>
): GameState {
  const base = (goesSecond: boolean): Player => ({
    name: "", defense: 20, pp: goesSecond ? 0 : 1, maxPP: goesSecond ? 0 : 1,
    evoPoints: goesSecond ? 3 : 0,
    maxEvoPoints: 3,
    superEvoUsed: false,
    playerClassUniverse: "", pronouns: "", customPronouns: "",
  });
  return {
    players: [
      { ...base(goesFirst !== 0), name: "Player 1", ...p1 },
      { ...base(goesFirst !== 1), name: "Player 2", ...p2 },
    ],
    turn: 1,
    activePlayer: 0,
    goesFirst,
  };
}

export default function App() {
  const [state, setState] = useState<GameState>(() => makeInitialState(0));

  const updatePlayer = useCallback((idx: 0 | 1, patch: Partial<Player>) => {
    setState((s) => {
      const players = [...s.players] as [Player, Player];
      players[idx] = { ...players[idx], ...patch };
      return { ...s, players };
    });
  }, []);

  const handleNextTurn = useCallback(() => {
    setState((s) => {
      const nextActive = s.activePlayer === 0 ? 1 : 0;
      const nextTurn = s.activePlayer === 1 ? s.turn + 1 : s.turn;
      const players = [...s.players] as [Player, Player];
      const newMaxPP = Math.min(MAX_PP, players[nextActive].maxPP + 1);
      players[nextActive] = { ...players[nextActive], maxPP: newMaxPP, pp: newMaxPP };
      return { ...s, players, turn: nextTurn, activePlayer: nextActive };
    });
  }, []);

  const handleReset = useCallback(() => {
    setState((s) => {
      const keep = (p: Player) => ({
        name: p.name, playerClassUniverse: p.playerClassUniverse,
        pronouns: p.pronouns, customPronouns: p.customPronouns,
      });
      return makeInitialState(s.goesFirst, keep(s.players[0]), keep(s.players[1]));
    });
  }, []);

  const handleSwapFirst = useCallback(() => {
    setState((s) => {
      const newFirst = s.goesFirst === 0 ? 1 : 0 as 0 | 1;
      const players = [...s.players] as [Player, Player];
      players[newFirst] = { ...players[newFirst], evoPoints: 0, pp: s.players[newFirst  === 0 ? 1 : 0].pp, maxPP: s.players[newFirst  === 0 ? 1 : 0].maxPP };
      players[newFirst === 0 ? 1 : 0] = { ...players[newFirst === 0 ? 1 : 0], evoPoints: 3, pp: s.players[newFirst].pp, maxPP: s.players[newFirst].maxPP };
      return { ...s, goesFirst: newFirst, players };
    });
  }, []);

  return (
    <div className="min-h-screen w-full bg-background flex flex-col" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
      <header className="border-b border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 rounded-full bg-accent" />
          <h1 className="text-sm font-bold tracking-widest uppercase text-foreground/80" style={{ fontFamily: "'Cinzel', serif" }}>
            Shadowverse Evolve
          </h1>
          <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-semibold">Stream Assistant</span>
        </div>
        <span className="text-[10px] text-muted-foreground tracking-widest uppercase font-semibold">Game Manager</span>
      </header>

      <main className="flex-1 flex items-start justify-center p-6">
        <div className="w-full max-w-4xl grid gap-4" style={{ gridTemplateColumns: "1fr auto 1fr" }}>
          <PlayerPanel player={state.players[0]} side="left" isActive={state.activePlayer === 0}
            playerIdx={0} goesFirst={state.goesFirst} turn={state.turn}
            onUpdate={(p) => updatePlayer(0, p)}
          />
          <TurnPanel turn={state.turn} activePlayer={state.activePlayer} players={state.players}
            goesFirst={state.goesFirst} onNextTurn={handleNextTurn} onReset={handleReset} onSwapFirst={handleSwapFirst}
          />
          <PlayerPanel player={state.players[1]} side="right" isActive={state.activePlayer === 1}
            playerIdx={1} goesFirst={state.goesFirst} turn={state.turn}
            onUpdate={(p) => updatePlayer(1, p)}
          />
        </div>
      </main>

      <footer className="border-t border-border px-6 py-2 flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground tracking-widest uppercase">OBS Control Panel</span>
        <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
          Turn {state.turn} · {state.players[state.activePlayer].name}&apos;s turn
        </span>
      </footer>
    </div>
  );
}