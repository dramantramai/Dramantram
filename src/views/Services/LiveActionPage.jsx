import React from "react";
import Layout from "../../components/Layout/Layout";
import "../../styles/ServicesPage.css";
// import Process from "../../components/BrandingProcess";
import PortfolioSection from "../../components/PortfolioSection";
import ComesWith from "../../components/ComesWith";
import "../../styles/Process.css";
import GlitchButton from "../../components/GlitchButton";
import ProcessWrap from "../../components/ProcessWrap";
import ServicesLogosRow from "../../components/ServicesLogosRow";

const LIVE_ACTION_SERVICES = [
  ["Ad Film", "Corporate Videos", "Testimonials"],
  ["Event Video", "Demo Video"],
];

const LiveActionPage = () => {
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
                  src="https://www.youtube.com/embed/2ZiQfzsNa2Y?si=-81bvVdwBetbOPx2?rel=0&autoplay=1&mute=1&loop=1"
                  title="Dramantram Showreel"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ aspectRatio: "16/9", borderRadius: "8px" }}
                ></iframe>
              </div>
            </div>

            {/* RIGHT COPY */}
            <div className="col-lg-6 px-4 px-lg-5 brand-col mid-copy d-flex flex-column justify-content-center">
              <small className="pill mb-2">Live Action</small>
              <h2 className="hero mb-4 russo-one-regular">
                Live Action is all about
                <br />
                Real people, their <br />
                emotion and camera motion. <br />
                Say Cheese!{" "}
              </h2>
              <p className="lede mb-4">
                When we talk of an something that exists and works, nothing is
                more convincing than a <strong>live action video</strong>.
              </p>
              <GlitchButton
                className="connect-link"
                href="/contact"
                targetText="Let's Connect"
              />
            </div>
          </section>

          <ServicesLogosRow serviceColumns={LIVE_ACTION_SERVICES} />
        </div>

        {/* PROCESS */}
        <ProcessWrap>
            {/* Title column */}
            <div className="pcol title-col">
              <h2 className="stack">
                <span>LIVE ACTION</span>
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
                <li>Campaign Behavior Analysis</li>
                <li>Brainstorming & Concept</li>
                <li>Scripting & Script Approval</li>
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
                <li>Storyboard/Screenplay</li>
                <li>Screenplay Changes & Approval</li>
                <li>Production Team Alignment</li>
                <li>Location Recce & Approval</li>
                <li>Actor Audition/Selection​</li>
              </ul>
            </div>

            {/* Deliverables */}
            <div className="pcol step-col">
              <div className="step-head">
                <span className="step-bar" />
                <h3>Develop</h3>
              </div>
              <ul className="bullets">
                <li>Film Shoot</li>
                <li>Editing & VFX</li>
                <li>Voice Recording & Sound Design</li>
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

export default LiveActionPage;
