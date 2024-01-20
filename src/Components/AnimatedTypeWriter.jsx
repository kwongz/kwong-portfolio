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
        clearInterval(interval); // Stop the interval when all characters are displayed
      }
    }, delay);

    return () => clearInterval(interval); // Cleanup the interval when the component unmounts or dependencies change
  }, [currentIndex, text, printReady]);

  return <span>{currentText}</span>;
};

export default AnimatedTypeWriter;
