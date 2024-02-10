import React from "react";
import Cell from "./Cell";
import WinnerBanner from "./WinnerBanner";
import ScoreBoard from "./ScoreBoard";
import StartBanner from "./StartBanner";
import CopyButton from "./CopyButton";
import { useState, useEffect } from "react";
import { db } from "../config/firestore";
import {
	collection,
	addDoc,
	updateDoc,
	onSnapshot,
	doc,
} from "firebase/firestore";

function Tictactoe() {
	const STARTING_GAME_MATRIX = Array(9).fill(null);
	const STARTING_PLAYER_TURN = 1;
	// states
	const [playerTurn, setPlayerTurn] = useState(STARTING_PLAYER_TURN);
	const [gameMatrix, setGameMatrix] = useState(STARTING_GAME_MATRIX);
	const [winner, setWinner] = useState(null);
	const [showWinnerBanner, setShowWinnerBanner] = useState(false);
	const [score, setScore] = useState({ player1: 0, player2: 0 });
	const [showStartBanner, setShowStartBanner] = useState(true);
	const [gameInviteId, setGameInviteId] = useState(null);
	//firebase practice
	const [gameRef, setGameRef] = useState("");
	const [playerNumber, setPlayerNumber] = useState(null);

	useEffect(() => {
		if (gameInviteId) {
			const firestoreGameRef = doc(db, "ticTacToe", gameInviteId);
			getFirestoreGameData(firestoreGameRef);
			setGameRef(firestoreGameRef);
		}
	}, [gameInviteId]);

	const generateNewGame = async () => {
		const docRef = await addDoc(collection(db, "ticTacToe"), {
			gameMatrix: Array(9).fill(null),
			playerTurn: 1,
		});
		setGameRef(docRef);
		getFirestoreGameData(docRef);
		setShowStartBanner(false);
		setPlayerNumber(1);
	};

	const handleInvitedGame = (playerInvite) => {
		setGameInviteId(playerInvite);
		setShowStartBanner(false);
		setPlayerNumber(2);
	};

	const getFirestoreGameData = async (firestoreGameRef) => {
		const unsub = onSnapshot(firestoreGameRef, (doc) => {
			const firebaseGameObject = doc.data();
			setGameMatrix(firebaseGameObject.gameMatrix);
			setPlayerTurn(firebaseGameObject.playerTurn);
		});
	};

	const updateFirebaseGameMatrix = (
		updatedLocalGameMatrix,
		updatedPlayerTurn
	) => {
		updateDoc(gameRef, {
			gameMatrix: [...updatedLocalGameMatrix],
			playerTurn: updatedPlayerTurn,
		});
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
			handleScore(winner);
			setShowWinnerBanner(true);
		}
	}, [gameMatrix]);

	const handleTurn = (index) => {
		if (gameMatrix[index] === null && playerNumber === playerTurn) {
			const updatedGameMatrix = [...gameMatrix];
			updatedGameMatrix[index] = playerTurn;
			const updatedPlayerTurn = playerTurn === 1 ? 2 : 1;
			// firebase updates
			updateFirebaseGameMatrix(updatedGameMatrix, updatedPlayerTurn);
		}
	};

	const handleScore = (winningPlayer) => {
		const updatedScore = { ...score };
		updatedScore[`player${winningPlayer}`] += 1;
		setScore(updatedScore);
	};

	const checkWinner = (gameMatrix) => {
		for (let combination of winningCombinations) {
			const [a, b, c] = combination;
			if (
				gameMatrix[a] &&
				gameMatrix[a] === gameMatrix[b] &&
				gameMatrix[a] === gameMatrix[c]
			) {
				return gameMatrix[a]; // Return 'X' or 'O' as the winner
			}
		}

		return null; // Return null if there's no winner yet
	};

	const handleRestart = () => {
		updateFirebaseGameMatrix(STARTING_GAME_MATRIX, STARTING_PLAYER_TURN);
		setShowWinnerBanner(false);
		setWinner(null);
	};

	const zeroScore = () => {
		updateFirebaseGameMatrix(STARTING_GAME_MATRIX, STARTING_PLAYER_TURN);
		setScore({ player1: 0, player2: 0 });
	};

	return (
		<div className="tic-tac-toe-container">
			{showStartBanner && (
				<div className="overlay">
					<div className="banner-container">
						<StartBanner
							handleNewGame={generateNewGame}
							handleInvite={handleInvitedGame}
						/>
					</div>
				</div>
			)}
			<ScoreBoard
				player1={score.player1}
				player2={score.player2}
				winner={winner}
				gameMode={"tic-tac-toe"}
			/>
			<div className="top-banner-container">
				<div className="player-turn-banner">Player {playerTurn}'s Turn</div>
				<button className="game-button" onClick={() => zeroScore()}>
					Reset Scores
				</button>
			</div>
			<div className="gameboard">
				{gameMatrix.map((status, index) => (
					<Cell
						status={status}
						key={index}
						handleTurn={() => handleTurn(index)}
						gameMode={"tic-tac-toe"}
					/>
				))}
				{showWinnerBanner && (
					<div className="overlay">
						<div className="banner-container">
							<WinnerBanner winner={winner} handleRestart={handleRestart} />
						</div>
					</div>
				)}
			</div>
			<ul
				className="instructions
      ">
				<h4>Instructions</h4>
				<li>Copy https://kwongz.github.io/kwong-portfolio/#/tic-tac-toe</li>
				<li>Open in new Tab</li>
				<li>Copy and submit Game ID in Join Game of New Tab</li>
				<li>Enjoy!</li>
			</ul>
			<div className="invite-container">
				<CopyButton text={gameRef.id} />
				<span className="invite-code">{gameRef.id}</span>
			</div>
		</div>
	);
}

export default Tictactoe;
