import React from "react";

function ScoreBoard({ xScore, oScore, winner }) {
	return (
		<div className="scoreboard-container">
			<div className={winner === "X" ? "animate-score" : ""}>X : {xScore}</div>
			<div className={winner === "O" ? "animate-score" : ""}>O : {oScore}</div>
		</div>
	);
}

export default ScoreBoard;
