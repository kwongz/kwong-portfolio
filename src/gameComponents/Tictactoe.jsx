import React from "react";
import Cell from "./Cell";
import WinnerBanner from "./WinnerBanner";
import ScoreBoard from "./ScoreBoard";
import { useState, useEffect } from "react";

function Tictactoe() {
  const STARTING_GAME_MATRIX = Array(9).fill(null);
  // states
  const [playerTurn, setPlayerTurn] = useState(1);
  const [gameMatrix, setGameMatrix] = useState(STARTING_GAME_MATRIX);
  const [winner, setWinner] = useState(null);
  const [showWinnerBanner, setShowWinnerBanner] = useState(false);
  const [score, setScore] = useState({ player1: 0, player2: 0 });

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
    if (gameMatrix[index] === null) {
      const updatedGameMatrix = [...gameMatrix];
      updatedGameMatrix[index] = playerTurn;
      setGameMatrix(updatedGameMatrix);
      setPlayerTurn(playerTurn === 1 ? 2 : 1);
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
    setGameMatrix(STARTING_GAME_MATRIX);
    setPlayerTurn(1);
    setShowWinnerBanner(false);
    setWinner(null);
  };

  const zeroScore = () => {
    setScore({ player1: 0, player2: 0 });
    setPlayerTurn(1);
    setGameMatrix(STARTING_GAME_MATRIX);
  };

  return (
    <div className="tic-tac-toe-container">
      <ScoreBoard
        player1={score.player1}
        player2={score.player2}
        winner={winner}
        gameMode={"tic-tac-toe"}
      />
      <div className="player-turn-banner">Player {playerTurn}'s Turn</div>
      <button className="Zero-score-button" onClick={() => zeroScore()}>
        Reset Scores
      </button>
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
            <div className="winner-banner-container">
              <WinnerBanner winner={winner} handleRestart={handleRestart} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tictactoe;
