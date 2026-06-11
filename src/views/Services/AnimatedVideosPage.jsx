import React from "react";
import Layout from "../../components/Layout/Layout";
import "../../styles/ServicesPage.css";
// import BrandingProcess from "../../components/BrandingProcess";
import PortfolioSection from "../../components/PortfolioSection";
import ComesWith from "../../components/ComesWith";
import "../../styles/Process.css";
import GlitchButton from "../../components/GlitchButton";
import ProcessWrap from "../../components/ProcessWrap";
import ServicesLogosRow from "../../components/ServicesLogosRow";

const ANIMATED_VIDEO_SERVICES = [
  ["Explainer", "Ad Film", "Sales & Marketing Video"],
  ["Demo Video", "e-Learning Video", "Animated Graphic/GIF"],
];

const AnimatedVideosPage = () => {
  return (
    <Layout>
      <section className="brand-wrap container-fluid">
        {/* ── ABOVE FOLD: hero + brand row fill exactly one viewport ── */}
        <div className="service-above-fold">
          <section className="row gx-0 brand-grid align-items-center">
            {/* LEFT VISUAL */}
            <div className="col-lg-6 px-4 px-lg-5 brand-col d-flex flex-column align-items-start">
              <div className="mask-card w-100 mb-4">
                <iframe
                  width="100%"
                  src="https://www.youtube.com/embed/zNbkGMULAFw?si=KH20EzJOh69zY5KK?rel=0&autoplay=1&mute=1&loop=1"
                  title="Dramantram Showreel"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ aspectRatio: "16/9", borderRadius: "8px" }}
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              </div>
            </div>

            {/* RIGHT COPY */}
            <div className="col-lg-6 px-4 px-lg-5 brand-col mid-copy d-flex flex-column justify-content-center">
              <small className="pill mb-2">Animated Videos</small>
              <h2 className="hero mb-4">
                Bring out your business
                <br />
                superpower Through Animation
              </h2>
              <p className="lede mb-4">
                Nothing exists in animation, we manufacture everything! It is the
                easiest way to tell a story whatever a human mind can conceive.
              </p>
              <GlitchButton
                className="connect-link"
                href="/contact"
                targetText="Let's Connect"
              />
            </div>
          </section>

          <ServicesLogosRow serviceColumns={ANIMATED_VIDEO_SERVICES} />
        </div>

        {/* PROCESS */}
        <ProcessWrap>
            {/* Title column */}
            <div className="pcol title-col">
              <h2 className="stack">
                <span>ANIMATION</span>
                <span>PROCESS &</span>
                <span>DELIVERABLES</span>
              </h2>
            </div>

            {/* Research */}
            <div className="pcol step-col">
              <div className="step-head">
                <span className="step-bar" />
                <h3>Define</h3>
                <span className="arrow" aria-hidden />
              </div>
              <ul className="bullets">
                <li>Business Goal</li>
                <li>Video Platform and Formats</li>
                <li>Animation Form</li>
                <li>Brainstorming & Concept</li>
                <li>​Scripting & Script Approval</li>
              </ul>
            </div>

            {/* Positioning */}
            <div className="pcol step-col">
              <div className="step-head">
                <span className="step-bar" />
                <h3>Design</h3>
                <span className="arrow" aria-hidden />
              </div>
              <ul className="bullets">
                <li>Storyboarding</li>
                <li>Storyboard Changes & Approval</li>
                <li>Character & Elements Creation</li>
                <li>Voice Selection (Language, Gender, Accent)</li>
              </ul>
            </div>

            {/* Deliverables */}
            <div className="pcol step-col">
              <div className="step-head">
                <span className="step-bar" />
                <h3>Develop</h3>
              </div>
              <ul className="bullets">
                <li>Voice Over Recording</li>
                <li>Animation</li>
                <li>Sound Design</li>
                <li>Draft Video</li>
                <li>Draft Corrections & Approval</li>
                <li>Final Delivery & Project Closure</li>
                <li>Service Feedback</li>
              </ul>
            </div>
        </ProcessWrap>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio">
        <PortfolioSection />
      </section>

      {/* Dimaag Kharab Section */}
      {/* Comes With Section */}
      <ComesWith />
    </Layout>
  );
};

export default AnimatedVideosPage;
