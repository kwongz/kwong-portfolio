import React from "react";
import Cell from "./Cell";
import { useState, useEffect } from "react";
import WinnerBanner from "./WinnerBanner";
import ScoreBoard from "./ScoreBoard";

function Connect4() {
	// gameboard matrix
	const rows = 6;
	const columns = 7;

	// Connect 4 State
	const [playerTurn, setPlayerTurn] = useState(1);
	const [winner, setWinner] = useState(false);
	const [showWinnerBanner, setShowWinnerBanner] = useState(false);
	const [score, setScore] = useState({ player1: 0, player2: 0 });
	const [gameMatrix, setGameMatrix] = useState(
		Array.from({ length: rows }, () =>
			Array.from({ length: columns }, () => null)
		) // Initialize the game matrix
	);

	// Function to render the game board
	const renderBoard = () => {
		const board = [];
		for (let i = 0; i < gameMatrix.length; i++) {
			for (let j = 0; j < gameMatrix[i].length; j++) {
				// Create Cell components for each position in the game matrix
				board.push(
					<Cell
						key={`${i}-${j}`}
						status={gameMatrix[i][j]}
						handleTurn={() => handleTurn(i, j)}
						gameMode={"connect4"}
						connect4Position={`${i}-${j}`}
						
					/>
				);
			}
		}
		return board;
	};

	const handleScore = (winnerPlayer) => {
		const updatedScore = { ...score };
		updatedScore[`player${winnerPlayer}`] =
			updatedScore[`player${winnerPlayer}`] + 1;
		setScore(updatedScore);
	};

	const handleTurn = (row, column) => {
		console.log(row, column)
		// loop through the rows in the selected column to check if they are empty, if it is empty fill it with the player, change plaeyrs and exit loop
		for (let i = 5; i >= 0; i--) {
			if (gameMatrix[i][column] === null) {
				const updatedGameMatrix = [...gameMatrix];
				updatedGameMatrix[i][column] = playerTurn;
				setGameMatrix(updatedGameMatrix);
				setPlayerTurn(playerTurn === 1 ? 2 : 1);
				checkWinner(updatedGameMatrix, row, column);
				return;
			}
		}
	};


	const checkWinner = (gameMatrix, row, column) => {
		// create a recursive function that checks the surrounding cells around the cell that was just updated with a player's move. If there are 4 consecutive cells filled with the same player, return them as the winner
		let currentCellDrop = playerTurn
		let consecutiveCellCount = 0

		// Define movements that access the game matrix
		const downColumn = (row, column) => gameMatrix[row + 1][column]; // Access the cell below
		const upColumn = (row, column) => gameMatrix[row - 1][column];   // Access the cell above
		const leftRow = (row, column) => gameMatrix[row][column - 1];    // Access the cell to the left
		const rightRow = (row, column) => gameMatrix[row][column + 1];   // Access the cell to the right



		return null; // Return null if there's no winner yet
	};

	const handleRestart = () => {
		setGameMatrix(Array.from({ length: rows }, () => Array.from({ length: columns }, () => null)));
		setPlayerTurn(1);
		setShowWinnerBanner(false);
		setWinner(null);
	};

	return (
		<div className="connect4-container">
			<ScoreBoard
				player1={score.player1}
				player2={score.player2}
				winner={winner}
				gameMode={"connect4"}
			/>
			<div className="player-turn-banner">Player {playerTurn}'s Turn</div>
			<button
				className="Zero-score-button"
				onClick={() => setScore({ player1: 0, player2: 0 })}>
				Reset Scores
			</button>
			<div className="gameboard">{renderBoard()}</div>
			{showWinnerBanner && (
				<div className="overlay">
					<div className="winner-banner-container">
						<WinnerBanner winner={winner} handleRestart={handleRestart} />
					</div>
				</div>
			)}
		</div>
	);
}

export default Connect4;
