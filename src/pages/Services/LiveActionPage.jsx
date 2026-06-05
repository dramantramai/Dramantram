import React from "react";
import Layout from "../../components/Layout/Layout";
import "../../styles/ServicesPage.css";
// import Process from "../../components/BrandingProcess";
import PortfolioSection from "../../components/PortfolioSection";
import ComesWith from "../../components/ComesWith";
import "../../styles/Process.css";

const LiveActionPage = () => {
  const clients = [
    { alt: "Deloitte", src: "/logos/clients/deloitte.png" },
    { alt: "EY", src: "/logos/clients/Ey.png" },
    { alt: "PwC", src: "/logos/clients/PWC.png" },
    { alt: "United Nations", src: "/logos/clients/United Nations.png" },
    { alt: "Amazon", src: "/logos/clients/Amazon Logo.png" },
    { alt: "Walmart", src: "/logos/clients/Walmart.png" },
    { alt: "NPCI", src: "/logos/clients/npci.png" },
    { alt: "Razorpay", src: "/logos/clients/razorpay.png" },
    { alt: "boAt", src: "/logos/clients/boat.png" },
    { alt: "HCL", src: "/logos/clients/hcl.png" },
  ];

  return (
    <Layout>
      <section className="brand-wrap container-fluid service-intro pt-5">
        {/* TOP SECTION */}
        <section className="row gx-0 brand-grid align-items-center mb-5 pt-5">
          {/* LEFT VISUAL */}
          <div className="col-lg-6 px-4 px-lg-5 brand-col d-flex flex-column align-items-start">
            <div className="mask-card w-100 mb-4">
              {/* <img src="/dramantram.png" alt="Dramantram" /> */}
              <iframe
                width="100%"
                // ADDED: &autoplay=1&mute=1
                src="https://www.youtube.com/embed/2ZiQfzsNa2Y?si=-81bvVdwBetbOPx2?rel=0&autoplay=1&mute=1&loop=1"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                title="Dramantram Showreel"
                frameBorder="0"
                // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ aspectRatio: "16/9", borderRadius: "8px" }}
              ></iframe>
            </div>
          </div>

          {/* RIGHT COPY */}
          <div className="col-lg-6 px-4 px-lg-5 brand-col mid-copy d-flex flex-column justify-content-center">
            <small className="pill mb-2">Live Action</small>
            <h2 className="hero mb-4">
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
            <a className="connect-link" href="/contact">
              Let’s Connect <i>›</i>
            </a>
          </div>
        </section>

        {/* SERVICES + LOGOS ROW */}
        <section className="row gx-0 align-items-start lower-section">
          {/* LEFT SERVICE LISTS */}
          <div className="col-lg-6 px-4 px-lg-5">
            <div className="row row-cols-1 row-cols-md-2 g-4 service-lists">
              <div className="col">
                <ul className="service-list">
                  <li>Ad Film</li>
                  <li>Corporate Videos</li>
                  <li>Testimonials</li>
                </ul>
              </div>
              <div className="col">
                <ul className="service-list">
                  <li>Event Video</li>
                  <li>Demo Video</li>
                </ul>
                <a href="/contact">
                  <button className=" btn-cta connect-btn">
                    Let’s Connect <span>›</span>
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT LOGOS */}
          <div className="col-lg-6 px-4 px-lg-5">
            <p className="logos-title mb-4">
              Proud to work with the biggest brands in India &amp; Abroad
            </p>
            <div className="logos-grid">
              {clients.map((client) => (
                <div key={client.alt} className="logo-item">
                  <img src={client.src} alt={client.alt} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="process-wrap">
          <div className="process-grid container-fluid">
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
          </div>
        </section>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio px-5">
        <PortfolioSection />
      </section>

      {/* Dimaag Kharab Section */}
      {/* Comes With Section */}
      <ComesWith />
    </Layout>
  );
};

export default LiveActionPage;
