import React from "react";

function Cell({ status, handleTurn }) {
	return (
		<div className="cell" onClick={handleTurn}>
			{status}
		</div>
	);
}

export default Cell;
