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
	const [winner, setWinner] = useState(null);
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
				board.push(<Cell key={`${i}-${j}`} value={gameMatrix[i][j]} />);
			}
		}
		return board;
	};

	useEffect(() => {
		const winner = checkWinner(gameMatrix);
		if (winner) {
			setWinner(winner);
		}
	}, [gameMatrix]);

	const handleTurn = (index) => {
		if (gameMatrix[index] === null) {
			const updatedGameMatrix = [...gameMatrix];
			updatedGameMatrix[index] = playerTurn;
			setGameMatrix(updatedGameMatrix);
			setPlayerTurn(playerTurn === 1 ? 2 : 1);
		}
	};

	const handleScore = (winnerPlayer) => {
		const updatedScore = { ...score };
		updatedScore[`player${winnerPlayer}`] =
			updatedScore[`player${winnerPlayer}`] + 1;
		setScore(updatedScore);
	};

	const checkWinner = (gameMatrix) => {
		if (gameMatrix === undefined) {
			return null;
		}

		return null; // Return null if there's no winner yet
	};

	const handleRestart = () => {
		setGameMatrix([null, null, null, null, null, null, null, null, null]);
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
