import React from "react";
import "../styles/Process.css";
const BrandingProcess = () => {
  return (
    <section className="process-wrap">
      <div className="process-grid container-fluid">
        {/* Title column */}
        <div className="pcol title-col">
          <h2 className="stack">
            <span>OUR DESIGN</span>
            <span>PROCESS &</span>
            <span>DELIVERABLES</span>
          </h2>
        </div>

        {/* Research */}
        <div className="pcol step-col">
          <div className="step-head">
            <span className="step-bar" />
            <h3>Research</h3>
            <span className="arrow" aria-hidden />
          </div>
          <ul className="bullets">
            <li>Background Research</li>
            <li>Vision, Mission & Goals</li>
            <li>Market Landscape</li>
            <li>Target Audience</li>
          </ul>
        </div>

        {/* Positioning */}
        <div className="pcol step-col">
          <div className="step-head">
            <span className="step-bar" />
            <h3>Positioning</h3>
            <span className="arrow" aria-hidden />
          </div>
          <ul className="bullets">
            <li>Brand Archetype</li>
            <li>Brand Promise & Personality</li>
            <li>USPs & Value Proposition</li>
            <li>Brand Voice & Messaging</li>
          </ul>
        </div>

        {/* Deliverables */}
        <div className="pcol step-col">
          <div className="step-head">
            <span className="step-bar" />
            <h3>Deliverables</h3>
          </div>
          <ul className="bullets">
            <li>Quality Check</li>
            <li>Feedback & Iterations</li>
            <li>HD Files In All Formats</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BrandingProcess;
