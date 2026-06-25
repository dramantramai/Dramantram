import React, { useState, useEffect, useRef } from "react";
import GlitchButton from "../GlitchButton";

/** Letter-by-letter morph from one title to another (no random glitch chars). */
const LetterMorphText = ({ text, fromText, animationKey }) => {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef(null);

  useEffect(() => {
    setDisplay(text);
  }, [text]);

  useEffect(() => {
    if (!fromText || fromText === text) {
      setDisplay(text);
      return;
    }

    if (intervalRef.current) clearInterval(intervalRef.current);

    const from = fromText;
    const to = text;
    let step = 0;
    const maxSteps = Math.max(from.length, to.length);

    setDisplay(from);

    intervalRef.current = setInterval(() => {
      step += 1;
      setDisplay(to.slice(0, step) + from.slice(step));

      if (step >= maxSteps) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplay(to);
      }
    }, 55);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [animationKey, text, fromText]);

  return <>{display}</>;
};

const servicesData = [
  {
    id: 0,
    menuTitle: "Branding",
    image: "Event.avif",
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
      "Social Media Branding",
      "Re-Branding",
      "Stationery Design",
      "Packaging Design",
    ],
    link: "/services/branding",
  },
  {
    id: 1,
    menuTitle: "Animated Videos",
    image: "Animation-Hero-Image.avif",
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
    image: "Live-Action500px.avif",
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
    image: "Ui_UX.avif",
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
    image: "Event.avif",
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
    image: "Others500px.avif",
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
  const [prevIndex, setPrevIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const currentService = servicesData[activeIndex];

  const handleServiceClick = (index) => {
    if (index === activeIndex) return;
    setPrevIndex(activeIndex);
    setActiveIndex(index);
    setAnimationKey((key) => key + 1);
  };

  return (
    <section className="specialization-sec">
      <section className="svc-band px-5">
        <div className="svc-inner">
          <h2 className="svc-title russo-one-regular">
            SERVICES WE
            <br />
            SPECIALISE IN
          </h2>
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
            <div className="col-lg-6 col-12 cap-col cap-left">
              <div className="cap-hero-frame">
                <img
                  key={currentService.image}
                  src={currentService.image}
                  alt={currentService.menuTitle}
                  className="cap-hero"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="col-lg-3 col-12 cap-col cap-mid">
              <div className="content-wrapper">
                {/* Desktop: full list with hover */}
                <nav
                  className="cap-menu cap-menu--desktop"
                  aria-label="Service categories"
                >
                  {servicesData.map((item, index) => (
                    <button
                      key={item.id}
                      className={`cap-menu-item ${
                        index === activeIndex ? "is-active" : ""
                      }`}
                      type="button"
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => setActiveIndex(index)}
                    >
                      <span className="fs-span-lg">{item.menuTitle}</span>
                      <i className="cap-underline" aria-hidden />
                    </button>
                  ))}
                </nav>

                {/* Mobile: active heading + inactive list (swap on click) */}
                <div className="cap-menu-mobile">
                  <h3 className="cap-mobile-heading inter-semibold">
                    <LetterMorphText
                      text={currentService.menuTitle}
                      fromText={servicesData[prevIndex].menuTitle}
                      animationKey={animationKey}
                    />
                  </h3>
                  <nav className="cap-mobile-list" aria-label="Service categories">
                    {servicesData.map((item, index) => {
                      if (index === activeIndex) return null;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className="cap-mobile-list-item"
                          onClick={() => handleServiceClick(index)}
                        >
                          <span>{item.menuTitle}</span>
                          <span className="cap-mobile-chev" aria-hidden>
                            ›
                          </span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-12 cap-col cap-right">
              <div className="content-wrapper">
                <div className="cap-copy" key={activeIndex}>
                  <h3 className="cap-heading--desktop">
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
