import Square from "./Square";
import { calculateWinner } from "../utils";

export default function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    const winner = calculateWinner(squares);
    if (winner.player || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares, i);
  }

  function generateBoard(n) {
    let board = [];
    const winningLine = calculateWinner(squares).line;

    for (let i = 0; i < n; i++) {
      let row = [];
      for (let j = 0; j < n; j++) {
        const index = i * n + j;
        const isWinningSquare = winningLine && winningLine.includes(index);
        row.push(
          <Square
            key={index}
            value={squares[index]}
            onSquareClick={() => handleClick(index)}
            isWinningSquare={isWinningSquare}
          />
        );
      }
      board.push(
        <div key={i} className="board-row">
          {row}
        </div>
      );
    }
    return board;
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner.player) {
    status = "The winner is: " + winner.player;
  } else if (winner.isDraw) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div>
      <div className="status">{status}</div>
      {generateBoard(3)}
    </div>
  );
}
