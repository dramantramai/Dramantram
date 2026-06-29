import React from "react";
import GlitchButton from "./GlitchButton";

const ServiceHeroMobile = ({
  pill,
  heroTitle,
  lede,
  videoUrl,
  serviceColumns,
}) => {
  return (
    <div className="mobile-service-layout w-100">
      {/* Visual Card (Video) at the top */}
      <div className="mobile-visual-card">
        <div className="mask-card w-100 mb-4">
          <iframe
            width="100%"
            src={videoUrl}
            title="Dramantram Showreel"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ aspectRatio: "16/9", borderRadius: "8px" }}
          ></iframe>
        </div>
      </div>

      {/* Flat elements grid below the visual */}
      <div className="mobile-grid-content">
        {/* Row 1: Pill */}
        <div className="mobile-grid-pill">
          <small className="pill fs-h4">{pill}</small>
        </div>

        {/* Row 2: Hero Title & Right Copy (Lede + Glitch Button) */}
        <div className="mobile-grid-hero">
          <h2 className="hero russo-one-regular">{heroTitle}</h2>
        </div>
        <div className="mobile-grid-right-copy">
          <p className="lede">{lede}</p>
          <GlitchButton
            className="connect-link"
            href="/contact"
            targetText="Let's Connect"
          />
        </div>

        {/* Row 3: Service Lists (aligned horizontally) */}
        <div className="mobile-grid-list-left">
          {serviceColumns && serviceColumns[0] && (
            <ul className="service-list inter-light">
              {serviceColumns[0].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="mobile-grid-list-right">
          {serviceColumns && serviceColumns[1] && (
            <ul className="service-list inter-light">
              {serviceColumns[1].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceHeroMobile;
