import React from "react";

function WinnerBanner({ winner, handleRestart, restartTracker, playerNumber }) {
  return (
    <div className="winnerBanner">
      <h3>Player {winner} Wins</h3>
      <button className="restart game-button" onClick={() => handleRestart()}>
        Restart
      </button>
      {restartTracker[playerNumber] === true ? (
        <p>waiting for other player</p>
      ) : (
        ""
      )}
    </div>
  );
}

export default WinnerBanner;
