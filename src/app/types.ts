export const MAX_PP = 10;
export const MAX_EVO = 4;

export const SVE_CLASSES = [
  "Forestcraft", "Swordcraft", "Runecraft", "Dragoncraft",
  "Shadowcraft", "Bloodcraft", "Havencraft", "Portalcraft",
] as const;

export const PRONOUN_OPTIONS = ["He/Him", "She/Her", "They/Them", "Any/All", "Custom"] as const;

export interface QueuedCard {
  id: string;
  name: string;
  assetPath: string;
}

export interface PlayerState {
  name: string;
  defense: number;
  pp: number;
  maxPp: number;
  evoPoints: number;
  maxEvoPoints: number;
  superEvoUsed: boolean;
  playerClass: string;
  pronouns: string;
  customPronouns: string;
  cardQueue: QueuedCard[];
}

export interface GameState {
  players: [PlayerState, PlayerState];
  turn: number;
  activePlayer: 0 | 1;
  goesFirst: 0 | 1;
}
