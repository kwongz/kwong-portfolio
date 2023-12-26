import React from "react";
import Cell from "./Cell";

function Gameboard() {
	const gameMatrix = [null, null, null, null, null, null, null, null, null];
	return (
		<div className="gameboard">
			{gameMatrix.map((status, index) => (
				<Cell key={index} status={status} index={index} />
			))}
		</div>
	);
}

export default Gameboard;
