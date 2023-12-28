import React from "react";
import Cell from "./Cell";
import WinnerBanner from "./WinnerBanner";
import { useState } from "react";

function Gameboard() {
	const [playerTurn, setPlayerTurn] = useState("X");
	const [gameMatrix, setGameMatrix] = useState([
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
	]);
	const [winner, setWinner] = useState(null);

	const winningCombinations = [
		// Rows
		[0, 1, 2], // Top row
		[3, 4, 5], // Middle row
		[6, 7, 8], // Bottom row

		// Columns
		[0, 3, 6], // Left column
		[1, 4, 7], // Middle column
		[2, 5, 8], // Right column

		// Diagonals
		[0, 4, 8], // Diagonal from top-left to bottom-right
		[2, 4, 6], // Diagonal from top-right to bottom-left
	];

	function checkWinner(gameMatrix) {
		if (gameMatrix === undefined) {
			return null; // Or handle the undefined case as needed
		}

		for (let combination of winningCombinations) {
			const [a, b, c] = combination;
			if (
				gameMatrix[a] &&
				gameMatrix[a] === gameMatrix[b] &&
				gameMatrix[a] === gameMatrix[c]
			) {
				setWinner(gameMatrix[a]);
				return gameMatrix[a]; // Return 'X' or 'O' as the winner
			}
		}
		return null; // Return null if there's no winner yet
	}

	return (
		<div className="gameboard">
			{gameMatrix.map((status, index) => (
				<Cell
					key={index}
					status={status}
					index={index}
					gameMatrix={gameMatrix}
					setGameMatrix={setGameMatrix}
					playerTurn={playerTurn}
					setPlayerTurn={setPlayerTurn}
					checkWinner={checkWinner}
					setWinner={setWinner}
					winner={winner}
				/>
			))}
			<WinnerBanner winner={winner} />
		</div>
	);
}

export default Gameboard;
