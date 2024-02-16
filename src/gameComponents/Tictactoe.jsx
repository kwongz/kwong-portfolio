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
  getDoc,
} from "firebase/firestore";

function Tictactoe() {
  const STARTING_GAME_MATRIX = Array(9).fill(null);
  const STARTING_PLAYER_TURN = 1;
  const INVITED_PLAYER_TURN = 2;
  // states
  const [playerTurn, setPlayerTurn] = useState(STARTING_PLAYER_TURN);
  const [playerNumber, setPlayerNumber] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [gameMatrix, setGameMatrix] = useState(STARTING_GAME_MATRIX);
  const [gameRef, setGameRef] = useState("");
  const [winner, setWinner] = useState(null);
  const [showWinnerBanner, setShowWinnerBanner] = useState(false);
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [showStartBanner, setShowStartBanner] = useState(true);
  const [restartTracker, setRestartTracker] = useState({});

  const generatePlayerId = () => {
    const timestamp = new Date().getTime();
    const randomPart = Math.random().toString(36).substr(2, 9); // Random alphanumeric string
    const playerId = `${timestamp}-${randomPart}`;
    return playerId;
  };

  const handlePlayerIdUpdate = async (gameRef, playerNumber) => {
    const player = `player${playerNumber}Id`;
    const newId = generatePlayerId();
    setPlayerId(newId);
    setPlayerNumber(playerNumber);
    const firebaseCurrentGameDoc = await getDoc(gameRef);

    if (firebaseCurrentGameDoc.data()) {
      const data = firebaseCurrentGameDoc.data();
      if (
        (playerNumber === STARTING_PLAYER_TURN && !data.player1Id) ||
        (playerNumber === INVITED_PLAYER_TURN && !data.player2Id)
      ) {
        updateDoc(gameRef, {
          [player]: newId,
        });
        getFirestoreGameData(gameRef);
        setGameRef(gameRef);
        setShowStartBanner(false);
      } else alert("Game is Full, Please create new game");
    } else alert("Game Not Found");
  };

  const handleInvite = (e, playerInvite) => {
    e.preventDefault();
    if (playerInvite === "") {
      return;
    }
    const firestoreGameRef = doc(db, "ticTacToe", playerInvite);
    console.log(firestoreGameRef);
    if (firestoreGameRef === undefined) {
      alert("game not found");
    } else {
      handlePlayerIdUpdate(firestoreGameRef, INVITED_PLAYER_TURN);
    }
  };

  const generateNewGame = async () => {
    const firestoreGameRef = await addDoc(collection(db, "ticTacToe"), {
      gameMatrix: Array(9).fill(null),
      playerTurn: STARTING_PLAYER_TURN,
      restart: { 1: false, 2: false },
      score: { player1: 0, player2: 0 },
      winner: null,
    });
    handlePlayerIdUpdate(firestoreGameRef, STARTING_PLAYER_TURN);
  };

  const getFirestoreGameData = async (firestoreGameRef) => {
    const unsub = onSnapshot(firestoreGameRef, (doc) => {
      const firebaseGameObject = doc.data();
      setGameMatrix(firebaseGameObject.gameMatrix);
      setPlayerTurn(firebaseGameObject.playerTurn);
      setRestartTracker(firebaseGameObject.restart);
      setScore(firebaseGameObject.score);
      setWinner(firebaseGameObject.winner);
    });
    return unsub;
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

  const handleTurn = (index) => {
    if (gameMatrix[index] === null && playerNumber === playerTurn) {
      const updatedGameMatrix = [...gameMatrix];
      updatedGameMatrix[index] = playerTurn;
      const updatedPlayerTurn = playerTurn === 1 ? 2 : 1;
      // firebase updates
      updateFirebaseGameMatrix(updatedGameMatrix, updatedPlayerTurn);
      checkWinner(updatedGameMatrix);
    }
  };

  const handleScore = (winningPlayer) => {
    const updatedScore = { ...score };
    updatedScore[`player${winningPlayer}`] += 1;
    updateDoc(gameRef, {
      score: { ...updatedScore },
    });
  };

  const checkWinner = (gameMatrix) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        gameMatrix[a] &&
        gameMatrix[a] === gameMatrix[b] &&
        gameMatrix[a] === gameMatrix[c]
      ) {
        handleScore(gameMatrix[a]);
        setWinner(winner);
        updateDoc(gameRef, {
          winner: gameMatrix[a],
        });
        return gameMatrix[a]; // Return '1' or '2' as the winner
      }
    }

    return null; // Return null if there's no winner yet
  };

  const handleRestart = () => {
    updateDoc(gameRef, {
      restart: { ...restartTracker, [playerNumber]: true },
    });
  };

  useEffect(() => {
    if (restartTracker[1] && restartTracker[2]) {
      setShowWinnerBanner(false);
      updateFirebaseGameMatrix(STARTING_GAME_MATRIX, STARTING_PLAYER_TURN);
      updateDoc(gameRef, {
        restart: { 1: false, 2: false },
        winner: null,
      });
    }
  }, [restartTracker]);

  const zeroScore = () => {
    updateFirebaseGameMatrix(STARTING_GAME_MATRIX, STARTING_PLAYER_TURN);
    updateDoc(gameRef, {
      score: { player1: 0, player2: 0 },
    });
  };

  return (
    <div className="tic-tac-toe-container">
      {showStartBanner && (
        <div className="overlay">
          <div className="banner-container">
            <StartBanner
              handleNewGame={generateNewGame}
              handleInvite={handleInvite}
            />
          </div>
        </div>
      )}
      <div className="player-id-container">
        <h3>
          Player{playerNumber} ID : {playerId}
        </h3>
      </div>
      <ScoreBoard
        player1={score.player1}
        player2={score.player2}
        winner={winner}
        gameMode={"tic-tac-toe"}
      />
      <div className="top-banner-container">
        <div className="player-turn-banner">
          <span>Player {playerTurn}'s Turn</span>
        </div>
        <button className="game-button" onClick={() => zeroScore()}>
          Reset Scores
        </button>
      </div>
      <div className="player-indication-container">
        <h3>{playerNumber ? `you are player ${playerNumber}` : ""}</h3>
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
        {winner && (
          <div className="overlay">
            <div className="banner-container">
              <WinnerBanner
                winner={winner}
                handleRestart={handleRestart}
                restartTracker={restartTracker}
                playerNumber={playerNumber}
              />
            </div>
          </div>
        )}
      </div>
      <ul
        className="instructions
      "
      >
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
