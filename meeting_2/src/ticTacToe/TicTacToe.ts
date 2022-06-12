import {
  GameInterface,
  PlayerInterface,
  GameOverError,
  BoardTotallyMarkedError,
  InvalidPositionError,
  PositionAlreadyMarkedError,
} from "./types";
import { PlayerOne } from "./PlayerOne";
import { PlayerTwo } from "./PlayerTwo";

export class TicTacToe implements GameInterface {
  static readonly EMPTY_CELL = " ";
  static readonly VALID_POSITIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  playerOne: PlayerOne;
  playerTwo: PlayerTwo;
  currentPlayer: PlayerInterface;
  winner: PlayerInterface | null;
  board: string[];

  constructor(playerOne: PlayerOne, playerTwo: PlayerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.currentPlayer = playerOne;
    this.winner = null;
    this.board = [
      TicTacToe.EMPTY_CELL,
      TicTacToe.EMPTY_CELL,
      TicTacToe.EMPTY_CELL,
      TicTacToe.EMPTY_CELL,
      TicTacToe.EMPTY_CELL,
      TicTacToe.EMPTY_CELL,
      TicTacToe.EMPTY_CELL,
      TicTacToe.EMPTY_CELL,
      TicTacToe.EMPTY_CELL,
    ];
  }

  /**
   *
   */
  play(position: number): void {
    this.fillBoardPosition(position);
    this.checkWinner();
    this.updateCurrentPlayer();
  }

  gameIsOver(): boolean {
    return this.hasWinner() || this.boardTotallyMarked();
  }

  /**
   * Fill the board in the provided position with the symbol of the current player
   *
   * @param {number} position
   * @throws {GameOverError}
   * @throws {InvalidPositionError}
   * @throws {PositionAlreadyMarkedError}
   * @throws {BoardTotallyMarkedError}
   */
  private fillBoardPosition(position: number) {
    if (this.hasWinner()) {
      throw new GameOverError(
        `Game Over! O jogador ${this.currentPlayer.name} venceu a partida.`
      );
    }

    if (!this.positionIsValid(position)) {
      throw new InvalidPositionError(
        `A posição informada é invalida. As posições disponíveis são: ${TicTacToe.VALID_POSITIONS.join(
          ", "
        )}.`
      );
    }

    const parsedPosition = position - 1;

    if (!this.positionIsEmpty(parsedPosition)) {
      throw new PositionAlreadyMarkedError(
        "A posição informada já está marcada."
      );
    }

    if (this.boardTotallyMarked()) {
      throw new BoardTotallyMarkedError(
        "Deu velha! Não existem mais posições disponíveis para marcar."
      );
    }

    this.board[parsedPosition] = this.currentPlayer.getSymbol();
  }

  private positionIsValid(position: number): boolean {
    return TicTacToe.VALID_POSITIONS.includes(position);
  }

  private hasWinner(): boolean {
    return this.winner !== null;
  }

  private boardTotallyMarked(): boolean {
    return this.board.every((cell) => cell !== TicTacToe.EMPTY_CELL);
  }

  private positionIsEmpty(position: number): boolean {
    return this.board[position] === TicTacToe.EMPTY_CELL;
  }

  private checkWinner() {
    const symbol = this.currentPlayer.getSymbol();

    const winnerPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const positions of winnerPositions) {
      if (
        this.board[positions[0]] === symbol &&
        this.board[positions[1]] === symbol &&
        this.board[positions[2]] === symbol
      ) {
        this.winner = this.currentPlayer;
        return;
      }
    }
  }

  private updateCurrentPlayer() {
    if (this.currentPlayer === this.playerOne) {
      this.currentPlayer = this.playerTwo;
    } else {
      this.currentPlayer = this.playerOne;
    }
  }
}
