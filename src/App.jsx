import { useState } from "react";

import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedGameBoard(turns) {
  const gameBoard = [...initialBoard.map((array) => [...array])];

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, column } = square;
    gameBoard[row][column] = player;
  }

  return gameBoard;
}

function App() {
  const [logData, setLogData] = useState([]);
  const activePlayer = derivedActivePlayer(logData);
  const [playerObj, setPlayerObj] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  const gameBoard = derivedGameBoard(logData);
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol
    ) {
      winner = playerObj[firstSquareSymbol];
    }
  }

  const hasDraw = logData.length === 9 && !winner;

  function changeActivePlayer(rowIndex, colIndex) {
    setLogData((prevState) => {
      const currentPlayer = derivedActivePlayer(logData);

      const updatedState = [
        {
          square: {
            row: rowIndex,
            column: colIndex,
          },
          player: currentPlayer,
        },
        ...prevState,
      ];

      return updatedState;
    });
  }

  function handleRestart() {
    setLogData((prevState) => []);
  }

  function nameChangeHandler(symbol, name) {
    setPlayerObj((prevState) => {
      return { ...prevState, [symbol]: name };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange = {nameChangeHandler}
          ></Player>
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange = {nameChangeHandler}
          ></Player>
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} restartClick={handleRestart}></GameOver>
        )}
        <GameBoard
          onSelectSquare={changeActivePlayer}
          turns={gameBoard}
        ></GameBoard>
      </div>
      <Log turns={logData} />
    </main>
  );
}

export default App;
