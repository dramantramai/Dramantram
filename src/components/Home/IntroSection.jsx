import React, { useEffect, useRef, useState } from "react";
import GlitchButton from "../GlitchButton";

const IntroSection = () => {
  const videoRef = useRef(null);
  const [src, setSrc] = useState("");

  // The hero video is ~9MB. Downloading it with the page starves everything else on a
  // slow link (page navigation, images), so hold it back until the rest has loaded and
  // abort it if the visitor navigates away while it's still downloading.
  useEffect(() => {
    const start = () => setSrc("/header_bg.mp4");
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      const video = videoRef.current;
      if (video) {
        video.removeAttribute("src");
        video.load(); // cancels an in-flight download
      }
    };
  }, []);

  return (
    <section className="intro-section">
      {/* Background Video Layer */}
      <div className="spline-container">
        <video
          ref={videoRef}
          className="hero-background-video"
          src={src || undefined}
          poster="/header_poster.jpg"
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
