import React, { useEffect, useRef } from "react";
import GlitchButton from "../GlitchButton";

const AgencyIntroSection = () => {
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

    // Defer until above-the-fold content has laid out
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
    <div className="ai-sticky-container">
      <section className="ai-wrap" ref={aiSectionRef}>
        <div className="container-fluid px-0">
          <div className="row g-0">
            <div className="col-lg-6 col-12 ai-col ai-left">
              <div className="content-wrapper">
                <p className="ai-kicker fw-semibold fs-h4">Dramantram is</p>
                <ul className="ai-stack russo-one-regular">
                  <li>BOLD</li>
                  <li>LOCALLY GLOBAL</li>
                  <li>ESSENTIALISM</li>
                  <li>STORYTELLING</li>
                  <li>UNDP ALIGNED</li>
                </ul>
              </div>
            </div>

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
                    them.<br />
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
                  <div className="num russo-one-regular-plain fs-h3">70+</div>
                  <div className="lbl">Identity Design</div>
                </div>

                <div className="ai-metric">
                  <div className="num russo-one-regular-plain fs-h3">200+</div>
                  <div className="lbl">Web & App Development</div>
                </div>

                <div className="ai-metric">
                  <div className="num russo-one-regular-plain fs-h3">
                    98K+ <span className="fs-h4">sec</span>
                  </div>
                  <div className="lbl">of Animated Video Creation</div>
                </div>

                <div className="ai-metric">
                  <div className="num russo-one-regular-plain fs-h3">
                    800+ <span className="fs-h4">min</span>
                  </div>
                  <div className="lbl">of Live Video Production</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgencyIntroSection;
