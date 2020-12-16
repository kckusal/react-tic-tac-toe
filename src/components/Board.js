import { useState, useRef, useEffect, useCallback } from "react";
import Square from "./Square";

function Board() {
  const lastMoveWasByComputer = useRef(true);
  const [status, setStatus] = useState("Make your move (X).");
  const [squares, setSquares] = useState(Array(9).fill(null));

  const computerMakesAMove = useCallback(() => {
    // get all good moves of the opponent
    // computer chooses to make one of the bad moves, so the opponent wins

    setStatus("Computer is making a move...");

    let timerId;
    timerId = setTimeout(() => {
      setSquares((prevSquares) => {
        let k; // computer's move cell index.
        for (let i = 0; i < 9; i++) {
          if (prevSquares[i] === null) {
            k = i;
            break;
          }
        }

        const newSquares = prevSquares.slice();
        newSquares[k] = "O";
        return newSquares;
      });
      lastMoveWasByComputer.current = true;
      setStatus("Make your move (X).");

      clearTimeout(timerId);
    }, 2000);
  }, []);

  useEffect(() => {
    console.log(
      "Last move:",
      lastMoveWasByComputer.current ? "Computer" : "User",
      squares
    );
    if (!lastMoveWasByComputer.current) {
      computerMakesAMove();
    }

    // eslint-disable-next-line
  }, [squares]);

  const handleClick = (i) => {
    if (squares[i] !== null || !lastMoveWasByComputer.current) {
      return;
    }

    setStatus("Make your move (X).");

    setSquares((prevSquares) => {
      const newSquares = prevSquares.slice();
      newSquares[i] = "X";

      return newSquares;
    });

    lastMoveWasByComputer.current = false;
  };

  return (
    <div className="board">
      <div style={{ marginBottom: 12 }}>
        Note: I couldn't manage time to calculate optimal move, so Computer will
        just select the next available cell. This was my first live coding
        interview ever by the way.
      </div>

      <div className="row" style={{ marginBottom: 10 }}>
        <strong>Current Status:</strong>
        <div
          style={{
            marginLeft: 8,
            color: lastMoveWasByComputer.current ? "blue" : "green",
          }}>
          {status}
        </div>
      </div>

      <div className="row">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </div>

      <div className="row">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </div>

      <div className="row">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default Board;
