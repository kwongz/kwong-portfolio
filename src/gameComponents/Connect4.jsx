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
		console.log(winnerPlayer);
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
				const winningPlayer = checkWinner(updatedGameMatrix, i, column); //i and column represent the position of the dropped coin
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
			none: {},
		};

		let consecutiveCellCount = 0; // outside of loops so they retain their individual counts and dont reset on re-render
		// let leftCell = moveLeft(droppedCoinRow, droppedCoinColumn);
		let winningPlayer = null;

		//create a function that returns the final updated matrix position thats being checked, make it take arguments so it can move in any direction
		const checkDirection = (
			updatedGameMatrix,
			droppedCoinRow,
			droppedCoinColumn,
			consecutiveCellCount,
			moveList,
			direction1,
			direction2,
			firstDirection
		) => {
			//
			const newPos = {
				row: droppedCoinRow + moveList[direction1].row,
				column: droppedCoinColumn + moveList[direction1].column,
			};
			const newPos2 = {
				row: droppedCoinRow + moveList[direction2].row,
				column: droppedCoinColumn + moveList[direction2].column,
			};
			//Check logic
			//if 3 consecutive coins have been counted, return the winner
			if (consecutiveCellCount === 3) {
				console.log("winner", playerTurn, direction1, direction2);
				setWinner(true);
				handleScore(playerTurn);
				setShowWinnerBanner(true);
			}
			//handles search in first direction
			//catches any out of bound cells
			//checks if function is searching in first direction
			if (
				newPos.row >= 0 &&
				newPos.row < updatedGameMatrix.length &&
				newPos.column >= 0 &&
				newPos.column <= updatedGameMatrix[0].length &&
				firstDirection
			) {
				// second if check
				//checks if cell in check is same as player turn
				//	if true, increase count, and keep searching in firstDirection, while adding the new cell coordinates to be searched
				if (updatedGameMatrix[newPos.row][newPos.column] === playerTurn) {
					consecutiveCellCount++;
					// console.log('check1', direction1, consecutiveCellCount)
					checkDirection(
						updatedGameMatrix,
						newPos.row,
						newPos.column,
						consecutiveCellCount,
						moveList,
						direction1,
						direction2,
						true
					);
					//handles if cell check is not the same as player
					//checks to see if we are still in first direction, then set count to 0
					//starts checking cells from the last cell that was checked and moves in the opposite direction while incrementing count
				} else if (firstDirection) {
					consecutiveCellCount = 0;
					// console.log('switch', direction2, consecutiveCellCount, newPos)
					checkDirection(
						updatedGameMatrix,
						droppedCoinRow,
						droppedCoinColumn,
						consecutiveCellCount,
						moveList,
						direction1,
						direction2,
						false
					);
				}
				//e.g ??0RRR???   ? = unknown cell 0 = cell was null R = player1 Red Cell
				//		 <-321   		Checks in first direction, with Cellcount++
				//		??0R?????		switch occurs, cell count reset to 0
				//		??0RRR???
				//			 123->
				//
			}
			// handles when direction is switched, catches out of bound cells, and increments count while calling the checkdirection function to search in the opposite direction for firstDirection
			if (
				newPos2.row >= 0 &&
				newPos2.row < updatedGameMatrix.length &&
				newPos2.column >= 0 &&
				newPos2.column <= updatedGameMatrix[0].length &&
				updatedGameMatrix[newPos2.row][newPos2.column] === playerTurn &&
				!firstDirection
			) {
				consecutiveCellCount++;
				// console.log('check2', direction2, consecutiveCellCount, newPos2)
				checkDirection(
					updatedGameMatrix,
					newPos2.row,
					newPos2.column,
					consecutiveCellCount,
					moveList,
					direction1,
					direction2,
					false
				);
			}
			//handles if last cell drop is in 0 index column, immediately checks right
			else if (newPos.column < 0) {
				consecutiveCellCount = 0;
				consecutiveCellCount++;
				// console.log('check3', direction2, consecutiveCellCount, newPos2)
				checkDirection(
					updatedGameMatrix,
					newPos2.row,
					newPos2.column,
					consecutiveCellCount,
					moveList,
					direction1,
					direction2,
					false
				);
			}
		}; // end of check direction
		//
		checkDirection(
			updatedGameMatrix,
			droppedCoinRow,
			droppedCoinColumn,
			consecutiveCellCount,
			moveList,
			"down",
			"none",
			true
		);
		checkDirection(
			updatedGameMatrix,
			droppedCoinRow,
			droppedCoinColumn,
			consecutiveCellCount,
			moveList,
			"left",
			"right",
			true
		);
		checkDirection(
			updatedGameMatrix,
			droppedCoinRow,
			droppedCoinColumn,
			consecutiveCellCount,
			moveList,
			"upLeft",
			"downRight",
			true
		);
		checkDirection(
			updatedGameMatrix,
			droppedCoinRow,
			droppedCoinColumn,
			consecutiveCellCount,
			moveList,
			"upRight",
			"downLeft",
			true
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
