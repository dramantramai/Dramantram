import React, { useState, useEffect, useCallback, useRef } from "react";
import "./GlitchButton.css";
// Assuming Link is a wrapper for <a> or a router Link
const GlitchButton = ({
  children,
  className,
  targetText = "Let's Connect",
  ...rest
}) => {
  const [displayText, setDisplayText] = useState(targetText);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const isAnimating = useRef(false);
  const intervalRef = useRef(null);

  // Characters to use for the scramble effect
  const chars = "$Z%#X@*!C^&X~Z";

  // Function to generate a random character
  const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];

  // Scramble effect logic
  const scramble = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsScrambling(true);

    let iteration = 0;
    intervalRef.current = setInterval(() => {
      const newText = targetText
        .split("")
        .map((char, index) => {
          if (index < iteration) {
            return char; // Character is finalized
          }
          return getRandomChar(); // Keep scrambling
        })
        .join("");

      setDisplayText(newText);

      if (iteration >= targetText.length) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        // Ensure text is correctly set after animation
        setDisplayText(targetText);
        isAnimating.current = false;
        setIsScrambling(false);
      }

      iteration += 1; // Controls the speed of reveal
    }, 50); // Controls the update frequency
  }, [targetText]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
    scramble();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    scramble();
  };

  // The 'data-text' is crucial for the CSS pseudo-element glitch
  return (
    <a
      className={`glitch-button ${className ?? ""} ${isScrambling ? "is-scrambling" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-text={targetText} // Required for CSS glitch
      {...rest}
    >
      {displayText}
    </a>
  );
};

export default GlitchButton;
