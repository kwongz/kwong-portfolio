import React from "react";

function WinnerBanner({ winner, handleRestart }) {
  return (
    <div className="winnerBanner">
      Player {winner} Wins
      <button className="restart" onClick={() => handleRestart()}>
        Restart
      </button>
    </div>
  );
}

export default WinnerBanner;
