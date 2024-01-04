import React, { useState, useEffect } from "react";

function Cell({ status, handleTurn, gameMode }) {
	const [mark, setMark] = useState("");
	const [filledCell, setFilledCell] = useState(null);

	useEffect(() => {
		if (gameMode === "tic-tac-toe") {
			const newMark = status === 1 ? "x-mark" : status === 2 ? "o-mark" : "";
			setMark(newMark);
			const newFilledCell = status === 1 ? "X" : status === 2 ? "O" : "";
			setFilledCell(newFilledCell);
		}
	}, [status]);

	return (
		<div className={`cell ${mark}`} onClick={handleTurn}>
			{filledCell}
		</div>
	);
}

export default Cell;
