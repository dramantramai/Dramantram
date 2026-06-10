import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/GlitchButton.css";

const GlitchButton = ({
  children,
  className,
  targetText = "Let's Connect",
  as,
  to,
  href,
  ...rest
}) => {
  const [displayText, setDisplayText] = useState(targetText);
  const [isScrambling, setIsScrambling] = useState(false);
  const isAnimating = useRef(false);
  const intervalRef = useRef(null);

  const chars = "$Z%#X@*!C^&X~Z";
  const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];

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
            return char;
          }
          return getRandomChar();
        })
        .join("");

      setDisplayText(newText);

      if (iteration >= targetText.length) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplayText(targetText);
        isAnimating.current = false;
        setIsScrambling(false);
      }

      iteration += 1;
    }, 50);
  }, [targetText]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setDisplayText(targetText);
  }, [targetText]);

  const handleMouseEnter = () => {
    scramble();
  };

  const handleMouseLeave = () => {
    scramble();
  };

  const sharedProps = {
    className: `glitch-button ${className ?? ""} ${isScrambling ? "is-scrambling" : ""}`,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    "data-text": targetText,
    ...rest,
  };

  if (as === "span") {
    return <span {...sharedProps}>{displayText}</span>;
  }

  if (to) {
    return (
      <Link to={to} {...sharedProps}>
        {displayText}
      </Link>
    );
  }

  return (
    <a href={href} {...sharedProps}>
      {displayText}
    </a>
  );
};

export default GlitchButton;
