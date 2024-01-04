import React, { useEffect, useState } from "react";

function ScoreBoard({ player1, player2, winner, gameMode }) {
	const [playerIcons, setPlayerIcons] = useState({});

	useEffect(() => {
		console.log(gameMode);
		if (gameMode === "tic-tac-toe") {
			const newIcons = { player1Icon: "X", player2Icon: "O" };
			setPlayerIcons(newIcons);
		} else if (gameMode === "connect4") {
			const newIcons = { player1Icon: "Red", player2Icon: "Blue" };
			setPlayerIcons(newIcons);
		}
	}, [gameMode]);

	return (
		<div className="scoreboard-container">
			<div className={winner === 1 ? "animate-score" : ""}>
				Player 1 - {playerIcons.player1Icon} : {player1}
			</div>
			<div className={winner === 2 ? "animate-score" : ""}>
				Player 2 - {playerIcons.player2Icon} : {player2}
			</div>
		</div>
	);
}

export default ScoreBoard;
