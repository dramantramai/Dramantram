// src/pages/Home.jsx

import React, { useState, useEffect, Suspense, lazy } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/Home.css";
import "../styles/Animations.css";
import PortfolioSection from "../components/PortfolioSection";
import ClientsSection from "../components/Clients";
import GlitchButton from "../components/GlitchButton";

// Lazy load the 3D component
const SplineContainer = lazy(() => import("../components/SplineContainer"));

// --- DATA STRUCTURE FOR INTERACTIVE SECTION ---
// We move the images, titles, and bullets here so they can be switched dynamically
const servicesData = [
  {
    id: 0,
    menuTitle: "Branding",
    image: "packaging.png", // Ensure this exists in public folder
    heading: (
      <>
        With great design language comes
        <br /> great Brand Recall.
      </>
    ),
    bullets: [
      "Brand Identity & Design",
      "Creating Logo",
      "Branding Strategy",
      "Defining Brand Style Guide",
      "Social Media Branding",
      "Packaging Design",
    ],
    link: "/services/branding",
  },
  {
    id: 1,
    menuTitle: "Animated Videos",
    image: "Animation-Hero-Image.avif", // Replace with your actual image
    heading: (
      <>
        Stories that move people
        <br /> frame by frame.
      </>
    ),
    bullets: [
      "2D Vector Animation",
      "Motion Graphics",
      "Explainer Videos",
      "Whiteboard Animation",
      "Character Design",
      "Logo Animation",
    ],
    link: "/services/animated-videos",
  },
  {
    id: 2,
    menuTitle: "Live Action",
    image: "Live-Action500px.avif", // Replace with your actual image
    heading: (
      <>
        Capturing reality with
        <br /> cinematic excellence.
      </>
    ),
    bullets: [
      "Corporate Films",
      "TV Commercials",
      "Product Shoots",
      "Interview Shoots",
      "Documentaries",
      "Event Coverage",
    ],
    link: "/services/live-action",
  },
  {
    id: 3,
    menuTitle: "UI/UX",
    image: "Ui_UX.avif", // Replace with your actual image
    heading: (
      <>
        Designing interfaces that
        <br /> feel purely intuitive.
      </>
    ),
    bullets: [
      "User Research",
      "Wireframing & Prototyping",
      "Mobile App Design",
      "Website Design",
      "Dashboard Interfaces",
      "User Testing",
    ],
    link: "/services/ui-ux",
  },
  {
    id: 4,
    menuTitle: "Event Interactions",
    image: "Event.avif", // Replace with your actual image
    heading: (
      <>
        immersive experiences
        <br /> that leave a mark.
      </>
    ),
    bullets: [
      "AR/VR Installations",
      "Interactive Projection",
      "Holographic Displays",
      "Event Tech Solutions",
      "Virtual Events",
      "Anamorphic Displays",
      "Projection Mapping",
    ],
    link: "/services/events",
  },
  {
    id: 5,
    menuTitle: "Others",
    image: "Others500px.avif", // Replace with your actual image
    heading: (
      <>
        Everything else to
        <br /> complete the puzzle.
      </>
    ),
    bullets: [
      "SEO & Marketing",
      "Copywriting",
      "Illustration",
      "Sound Design",
      "Consultation",
      "Game Development",
    ],
    link: "/services/others",
  },
];

