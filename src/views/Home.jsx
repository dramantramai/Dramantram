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

const Home = () => {
  return (
    <Layout>
      <div className="home-page-wrapper">
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
