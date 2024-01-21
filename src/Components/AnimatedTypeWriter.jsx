import React, { useState, useEffect } from "react";

const AnimatedTypeWriter = ({ text, printReady, setSecondPrinter, delay }) => {
	const [currentText, setCurrentText] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (currentIndex < text.length && printReady) {
				setCurrentText((prevText) => prevText + text[currentIndex]);
				setCurrentIndex((prevIndex) => prevIndex + 1);
			} else {
				setSecondPrinter();
				clearInterval(interval);
			}
		}, delay);

		return () => clearInterval(interval);
	}, [currentIndex, text, printReady]);

	return <span>{currentText}</span>;
};

export default AnimatedTypeWriter;
