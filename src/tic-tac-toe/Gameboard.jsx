import React from "react";
import Cell from "./Cell";
import WinnerBanner from "./WinnerBanner";
import ScoreBoard from "./ScoreBoard";
import { useState, useEffect } from "react";

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
	const [showWinnerBanner, setShowWinnerBanner] = useState(false);

	const showWinner = () => {
		setShowWinnerBanner(true);
	};

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

	useEffect(() => {
		const winner = checkWinner(gameMatrix);
		if (winner) {
			setWinner(winner);
		}
	}, [gameMatrix]);

	const handleTurn = (index) => {
		if (gameMatrix[index] === null) {
			const updatedGameMatrix = [...gameMatrix]; // Create a copy of the gameMatrix
			updatedGameMatrix[index] = playerTurn; // Update only the clicked cell
			setGameMatrix(updatedGameMatrix); // Update the gameMatrix state
			setPlayerTurn(playerTurn === "X" ? "O" : "X"); // Toggle player turn
		}
	};

	const checkWinner = (gameMatrix) => {
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
				setShowWinnerBanner(true);
				return gameMatrix[a]; // Return 'X' or 'O' as the winner
			}
		}
		return null; // Return null if there's no winner yet
	};

	const handleRestart = () => {
		setGameMatrix([null, null, null, null, null, null, null, null, null]);
		setPlayerTurn("X");
		setShowWinnerBanner(false);
		setWinner(null);
	};

	return (
		<div className="tic-tac-toe-container">
			<ScoreBoard />
			<div className="gameboard">
				{gameMatrix.map((status, index) => (
					<Cell
						handleTurn={() => handleTurn(index)}
						key={index}
						status={status}
					/>
				))}
				{showWinnerBanner && (
					<div className="overlay">
						<div className="winner-banner-container">
							<WinnerBanner winner={winner} handleRestart={handleRestart} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Gameboard;
