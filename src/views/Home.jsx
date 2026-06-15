// src/views/Home.jsx

import React from "react";
import Layout from "../components/Layout/Layout";
import "../styles/Home.css";
import "../styles/Animations.css";
import PortfolioSection from "../components/PortfolioSection";
import ClientsSection from "../components/Home/Clients";
import IntroSection from "../components/Home/IntroSection";
import SpecializationSection from "../components/Home/SpecializationSection";
import AgencyIntroSection from "../components/Home/AgencyIntroSection";
import TestimonialsSection from "../components/Home/TestimonialsSection";
import BackgroundGlow from "../components/BackgroundGlow";

// Glow orb positions for the Home page.
// These are absolute offsets within the full-page wrapper so they
// remain consistent as the user scrolls.
const HOME_GLOWS = [
  // Hero — large warm orb visible over the Spline section
  { top: "70vh", left: "-30vw", size: "70vw", opacity: 0.8, blur: "80px" },
  { top: "240vh", left: "20vw", size: "50vw", opacity: 0.65, blur: "90px" },
  { top: "540vh", right: "-15vw", size: "45vw", opacity: 0.75, blur: "80px" },
  { top: "450vh", right: "-15vw", size: "45vw", opacity: 0.75, blur: "80px" },
];

const Home = () => {
  return (
    <Layout>
      <div className="home-page-wrapper">
        {/* Page-level gradient bowls — scrolls with content */}
        <BackgroundGlow glows={HOME_GLOWS} />
        <div className="global-grid-overlay"></div>

        {/* Intro Section */}
        <IntroSection />

        {/* Portfolio Section */}
        <section className="portfolio">
          <PortfolioSection showFilters={false} isHomePage={true} />
        </section>

        {/* Clients Section */}
        <section className="clients">
          <ClientsSection />
        </section>

        {/* Specialization Section */}
        <SpecializationSection />

        {/* Agency Intro Section */}
        <AgencyIntroSection />

        {/* Testimonials Section */}
        <TestimonialsSection />
      </div>
    </Layout>
  );
};

export default Home;
