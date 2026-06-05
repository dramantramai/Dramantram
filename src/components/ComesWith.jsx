import React from "react";
import "../styles/ComesWith.css";
import { useState } from "react";

const ComesWith = () => {
  const TABS = [
    { key: "revisions", label: "Unlimited\nRevisions" },
    { key: "pricing", label: "Clear,\nFixed pricing" },
    { key: "experience", label: "A Wealth of\nExperience" },
    { key: "pm", label: "Project\nManagement" },
  ];

  const [active, setActive] = useState("revisions");

  const body = {
    revisions:
      "Experience the unparalleled freedom of unlimited revisions! At our company, we are dedicated to perfecting your project to ensure it aligns perfectly with your vision. We believe that creativity knows no bounds, and through collaborative efforts, we can achieve extraordinary results together. There are absolutely no limits to what we can create, so let your imagination run wild!",
    pricing:
      "Transparent proposals with clear, fixed pricing. No surprises—just scoped work, defined milestones, and outcomes.",
    experience:
      "Seasoned team across branding, motion, live action and digital. Battle-tested workflows deliver on time, every time.",
    pm: "From kickoff to delivery, your project is tracked, communicated, and managed with thoughtful care and accountability.",
  }[active];

  return (
    <section className="cw-wrap container-fluid">
      <div className="row g-0 align-items-start">
        {/* LEFT: logo / mask */}
        <div className="col-12 col-lg-6 px-4 px-lg-5 d-flex justify-content-center justify-content-lg-start">
          <img
            src="/logos/DM_White.png"
            alt="Dramantram mask"
            className="cw-mask"
          />
        </div>

        {/* RIGHT: headline, tabs, copy */}
        <div className="col-12 col-lg-6 px-4 px-lg-5">
          <h2 className="cw-head">
            AND IT ALL
            <br />
            COMES WITH…
          </h2>

          {/* Tabs */}
          <div className="cw-tabs">
            {TABS.map((t) => {
              const isActive = t.key === active;
              return (
                <button
                  key={t.key}
                  className={`cw-tab ${isActive ? "is-active" : ""}`}
                  onClick={() => setActive(t.key)}
                  type="button"
                >
                  {t.label.split("\n").map((line, i) => (
                    <span key={i} className="cw-tab-line">
                      {line}
                    </span>
                  ))}
                  {isActive && <span className="cw-active-underline" />}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="cw-divider" />

          {/* Body */}
          <p className="cw-body">{body}</p>
        </div>
      </div>
    </section>
  );
};

export default ComesWith;
