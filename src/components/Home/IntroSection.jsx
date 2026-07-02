import React from "react";
import GlitchButton from "../GlitchButton";

const IntroSection = () => {
  return (
    <section className="intro-section">
      {/* Background Video Layer */}
      <div className="spline-container">
        <video
          className="hero-background-video"
          src="/header_bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Text Content Layer */}
      <div className="main-content">
        <div className="left-side">
          {/* Left side empty space to keep grid/flex spacing */}
        </div>

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
