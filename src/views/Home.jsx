// src/pages/Home.jsx

import React, { useState, useEffect, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout/Layout";
import "../styles/Home.css";
import "../styles/Animations.css";
import PortfolioSection from "../components/PortfolioSection";
import ClientsSection from "../components/Clients";
import GlitchButton from "../components/GlitchButton";

const HomePetalsSVG = dynamic(() => import("../components/HomePetalsSVG"), {
  ssr: false,
});

// --- DATA STRUCTURE FOR INTERACTIVE SECTION ---
// We move the images, titles, and bullets here so they can be switched dynamically
const servicesData = [
  {
    id: 0,
    menuTitle: "Branding",
    image: "packaging.png", // Ensure this exists in public folder
    heading: (
      <>
        <span className="d-inline-block text-nowrap">
          With great design language comes
        </span>
        <br />
        <span className="d-inline-block text-nowrap">great Brand Recall.</span>
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
        <span className="d-inline-block text-nowrap">
          Stories that move people
        </span>
        <br />
        <span className="d-inline-block text-nowrap">frame by frame.</span>
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
        <span className="d-inline-block text-nowrap">
          Capturing reality with
        </span>
        <br />
        <span className="d-inline-block text-nowrap">
          cinematic excellence.
        </span>
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
        <span className="d-inline-block text-nowrap">
          Designing interfaces that
        </span>
        <br />
        <span className="d-inline-block text-nowrap">
          feel purely intuitive.
        </span>
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
    menuTitle: "Experiential Lab",
    image: "Event.avif", // Replace with your actual image
    heading: (
      <>
        <span className="d-inline-block text-nowrap">
          Immersive experiences
        </span>
        <br />
        <span className="d-inline-block text-nowrap">that leave a mark.</span>
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
    link: "/services/experiential-lab",
  },
  {
    id: 5,
    menuTitle: "Others",
    image: "Others500px.avif", // Replace with your actual image
    heading: (
      <>
        <span className="d-inline-block text-nowrap">Everything else to</span>
        <br />
        <span className="d-inline-block text-nowrap">complete the puzzle.</span>
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
    typeof window !== "undefined" ? window.innerWidth <= 768 : false,
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

  const aiSectionRef = useRef(null);

  useEffect(() => {
    const section = aiSectionRef.current;
    if (!section) return;

    let rafId = 0;

    const isHalfInView = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const visibleTop = Math.max(rect.top, 0);
      const visibleBottom = Math.min(rect.bottom, vh);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      return visibleHeight >= rect.height * 0.5;
    };

    const tryAnimate = () => {
      if (section.classList.contains("ai-animate")) return;
      if (!isHalfInView()) return;

      section.classList.add("ai-animate");
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tryAnimate);
    };

    const start = () => {
      window.addEventListener("scroll", onScroll, { passive: true });
      tryAnimate();
    };

    // Defer until above-the-fold content (portfolio, images) has laid out
    if (document.readyState === "complete") {
      requestAnimationFrame(start);
    } else {
      window.addEventListener("load", () => requestAnimationFrame(start), {
        once: true,
      });
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Layout>
      <div className="home-page-wrapper">
        <div className="global-grid-overlay"></div>

        {/* Intro Section */}
        <section className="intro-section">
          {/* Background Container Layer */}
          <div className="spline-container">
            <Suspense fallback={<div className="loading-3d">Loading...</div>}>
              <HomePetalsSVG />
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
        <section className="portfolio">
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
              <h2 className="svc-title">SERVICES WE SPECIALISE IN</h2>
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
                  <div className="cap-hero-frame">
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
                          <i className="cap-underline" aria-hidden />
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* RIGHT: Content (Dynamic based on state) */}
                <div className="col-lg-3 col-12 cap-col cap-right">
                  <div className="content-wrapper">
                    <div className="cap-copy" key={activeIndex}>
                      <h3>
                        <span className="cap-strong">
                          {currentService.heading}
                        </span>
                      </h3>

                      <ul className="cap-bullets">
                        {currentService.bullets.map((bullet, idx) => (
                          <li
                            key={idx}
                            style={{ animationDelay: `${idx * 0.05}s` }}
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a href={currentService.link} className="cap-cta">
                      <span className="cap-cta-accent" />
                      <GlitchButton
                        as="span"
                        targetText="Explore More"
                        className="explore-btn"
                      />
                      <span className="cap-chev">›</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* Agency Intro */}
        <div className="ai-sticky-container">
          <section className="ai-wrap" ref={aiSectionRef}>
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
                  <div className="content-wrapper ai-mid-layout">
                    <h2 className="ai-head">
                      A locally set up global creative agency
                    </h2>

                    <div className="ai-mid-body">
                      <p className="ai-copy">
                        You know us as a creative agency that works towards
                        skyrocketing the client’s business.
                      </p>

                      <p className="ai-copy small">
                        Our secret is not our services but our approach towards
                        them.{" "}
                        <strong>Oops! Did we just disclose our secret?</strong>
                      </p>
                    </div>

                    <a className="ai-cta" href="/about">
                      <span className="ai-cta-accent" />
                      <GlitchButton
                        as="span"
                        targetText="Explore More"
                        className="explore-btn2"
                      />
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
        </div>

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
