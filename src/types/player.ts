export interface Player {
  name: string;
  defense: number;
  pp: number;
  maxPP: number;
  evoPoints: number;
  maxEvoPoints: number;
  superEvoUsed: boolean;
  playerClassUniverse: string;
  pronouns: string;
  customPronouns: string;
}

export interface GameState {
  players: [Player, Player];
  turn: number; 
  activePlayer: 0 | 1;
  goesFirst: 0 | 1;
}