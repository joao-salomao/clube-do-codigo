import { ask, showMessage, showBoard } from "./utils";
import { TicTacToe, PlayerOne, PlayerTwo } from "../../ticTacToe";

showMessage(">> Jogo da velha <<");

const playerOneName = ask("Qual o nome do primeiro jogador: ");
const playerTwoName = ask("Qual o nome do segundo jogador: ");

const game = new TicTacToe(
  new PlayerOne(playerOneName),
  new PlayerTwo(playerTwoName)
);

while (!game.gameIsOver()) {
  showBoard(game);
  showMessage(`Vez do jogador: ${game.currentPlayer.name}`);

  const position = ask("Que posição voce quer marcar? ");

  try {
    game.play(Number.parseInt(position));
  } catch (error: any) {
    showMessage(error.message);
  }
}

showBoard(game);
showMessage(`O jogador ${game.winner?.name} venceu!`);
