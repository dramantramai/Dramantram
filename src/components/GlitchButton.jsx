import React, { useState, useEffect, useCallback } from "react";
// Assuming Link is a wrapper for <a> or a router Link
const GlitchButton = ({
  children,
  className,
  targetText = "Let's Connect",
  ...rest
}) => {
  const [displayText, setDisplayText] = useState(targetText);
  const [isHovering, setIsHovering] = useState(false);

  // Characters to use for the scramble effect
  const chars = "$Z%#X@*!C^&X~Z";

  // Function to generate a random character
  const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];

  // Scramble effect logic
  const scramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
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
        clearInterval(interval);
        // Ensure text is correctly set after animation
        setDisplayText(targetText);
      }

      iteration += 1; // Controls the speed of reveal
    }, 50); // Controls the update frequency

    return () => clearInterval(interval); // Cleanup function
  }, [targetText]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    scramble();
  };

  const handleMouseLeave = () => {
    setIsHovering(true);
    // Reset to original text if not mid-scramble
    // setDisplayText(targetText);
    scramble();
  };

  // The 'data-text' is crucial for the CSS pseudo-element glitch
  return (
    <a
      className={`${className} ${isHovering ? "" : ""}`}
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
