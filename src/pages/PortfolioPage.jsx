import React from "react";
import Layout from "../components/Layout/Layout";
import "../styles/PortfolioPage.css";
import PortfolioSection from "../components/PortfolioSection";
import { Link } from "react-router-dom";
import ComesWith from "../components/ComesWith";
import GlitchButton from "../components/GlitchButton";
import PortfolioFilters from "../components/PortfolioFilters";

const PortfolioPage = () => {
  return (
    <Layout>
      <section className="hero-portfolio px-5">
        <div className="bg-grad" />
        <div className="container-fluid upper-container">
          {/* TOP GRID */}
          <div className="row g-0 hero-grid col-md-12 ">
            {/* Col 1 */}
            <div className="col-12 col-md-3 portfolio-panel portfolio-panel--left">
              <div className="portfolio-panel-inner">
                <h1 className="logo-word">PORTFOLIO</h1>
              </div>
            </div>

            {/* Col 2 */}
            <div className="col-12 col-md-3 portfolio-panel">
              <div className="portfolio-panel-inner">
                <h2 className="hero-title">
                  A locally set up
                  <br />
                  global creative <br /> agency
                </h2>
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
                <Link className="" to="/contact">
                  <GlitchButton
                    className="glitch-button-portfolio btn-connect-portfolio"
                    targetText="Let's Connect"
                  >
                    Let's Connect
                  </GlitchButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio px-5">
        {/* <PortfolioFilters /> */}
        <PortfolioSection showFilters={true} isHomePage={false} />
      </section>

      <ComesWith />
    </Layout>
  );
};

export default PortfolioPage;
