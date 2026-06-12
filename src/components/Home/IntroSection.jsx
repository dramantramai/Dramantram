import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import GlitchButton from "../GlitchButton";

const HomePetalsSVG = dynamic(() => import("../HomePetalsSVG"), {
  ssr: false,
});

const IntroSection = () => {
  // Initialize state based on current window width immediately to prevent flash
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    // Use matchMedia for better performance than 'resize' event listener
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleChange = (e) => {
      setIsMobile(e.matches);
    };

    // Set initial value
    setIsMobile(mediaQuery.matches);

    // Add listener
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <section className="intro-section">
      {/* Background Container Layer */}
      <div className="spline-container">
        <Suspense fallback={<div className="loading-3d">Loading...</div>}>
          <HomePetalsSVG />
        </Suspense>

        {/* Optional: Add a dark overlay on mobile only so text remains readable over the 3D model */}
        {isMobile && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.4)", // Darkens the 3D model slightly
              pointerEvents: "none",
            }}
          ></div>
        )}
      </div>

      {/* Text Content Layer */}
      <div className="main-content">
        {/* Left side empty for 3D model visibility on desktop */}
        <div className="left-side"></div>

        <div className="right-side">
          <p className="headText">
            Your Creative, Media & <br /> Technology Transformation Partner
          </p>
          <h1 className="heading russo-one-regular">
            TRANSFORMING <br /> VISION TO VISUAL!
          </h1>
          <GlitchButton
            className="btn-connect"
            href="/contact"
            targetText="Let's Connect"
          >
            {"Let's Connect"}
          </GlitchButton>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
