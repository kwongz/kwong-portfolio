import React, { useState, useEffect } from "react";

function Cell({ status, handleTurn, gameMode }) {
  const [mark, setMark] = useState("");
  const [filledCell, setFilledCell] = useState(null);

  useEffect(() => {
    if (gameMode === "tic-tac-toe") {
      // Set the class name based on player
      const newMark = status === 1 ? "x-mark" : status === 2 ? "o-mark" : "";
      setMark(newMark);
      // set the filled cell with proper player icon
      const newFilledCell = status === 1 ? "X" : status === 2 ? "O" : "";
      setFilledCell(newFilledCell);
    }

    if (gameMode === "connect4") {
      // Set the class name based on player
      const newMark = status === 1 ? "red" : status === 2 ? "blue" : "";
      setMark(newMark);
    }
  }, [status]);

  return (
    <div className={`cell ${mark}`} onClick={handleTurn}>
      {filledCell}
    </div>
  );
}

export default Cell;
