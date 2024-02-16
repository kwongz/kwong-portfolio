import React from "react";
import Cell from "./Cell";
import { useState, useEffect } from "react";
import WinnerBanner from "./WinnerBanner";
import StartBanner from "./StartBanner";
import ScoreBoard from "./ScoreBoard";
import CopyButton from "./CopyButton";
import { db } from "../config/firestore";
import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";

function Connect4() {
  const rows = 6;
  const columns = 7;
  const STARTING_GAME_MATRIX = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => null)
  );
  const STARTING_PLAYER_TURN = 1;
  const INVITED_PLAYER_TURN = 2;

  const [playerTurn, setPlayerTurn] = useState(STARTING_PLAYER_TURN);
  const [winner, setWinner] = useState(false);
  const [showWinnerBanner, setShowWinnerBanner] = useState(false);
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [gameMatrix, setGameMatrix] = useState(STARTING_GAME_MATRIX);
  //firebase state
  const [showStartBanner, setShowStartBanner] = useState(true);
  const [restartTracker, setRestartTracker] = useState({});
  const [gameRef, setGameRef] = useState("");
  const [playerNumber, setPlayerNumber] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [droppedCoinPos, setDroppedCoinPos] = useState({});

  //firebase functions additions
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
    const firestoreGameRef = doc(db, "connect4", playerInvite);
    if (firestoreGameRef === undefined) {
      alert("game not found");
    } else {
      handlePlayerIdUpdate(firestoreGameRef, INVITED_PLAYER_TURN);
    }
  };

  const generateNewGame = async () => {
    const firestoreGameRef = await addDoc(collection(db, "connect4"), {
      gameMatrix: STARTING_GAME_MATRIX.flat(),
      playerTurn: STARTING_PLAYER_TURN,
      restart: { 1: false, 2: false },
      score: { player1: 0, player2: 0 },
      droppedCoinPos: { row: null, column: null },
    });
    handlePlayerIdUpdate(firestoreGameRef, STARTING_PLAYER_TURN);
  };

  const getFirestoreGameData = async (firestoreGameRef) => {
    const unsub = onSnapshot(firestoreGameRef, (doc) => {
      const firebaseGameObject = doc.data();
      //firebase does not allow for nested array, we flatten them, and then when we pull the data we restructure back to nested
      const subArraySize = columns;
      const reNestedArray = [];
      for (
        let i = 0;
        i < firebaseGameObject.gameMatrix.length;
        i += subArraySize
      ) {
        reNestedArray.push(
          firebaseGameObject.gameMatrix.slice(i, i + subArraySize)
        );
      }
      setGameMatrix(reNestedArray);
      setPlayerTurn(firebaseGameObject.playerTurn);
      setRestartTracker(firebaseGameObject.restart);
      setScore(firebaseGameObject.score);
      setDroppedCoinPos(firebaseGameObject.droppedCoinPos);
    });
    return unsub;
  };

  const updateFirebaseGameMatrix = (
    updatedLocalGameMatrix,
    updatedPlayerTurn,
    updatedCoinPos
  ) => {
    updateDoc(gameRef, {
      gameMatrix: [...updatedLocalGameMatrix.flat()],
      playerTurn: updatedPlayerTurn,
      droppedCoinPos: updatedCoinPos,
    });
  };

  //end of firebase additions
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
    updateDoc(gameRef, {
      score: { ...updatedScore },
    });
  };

  const handleTurn = (column) => {
    // loop through the rows in the selected column to check if they are empty, if it is empty fill it with the player, change players and exit loop
    console.log(playerNumber === playerTurn);
    if (playerNumber === playerTurn) {
      console.log("hello");
      for (let row = 5; row >= 0; row--) {
        if (gameMatrix[row][column] === null) {
          const updatedGameMatrix = [...gameMatrix];
          updatedGameMatrix[row][column] = playerTurn;
          const updatedPlayerTurn = playerTurn === 1 ? 2 : 1;
          // firebase updates
          const updatedCoinPos = { row: row, column: column };
          updateFirebaseGameMatrix(
            updatedGameMatrix,
            updatedPlayerTurn,
            updatedCoinPos
          );
          // checkWinner(updatedGameMatrix, row, column);
          return;
        }
      }
    } else alert(`Please wait for other player`);
  };

  const handleRestart = () => {
    updateDoc(gameRef, {
      restart: { ...restartTracker, [playerNumber]: true },
    });
  };

  useEffect(() => {
    if (restartTracker) {
      if (restartTracker[1] && restartTracker[2]) {
        setShowWinnerBanner(false);
        setWinner(null);
        updateFirebaseGameMatrix(
          STARTING_GAME_MATRIX,
          STARTING_PLAYER_TURN,
          {}
        );
        updateDoc(gameRef, {
          restart: { 1: false, 2: false },
        });
      }
    }
  }, [restartTracker]);

  const zeroScore = () => {
    updateFirebaseGameMatrix(STARTING_GAME_MATRIX, STARTING_PLAYER_TURN);
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
    const prevPlayer = playerTurn === 1 ? 2 : 1;

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
        console.log("winner");
        setWinner(prevPlayer);
        handleScore(prevPlayer);
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
        if (updatedGameMatrix[newPos.row][newPos.column] === prevPlayer) {
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

  useEffect(() => {
    checkWinner(gameMatrix, droppedCoinPos.row, droppedCoinPos.column);
  }, [playerTurn]);

  return (
    <div className="connect4-container">
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
        gameMode={"connect4"}
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
      <div className="gameboard">{renderBoard()}</div>
      {showWinnerBanner && (
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

export default Connect4;
