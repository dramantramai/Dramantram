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
import BackgroundGlow from "../../components/BackgroundGlow";
import ServiceHeroMobile from "../../components/ServiceHeroMobile";

const SERVICE_GLOWS = [
  { top: "-50vh", left: "5vw", size: "85vw", opacity: 0.9, blur: "80px" },
  { top: "60vh", left: "-15vw", size: "55vw", opacity: 0.75, blur: "80px" },
  { top: "130vh", right: "-20vw", size: "80vw", opacity: 0.75, blur: "80px" },
  { top: "280vh", right: "25vw", size: "55vw", opacity: 0.75, blur: "80px" },
];

const SERVICE_GLOWS_MOBILE = [
  { top: "-10vh", left: "0vw", size: "90vw", opacity: 0.85, blur: "60px" },
  { top: "45vh", left: "-45vw", size: "120vw", opacity: 0.75, blur: "65px" },
  { top: "160vh", right: "-20vw", size: "85vw", opacity: 0.8, blur: "60px" },
  { top: "250vh", right: "0vw", size: "120vw", opacity: 0.75, blur: "65px" },
  { top: "320vh", right: "-40vw", size: "120vw", opacity: 0.75, blur: "65px" },
];

const EXPERIENTIAL_LAB_SERVICES = [
  [
    "Brand Identity & Design",
    "Creating Logo",
    "Branding Strategy",
    "Defining Brand Style Guide",
    "Social Media Branding",
  ],
  [
    "Re-Branding",
    "Stationery Design",
    "Catalogues & Brochure Design",
    "Packaging Design",
  ],
];

const ExperientialLabPage = () => {
  return (
    <Layout>
      <div style={{ position: "relative" }}>
        <BackgroundGlow glows={SERVICE_GLOWS} mobileGlows={SERVICE_GLOWS_MOBILE} />

        <section className="brand-wrap container-fluid">
          {/* ── ABOVE FOLD: hero + brand row fill exactly one viewport ── */}
          <div className="service-above-fold">
            {/* Desktop Layout */}
            <div className="d-none d-lg-block w-100">
              <section className="row gx-0 brand-grid align-items-center">
                {/* LEFT VISUAL */}
                <div className="col-lg-6 px-4 px-lg-5 brand-col d-flex flex-column align-items-start">
                  <div className="mask-card w-100 mb-4">
                    <iframe
                      width="100%"
                      src="https://www.youtube.com/embed/fYxOAHBih_o?rel=0&autoplay=1&mute=1&loop=1"
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
                  <small className="pill mb-2 fs-h4">Experiential Lab</small>
                  <h2 className="hero mb-4 russo-one-regular">
                    WITH GREAT DESIGN LANGUAGE
                    <br />
                    COMES GREAT BRAND RECALL
                  </h2>
                  <p className="lede mb-4">
                    Branding is the right choice of visuals along with the
                    differentiator… <strong>you, the X factor.</strong>
                  </p>
                  <GlitchButton
                    className="connect-link"
                    href="/contact"
                    targetText="Let's Connect"
                  />
                </div>
              </section>

              <ServicesLogosRow serviceColumns={EXPERIENTIAL_LAB_SERVICES} />
            </div>

            {/* Mobile Layout */}
            <div className="d-block d-lg-none w-100">
              <ServiceHeroMobile
                pill="Experiential Lab"
                heroTitle={
                  <>
                    WITH GREAT DESIGN LANGUAGE
                    <br />
                    COMES GREAT BRAND RECALL
                  </>
                }
                lede={
                  <>
                    Branding is the right choice of visuals along with the
                    differentiator… <strong>you, the X factor.</strong>
                  </>
                }
                videoUrl="https://www.youtube.com/embed/fYxOAHBih_o?rel=0&autoplay=1&mute=1&loop=1"
                serviceColumns={EXPERIENTIAL_LAB_SERVICES}
              />
              <ServicesLogosRow serviceColumns={EXPERIENTIAL_LAB_SERVICES} showLists={false} />
            </div>
          </div>

          {/* PROCESS */}
          <ProcessWrap>
            {/* Title column */}
            <div className="pcol title-col">
              <h2 className="stack">
                <span className="russo-one-regular fs-h2">OUR DESIGN</span>
                <span className="russo-one-regular fs-h2">PROCESS &</span>
                <span className="russo-one-regular fs-h2">DELIVERABLES</span>
              </h2>
            </div>

            {/* Research */}
            <div className="pcol step-col">
              <div className="step-head">
                <span className="step-bar" />
                <h3 className="raleway-regular">Research</h3>
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
                <h3 className="raleway-regular">Positioning</h3>
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
                <h3 className="raleway-regular">Deliverables</h3>
              </div>
              <ul className="bullets">
                <li>Quality Check</li>
                <li>Feedback & Iterations</li>
                <li>HD Files In All Formats</li>
              </ul>
            </div>
          </ProcessWrap>
        </section>

        {/* Portfolio Section */}
        <section className="portfolio">
          <PortfolioSection baseService="Experiential Lab" />
        </section>

        {/* Dimaag Kharab Section */}
        {/* Comes With Section */}
        <ComesWith />
      </div>
    </Layout>
  );
};

export default ExperientialLabPage;
