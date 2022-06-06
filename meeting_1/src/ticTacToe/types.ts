export class GameOverError extends Error {}
export class PositionAlreadyMarkedError extends Error {}
export class BoardTotallyMarkedError extends Error {}
export class InvalidPositionError extends Error {}

export enum Symbol {
  X = "X",
  O = "O",
}

export interface PlayerInterface {
  name: string;
  getSymbol(): Symbol;
}

export interface GameInterface {
  playerOne: PlayerInterface;
  playerTwo: PlayerInterface;
  board: string[];
  play(position: number): void;
  gameIsOver(): boolean;
}
