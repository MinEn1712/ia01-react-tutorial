import { useState } from "react";
import Board from "./Board";

export default function GamePlay() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), move: null },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares, move) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, move },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function toggleSort() {
    setIsAscending(!isAscending);
  }

  const sortedHistory = isAscending ? history : [...history].reverse();

  const moves = sortedHistory.map((square, move) => {
    const moveIndex = isAscending ? move : history.length - 1 - move;
    const squareIndex = square.move;
    const row = squareIndex !== null ? Math.floor(squareIndex / 3) + 1 : null;
    const col = squareIndex !== null ? (squareIndex % 3) + 1 : null;
    let description;

    if (moveIndex > 0) {
      if (currentMove === moveIndex) {
        description = `You are at move #${moveIndex} (${row}, ${col})`;
      } else {
        description = `Go to move #${moveIndex} (${row}, ${col})`;
      }
    } else {
      description = "Go to game start";
    }
    return (
      <li key={moveIndex}>
        {currentMove === moveIndex ? (
          description
        ) : (
          <button onClick={() => jumpTo(moveIndex)}>{description}</button>
        )}
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={toggleSort}>
          {isAscending ? "Descending" : "Ascending"}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
