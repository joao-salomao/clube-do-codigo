import { ask, showMessage, showBoard } from "./utils";
import { TicTacToe, PlayerOne, PlayerTwo } from "../../ticTacToe";
import { DatabaseInterface, PlayerScoresDatabase } from "../../database";

(async () => {
  const db: DatabaseInterface = new PlayerScoresDatabase();

  showMessage(">> Jogo da velha <<");

  const winners = await db.getWinners();
  if (winners.length > 0) {
    showMessage("Melhores jogadores:");
    console.table(winners);
  }

  const playerOneName = ask("Qual o nome do primeiro jogador: ");
  const playerTwoName = ask("Qual o nome do segundo jogador: ");

  const playerOneIsRegistered = winners.find((w) => w.name === playerOneName);
  const playerTwoIsRegistered = winners.find((w) => w.name === playerTwoName);

  if (!playerOneIsRegistered)
    db.addPlayer({ name: playerOneName, wonCount: 0 });

  if (!playerTwoIsRegistered)
    db.addPlayer({ name: playerTwoName, wonCount: 0 });

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

  const hasWinner = game.winner !== null;

  if (!hasWinner) {
    showMessage("Deu velha!");
    return;
  }

  showMessage(`O jogador ${game.winner!.name} venceu!`);

  db.incrementPlayerWonCount(game.winner!.name);
})();
