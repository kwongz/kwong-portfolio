import React, { useState, useRef, useEffect } from 'react';

function AnimtatedTypeWriter() {
  const [charIndex, setCharIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0)
  const [displayedWord, setDisplayedWord] = useState('')
  const animationRef = useRef();

  const wordsDisplayed = ['Welcome']

  useEffect(() => {
    const animateTyping = () => {
      // Update the state or perform any animation logic here
      

      // Schedule the next frame
      animationRef.current = requestAnimationFrame(animateTyping);
    };

    // Start the animation loop
    animationRef.current = requestAnimationFrame(animateTyping);

    // Clean up the animation loop when the component unmounts
    return () => cancelAnimationFrame(animationRef.current);
  }, []); // Empty dependency array ensures useEffect runs once on mount

  return (
    <div>
      {displayedWord} 
    </div>
  );
}

export default AnimtatedTypeWriter;