const testimonials = [
  {
    name: "Remya Lakshmanan",
    role: "Sr. Assistant Vice President, Invest India",
    quote:
      "Great job guys! You exceed our expectations each time. Looking forward to many more projects with the Team Dramantram.",
    image: "/remya.png",
  },
  {
    name: "Praveen Dev",
    role: "Assistant Manager, Bharti Airtel",
    quote:
      "This team has done fantastic work from start to finish, putting in tremendous effort to deliver quality content in a short time. I would definitely recommend Dramantram for their quality and commitment.",
    image: "/praveen.png",
  },
  {
    name: "Deepanshu Pathak",
    role: "Project Coordinator",
    quote:
      "Dramantram was very patient with our requirements and had a great turnaround time. The ease with which they understood the context of the videos and brought them to life was commendable.",
    image: "/deepanshu.png",
  },
];

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Initialize state based on current window width immediately to prevent flash
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    // Use matchMedia for better performance than 'resize' event listener
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleChange = (e) => {
      setIsMobile(e.matches);
    };

    // Set initial value
    setIsMobile(mediaQuery.matches);

    // Add listener
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const currentService = servicesData[activeIndex];

  return (
    <Layout>
      <div className="home-page-wrapper">
        <div className="global-grid-overlay"></div>

        {/* Intro Section */}
        <section className="intro-section">
          {/* 3D Container Layer */}
          <div className="spline-container">
            {/* REMOVED THE !isMobile CHECK so it renders on all devices */}
            <Suspense fallback={<div className="loading-3d">Loading...</div>}>
              <SplineContainer />
            </Suspense>

            {/* Optional: Add a dark overlay on mobile only so text remains readable over the 3D model */}
            {isMobile && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.4)", // Darkens the 3D model slightly
                  pointerEvents: "none",
                }}
              ></div>
            )}
          </div>

          {/* Text Content Layer */}
          <div className="main-content">
            {/* Left side empty for 3D model visibility on desktop */}
            <div className="left-side"></div>

            <div className="right-side">
              <p className="headText">
                Your Creative, Media & <br /> Technology Transformation Partner
              </p>
              <h1 className="heading">
                TRANSFORMING <br /> VISION TO VISUAL!
              </h1>
              <GlitchButton
                className="btn-connect"
                href="/contact"
                targetText="Let's Connect"
              >
                Let's Connect
              </GlitchButton>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="portfolio px-2">
          <PortfolioSection showFilters={false} isHomePage={true} />
        </section>

        {/* Clients Section */}
        <section className="clients">
          <ClientsSection />
        </section>

        {/* Specialization Section */}
        <section className="specialization-sec">
          <section className="svc-band px-5">
            <div className="svc-inner">
              <h2 className="svc-title">SERVICES WE SPECIALIZE IN</h2>
              <div className="svc-right">
                <p className="svc-copy">
                  We are humbled by the trust shown to us by our client partners{" "}
                  <br />
                  which helped us achieve more than
                </p>
              </div>
              <div className="svc-metrics">
                <div className="metric">
                  <div className="num">1600+</div>
                  <div className="label">Projects</div>
                </div>

                <div className="metric">
                  <div className="num">100+</div>
                  <div className="label">Clients</div>
                </div>
              </div>
            </div>
          </section>

          <section className="cap-wrap">
            <div className="container-fluid px-0">
              <div className="row g-0">
                {/* LEFT: Image (Dynamic based on state) */}
                <div className="col-lg-6 col-12 cap-col cap-left">
                  <div className="">
                    {/* OPTIONAL: Add a 'fade-in' class via CSS keyframes for smooth transitions */}
                    <img
                      key={currentService.image} // Key prop forces React to re-render image when src changes (good for animation)
                      src={currentService.image}
                      alt={currentService.menuTitle}
                      className="cap-hero"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* MIDDLE: Menu (Hover triggers state update) */}
                <div className="col-lg-3 col-12 cap-col cap-mid">
                  <div className="content-wrapper">
                    <nav className="cap-menu" aria-label="Service categories">
                      {servicesData.map((item, index) => (
                        <button
                          key={item.id}
                          className={`cap-menu-item ${
                            index === activeIndex ? "is-active" : ""
                          }`}
                          type="button"
                          // INTERACTION HERE:
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => setActiveIndex(index)} // Fallback for mobile
                        >
                          <span>{item.menuTitle}</span>
                          {index === activeIndex && (
                            <i className="cap-underline" aria-hidden />
                          )}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* RIGHT: Content (Dynamic based on state) */}
                <div className="col-lg-3 col-12 cap-col cap-right">
                  <div className="content-wrapper">
                    <div className="cap-copy">
                      <h3>
                        <span className="cap-strong">
                          {currentService.heading}
                        </span>
                      </h3>

                      <ul className="cap-bullets">
                        {currentService.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>

                    <a href={currentService.link} className="cap-cta">
                      <span className="cap-cta-accent" />
                      <GlitchButton
                        href={currentService.link}
                        targetText="Explore More"
                        className="explore-btn"
                      >
                        <span>Explore More</span>
                      </GlitchButton>
                      <span className="cap-chev">›</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* Agency Intro */}
        <section className="ai-wrap">
          {/* ... Rest of your component (No changes needed below) ... */}
          <div className="container-fluid px-0">
            <div className="row g-0">
              <div className="col-lg-6 col-12 ai-col ai-left">
                <div className="content-wrapper">
                  <p className="ai-kicker fw-semibold">Dramantram is</p>
                  <ul className="ai-stack">
                    <li>BOLD</li>
                    <li>LOCALLY GLOBAL</li>
                    <li>ESSENTIALISM</li>
                    <li>STORYTELLING</li>
                    <li>UNDP ALIGNED</li>
                  </ul>
                </div>
              </div>

              {/* <div className="col-lg-3 d-none d-lg-block ai-col ai-spacer"></div> */}

              <div className="col-lg-3 col-12 ai-col ai-mid">
                <div className="content-wrapper">
                  <h2 className="ai-head">
                    A locally set up global creative agency
                  </h2>

                  <p className="ai-copy">
                    You know us as a creative agency that works towards
                    skyrocketing the client’s business.
                  </p>

                  <p className="ai-copy small">
                    Our secret is not our services but our approach towards
                    them.{" "}
                    <strong>Oops! Did we just disclose our secret?</strong>
                  </p>

                  <a className="ai-cta" href="/about">
                    <span className="ai-cta-accent" />
                    <GlitchButton
                      href="/about"
                      targetText="Explore More"
                      className={"explore-btn2"}
                    >
                      <span>Explore More</span>
                    </GlitchButton>
                    <span className="ai-chev">›</span>
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-12 ai-col ai-right">
                <div className="content-wrapper">
                  <div className="ai-metric">
                    <div className="num">70+</div>
                    <div className="lbl">Identity Design</div>
                  </div>

                  <div className="ai-metric">
                    <div className="num">200+</div>
                    <div className="lbl">UI/UX Design</div>
                  </div>

                  <div className="ai-metric">
                    <div className="num">
                      98K+ <span className="unit">sec</span>
                    </div>
                    <div className="lbl">of Animated Video Creation</div>
                  </div>

                  <div className="ai-metric">
                    <div className="num">
                      800+ <span className="unit">min</span>
                    </div>
                    <div className="lbl">of Live Video Production</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className={`testimonial-section`}>
          <div className="container-fluid">
            <div className="row g-0">
              <div className="col-lg-3 col-md-6 col-12 left-section">
                <div className="content-wrapper">
                  <h1 className="main-heading">
                    THE CENTRE
                    <br /> OF OUR
                    <br /> UNIVERSE
                  </h1>
                  <p className="subtitle">
                    More than who we are, what our client
                    <br />
                    partner says, defines us!
                  </p>
                  <p className="description">
                    See how businesses like yours found
                    <br />
                    solutions with Dramanrtam
                  </p>
                  <div className="quote-marks">
                    <img src="/Quote Symbol.png" alt="quotes" loading="lazy" />
                  </div>
                </div>
              </div>

              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="col-lg-3 col-md-6 col-12 testimonial-card"
                >
                  <div className="card-content">
                    <h2 className="card-name fw-semibold">
                      {testimonial.name}
                    </h2>
                    <p className="card-role">{testimonial.role}</p>
                    <div className="card-image-wrapper">
                      <div className="card-image">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <p className="card-quote">{testimonial.quote}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
