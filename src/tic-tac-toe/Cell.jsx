import React from "react";

function Cell({
	status,
	onClick,
	// index,
	// gameMatrix,
	// setGameMatrix,
	// playerTurn,
	// setPlayerTurn,
	// checkWinner,
	// setWinner,
}) {
	// const [cellStatus, setCellStatus] = useState(status);

	// useEffect(() => {
	// 	const winner = checkWinner(gameMatrix);
	// 	if (winner) {
	// 		setWinner(winner);
	// 	}
	// }, [gameMatrix]);

	// const updateGameMatrix = () => {
	// 	let updatedGameMatrix = [...gameMatrix];
	// 	updatedGameMatrix[index] = playerTurn;
	// 	setGameMatrix(updatedGameMatrix);
	// };

	// const handleClick = () => {
	// 	setCellStatus(playerTurn);
	// 	updateGameMatrix();
	// 	setPlayerTurn(playerTurn === "X" ? "O" : "X");
	// };

	return (
		<div className="cell" onClick={onClick}>
			{status}
		</div>
	);
}

export default Cell;
