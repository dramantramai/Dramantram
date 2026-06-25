import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import GlitchButton from "../GlitchButton";

const HomePetalsSVG = dynamic(() => import("../HomePetalsSVG"), {
  ssr: false,
});

const IntroSection = () => {
  return (
    <section className="intro-section">
      {/* Text Content Layer */}
      <div className="main-content">
        <div className="left-side">
          <div className="spline-container">
            <Suspense fallback={<div className="loading-3d">Loading...</div>}>
              <HomePetalsSVG />
            </Suspense>
          </div>
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
