import React, { useState } from "react";
import GlitchButton from "../GlitchButton";

const servicesData = [
  {
    id: 0,
    menuTitle: "Branding",
    image: "Event.avif", // Ensure this exists in public folder
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

const SpecializationSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentService = servicesData[activeIndex];

  return (
    <section className="specialization-sec">
      <section className="svc-band px-5">
        <div className="svc-inner">
          <h2 className="svc-title russo-one-regular">SERVICES WE SPECIALISE IN</h2>
          <div className="svc-right">
            <p className="svc-copy">
              We are humbled by the trust shown to us by our client partners{" "}
              <br />
              which helped us achieve more than
            </p>
          </div>
          <div className="svc-metrics">
            <div className="metric">
              <div className="num russo-one-regular-plain fs-h3">1600+</div>
              <div className="label">Projects</div>
            </div>

            <div className="metric">
              <div className="num russo-one-regular-plain fs-h3">100+</div>
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
                      <span className="fs-span-lg">{item.menuTitle}</span>
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
                    <span className="cap-strong inter-semibold">
                      {currentService.heading}
                    </span>
                  </h3>

                  <ul className="cap-bullets inter-light">
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
  );
};

export default SpecializationSection;
