import React, { useState, useEffect } from "react";

function Cell({ status, handleTurn }) {
	const [mark, setMark] = useState("");

	useEffect(() => {
		const newMark = status === "X" ? "x-mark" : status === "O" ? "o-mark" : "";
		setMark(newMark);
	}, [status]);

	return (
		<div className={`cell ${mark}`} onClick={handleTurn}>
			{status}
		</div>
	);
}

export default Cell;
