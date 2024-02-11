import React from "react";

function WinnerBanner({ winner, handleRestart }) {
  return (
    <div className="winnerBanner">
      <h3>Player {winner} Wins</h3>
      <button className="restart game-button" onClick={() => handleRestart()}>
        Restart
      </button>
    </div>
  );
}

export default WinnerBanner;
