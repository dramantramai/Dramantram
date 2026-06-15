import React from "react";
import Layout from "../components/Layout/Layout";
import "../styles/PortfolioPage.css";
import PortfolioSection from "../components/PortfolioSection";
import ComesWith from "../components/ComesWith";
import GlitchButton from "../components/GlitchButton";
import PortfolioFilters from "../components/PortfolioFilters";
import BackgroundGlow from "../components/BackgroundGlow";

const PORTFOLIO_GLOWS = [
  // Hero area — upper centre-right
  { top: "-40vh", right: "10vw", size: "85vw", opacity: 0.85, blur: "80px" },
  // Portfolio grid mid — left glow
  { top: "100vh", left: "-15vw", size: "55vw", opacity: 0.6, blur: "80px" },
  // ComesWith bottom — right glow
  { top: "200vh", right: "10vw", size: "60vw", opacity: 0.65, blur: "80px" },
];

const PortfolioPage = () => {
  return (
    <Layout>
      <div style={{ position: "relative" }}>
        <BackgroundGlow glows={PORTFOLIO_GLOWS} />

        <section className="hero-portfolio">
          <div className="bg-grad" />
          <div className="container-fluid upper-container">
            {/* TOP GRID */}
            <div className="row g-0 hero-grid col-md-12 ">
              {/* Col 1 */}
              <div className="col-12 col-md-3 portfolio-panel portfolio-panel--left">
                <div className="portfolio-panel-inner">
                  <h2 className="logo-word russo-one-regular">PORTFOLIO</h2>
                </div>
              </div>

              {/* Col 2 */}
              <div className="col-12 col-md-3 portfolio-panel">
                <div className="portfolio-panel-inner">
                  <h3 className="hero-title">
                    A locally set up
                    <br />
                    global creative <br /> agency
                  </h3>
                </div>
              </div>

              {/* Col 3 */}
              <div className="col-12 col-md-3 portfolio-panel">
                <div className="portfolio-panel-inner">
                  <p className="body-copy">
                    Our secret is not our services but our approach towards them.
                  </p>
                  <p className="body-strong">
                    Oops! Did we just disclose our secret?
                  </p>
                </div>
              </div>

              {/* Col 4 (dark taper) */}
              <div className="col-12 col-md-3 portfolio-panel portfolio-panel--right">
                <div className="portfolio-panel-inner">
                  <GlitchButton
                    to="/contact"
                    className="glitch-button-portfolio btn-connect-portfolio"
                    targetText="Let's Connect"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="portfolio">
          {/* <PortfolioFilters /> */}
          <PortfolioSection showFilters={true} isHomePage={false} isPortfolioPage={true} />
        </section>

        <ComesWith />
      </div>
    </Layout>
  );
};

export default PortfolioPage;
