import React from "react";
import Cell from "./Cell";
import { useState } from "react";
import WinnerBanner from "./WinnerBanner";
import ScoreBoard from "./ScoreBoard";

function Connect4() {
  const rows = 6;
  const columns = 7;
  const STARTING_GAME_MATRIX = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => null)
  );

  const [playerTurn, setPlayerTurn] = useState(1);
  const [winner, setWinner] = useState(false);
  const [showWinnerBanner, setShowWinnerBanner] = useState(false);
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [gameMatrix, setGameMatrix] = useState(STARTING_GAME_MATRIX);

  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < gameMatrix.length; row++) {
      for (let column = 0; column < gameMatrix[row].length; column++) {
        board.push(
          <Cell
            key={`${row}-${column}`}
            status={gameMatrix[row][column]}
            handleTurn={() => handleTurn(column)}
            gameMode={"connect4"}
          />
        );
      }
    }
    return board;
  };

  const handleScore = (winningPlayer) => {
    const updatedScore = { ...score };
    updatedScore[`player${winningPlayer}`] += 1;
    setScore(updatedScore);
  };

  const handleTurn = (column) => {
    // loop through the rows in the selected column to check if they are empty, if it is empty fill it with the player, change players and exit loop
    for (let row = 5; row >= 0; row--) {
      if (gameMatrix[row][column] === null) {
        const updatedGameMatrix = [...gameMatrix];
        updatedGameMatrix[row][column] = playerTurn;
        setGameMatrix(updatedGameMatrix);
        setPlayerTurn(playerTurn === 1 ? 2 : 1);
        checkWinner(updatedGameMatrix, row, column); //row and column represent the position of the dropped coin
        return;
      }
    }
  };

  const handleRestart = () => {
    setGameMatrix(STARTING_GAME_MATRIX);
    setPlayerTurn(1);
    setShowWinnerBanner(false);
    setWinner(null);
  };

  const zeroScore = () => {
    setGameMatrix(STARTING_GAME_MATRIX);
    setPlayerTurn(1);
    setScore({ player1: 0, player2: 0 });
  };

  const checkWinner = (
    updatedGameMatrix,
    currentCoinRow,
    currentCoinColumn
  ) => {
    //create a move list to add to the currentCoinRow and currentCoinColumn to check directionally around the dropped coin position
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

    let consecutiveCellCount = 0;

    // create a recursive function that checks the surrounding cells around the cell that was just updated with a player's move. If there are 4 consecutive cells filled with the same player, return them as the winner
    const checkDirection = (
      currentCoinRow,
      currentCoinColumn,
      consecutiveCellCount,
      direction1,
      direction2,
      firstDirection
    ) => {
      //
      const newPos = {
        row: currentCoinRow + moveList[direction1].row,
        column: currentCoinColumn + moveList[direction1].column,
      };
      const newPos2 = {
        row: currentCoinRow + moveList[direction2].row,
        column: currentCoinColumn + moveList[direction2].column,
      };
      //Check logic
      //if 3 consecutive coins have been counted, return the winner
      if (consecutiveCellCount === 3) {
        setWinner(playerTurn);
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
          checkDirection(
            newPos.row,
            newPos.column,
            consecutiveCellCount,
            direction1,
            direction2,
            true
          );
          //handles if cell check is not the same as player
          //checks to see if we are still in first direction, then set count to 0
          //starts checking cells from the last cell that was checked and moves in the opposite direction while incrementing count
        } else if (firstDirection) {
          consecutiveCellCount = 0;
          checkDirection(
            currentCoinRow,
            currentCoinColumn,
            consecutiveCellCount,
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
        checkDirection(
          newPos2.row,
          newPos2.column,
          consecutiveCellCount,
          direction1,
          direction2,
          false
        );
      }
      //handles if last cell drop is in 0 index column, immediately checks right
      else if (newPos.column < 0) {
        consecutiveCellCount = 0;
        consecutiveCellCount++;
        checkDirection(
          newPos2.row,
          newPos2.column,
          consecutiveCellCount,
          direction1,
          direction2,
          false
        );
      }
    }; // end of check direction
    //
    checkDirection(
      currentCoinRow,
      currentCoinColumn,
      consecutiveCellCount,
      "down",
      "none",
      true
    );
    checkDirection(
      currentCoinRow,
      currentCoinColumn,
      consecutiveCellCount,
      "left",
      "right",
      true
    );
    checkDirection(
      currentCoinRow,
      currentCoinColumn,
      consecutiveCellCount,
      "upLeft",
      "downRight",
      true
    );
    checkDirection(
      currentCoinRow,
      currentCoinColumn,
      consecutiveCellCount,
      "upRight",
      "downLeft",
      true
    );
  }; // End of checkWinner

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
