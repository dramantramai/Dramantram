/**
 * BackgroundGlow.jsx
 *
 * A reusable page-level background glow (gradient bowl) component.
 * Place this as the FIRST child inside each page's root wrapper so the
 * glows sit behind all content and scroll naturally with the page.
 *
 * Usage:
 *   <div className="page-wrapper">
 *     <BackgroundGlow glows={HOME_GLOWS} mobileGlows={HOME_GLOWS_MOBILE} />
 *     ... page sections ...
 *   </div>
 *
 * Each glow config object:
 *   {
 *     top?    : CSS value, e.g. "0vh"
 *     left?   : CSS value, e.g. "-20vw"
 *     right?  : CSS value
 *     bottom? : CSS value
 *     size    : CSS value for width & height, e.g. "60vw"
 *     opacity?: number (0–1), default 1
 *     color?  : rgba string, default matches site red "#b80000"
 *     blur?   : CSS blur value, default "80px"
 *   }
 */

import React from "react";
import "../styles/BackgroundGlow.css";

const renderGlowOrbs = (glows = []) =>
  glows.map((glow, i) => {
    const {
      top,
      left,
      right,
      bottom,
      size = "50vw",
      opacity = 1,
      color = "#8E2324",
      blur = "80px",
    } = glow;

    const style = {
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: `blur(${blur})`,
      opacity,
      ...(top !== undefined && { top }),
      ...(left !== undefined && { left }),
      ...(right !== undefined && { right }),
      ...(bottom !== undefined && { bottom }),
    };

    return <div key={i} className="bg-glow-orb" style={style} />;
  });

const BackgroundGlow = ({ glows = [], mobileGlows = null }) => {
  const mobileList = mobileGlows ?? glows;

  return (
    <>
      <div className="bg-glow-layer bg-glow-layer--desktop" aria-hidden="true">
        {renderGlowOrbs(glows)}
      </div>
      <div className="bg-glow-layer bg-glow-layer--mobile" aria-hidden="true">
        {renderGlowOrbs(mobileList)}
      </div>
    </>
  );
};

export default BackgroundGlow;
