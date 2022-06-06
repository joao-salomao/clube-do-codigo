import { TicTacToe } from "../../../ticTacToe";
import { showMessage } from "./showMessage";

export const showBoard = (game: TicTacToe) => {
  const board = game.board;
  const text = `
    ${board[0]} | ${board[1]} | ${board[2]}
    ${board[3]} | ${board[4]} | ${board[5]}
    ${board[6]} | ${board[7]} | ${board[8]}
  `;
  showMessage(text);
};
