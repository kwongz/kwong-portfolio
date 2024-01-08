import React from "react";
import Cell from "./Cell";
import { useState } from "react";
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
		// loop through the rows in the selected column to check if they are empty, if it is empty fill it with the player, change plaeyrs and exit loop
		for (let i = 5; i >= 0; i--) {
			if (gameMatrix[i][column] === null) {
				const updatedGameMatrix = [...gameMatrix];
				updatedGameMatrix[i][column] = playerTurn;
				setGameMatrix(updatedGameMatrix);
				setPlayerTurn(playerTurn === 1 ? 2 : 1);
				checkWinner(updatedGameMatrix, i, column); //i and column represent the position of the dropped coin
				return;
			}
		}
	};

	const checkWinner = (
		updatedGameMatrix,
		droppedCoinRow,
		droppedCoinColumn
	) => {
		// create a recursive function that checks the surrounding cells around the cell that was just updated with a player's move. If there are 4 consecutive cells filled with the same player, return them as the winner

		//create a move list to add to the row and column values directionally move around the board
		const moveList = {
			up: { row: -1, column: 0 },
			down: { row: 1, column: 0 },
			left: { row: 0, column: -1 },
			right: { row: 0, column: 1 },
			upLeft: { row: -1, column: -1 },
			downRight: { row: 1, column: 1 },
			upRight: { row: -1, column: 1 },
			downLeft: { row: 1, column: -1 },
		};

		let consecutiveCellCount = 0; // outside of loops so they retain their individual counts and dont reset on re-render
		// let leftCell = moveLeft(droppedCoinRow, droppedCoinColumn);

		//create a function that returns the final updated matrix position thats being checked, make it take arguments so it can move in any direction
		const checkDirection = (
			updatedGameMatrix,
			droppedCoinRow,
			droppedCoinColumn,
			{ row, column }
		) => {
			// create a obj to hold the new cell that is being checked
			const newPos = {
				row: droppedCoinRow + row,
				column: droppedCoinColumn + column,
			};
			// if the consecutive count has reached 3 then announce winner
			if (consecutiveCellCount === 3) {
				return console.log("winner");
			}
			// if the new position being checked is not out of bounds, and is the same value of the current player, increase the consecutive cell count and call that same function with the same direction.
			else if (
				newPos.row >= 0 ||
				newPos.row <= updatedGameMatrix.length ||
				newPos.column >= 0 ||
				(newPos.column <= updatedGameMatrix[0].length &&
					updatedGameMatrix[newPos.row][newPost.column] === playerTurn)
			)
				consecutiveCellCount++;
			checkDirection(updatedGameMatrix, newPos.row, newPos.column, {
				row,
				column,
			});
		};

		const checkDown = (row, column) => {
			if (consecutiveCellCount === 3) {
				return console.log("winner");
			} else if (
				row < updatedGameMatrix.length &&
				updatedGameMatrix[row][column] === playerTurn
			) {
				consecutiveCellCount++;
				checkDown(...Object.values(moveDown(row, column)));
			}
		}; //End of checkDown

		const checkLeftRight = (row, column, direction) => {
			//Checks if 3 consecutive cells have been found to be the same as the player's turn, the cell that the player dropped is assumed
			if (consecutiveCellCount === 3) {
				return console.log("winner");
			}

			if (
				//check that left cell is not out of bounds, cell is same as player, check is moving LEFT
				column - 1 >= 0 &&
				updatedGameMatrix[row][column] === playerTurn &&
				direction === "left"
			) {
				// increment count by 1, call function again to check in the LEFT of the last checked cell
				consecutiveCellCount++;
				checkLeftRight(...Object.values(moveLeft(row, column)), "left");
			} else if (direction === "left") {
				// since no win was found leftwards, keep count and go back to original cell position and check to the RIGHT
				checkLeftRight(
					...Object.values(moveRight(droppedCoinRow, droppedCoinColumn)),
					"right"
				);
			}
			//check that right cell is not out of bounds, cell is same as player, check is moving RIGHT
			if (
				column + 1 <= updatedGameMatrix[0].length &&
				updatedGameMatrix[row][column] === playerTurn &&
				direction === "right"
			) {
				// increment count by 1, call function again to check in the RIGHT of the last checked cell
				consecutiveCellCount++;
				checkLeftRight(...Object.values(moveRight(row, column)), "right");
			}
		}; //End of checkLeftRight

		// initial calls to check directional functions
		checkDown(...Object.values(moveDown(droppedCoinRow, droppedCoinColumn)));
		checkLeftRight(
			...Object.values(moveLeft(droppedCoinRow, droppedCoinColumn)),
			"left"
		);
	}; // End of checkWinner

	const handleRestart = () => {
		console.log("click");
		setGameMatrix(
			Array.from({ length: rows }, () =>
				Array.from({ length: columns }, () => null)
			)
		);
		setPlayerTurn(1);
		setShowWinnerBanner(false);
		setWinner(null);
	};

	const zeroScore = () => {
		setScore({ player1: 0, player2: 0 });
		setPlayerTurn(1);
		setGameMatrix(
			Array.from({ length: rows }, () =>
				Array.from({ length: columns }, () => null)
			)
		);
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
			<button className="Zero-score-button" onClick={() => zeroScore()}>
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
