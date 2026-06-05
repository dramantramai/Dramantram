// src/components/ClientsSection.jsx
import React from "react";
import "../styles/Clients.css";

// Updated Data with individual Width/Height
const consulting = [
  {
    alt: "Deloitte",
    src: "/logos/clients/deloitte.png",
    width: "140px",
    height: "auto",
  },
  { alt: "EY", src: "/logos/clients/Ey.png", width: "100px", height: "100px" },
  { alt: "PwC", src: "/logos/clients/PWC.png", width: "100px", height: "auto" },
];

const international = [
  {
    alt: "United Nations",
    src: "/logos/clients/United Nations.png",
    width: "120px",
    height: "auto",
  },
  {
    alt: "Amazon",
    src: "/logos/clients/Amazon Logo.png",
    width: "110px",
    height: "120px",
  },
  {
    alt: "Walmart",
    src: "/logos/clients/Walmart.png",
    width: "130px",
    height: "auto",
  },
];

const fintech = [
  {
    alt: "NPCI",
    src: "/logos/clients/npci.png",
    width: "130px",
    height: "auto",
  },
  {
    alt: "Pine Labs",
    src: "/logos/clients/pine-labs.png",
    width: "140px",
    height: "120px",
  },
  {
    alt: "Razorpay",
    src: "/logos/clients/razorpay.png",
    width: "140px",
    height: "auto",
  },
];

const corporate = [
  {
    alt: "boAt",
    src: "/logos/clients/boat.png",
    width: "90px",
    height: "auto",
  },
  {
    alt: "Maruti Suzuki",
    src: "/logos/clients/suzuki.png",
    width: "200px",
    height: "110px",
  },
  {
    alt: "HCL",
    src: "/logos/clients/hcl.png",
    width: "120px",
    height: "auto",
  },
];

const government = [
  {
    alt: "Invest India",
    src: "/logos/clients/invest-india.png",
    width: "180px",
    height: "auto",
  },
];

const csr = [
  {
    alt: "Sehgal Foundation",
    src: "/logos/clients/sehgal.png",
    width: "120px",
    height: "auto",
  },
  {
    alt: "TRI",
    src: "/logos/clients/tri.png",
    width: "120px",
    height: "110px",
  },
  {
    alt: "Toilet Board Coalition",
    src: "/logos/clients/toilet-board.png",
    width: "140px",
    height: "auto",
  },
];

// UPDATED COMPONENT
const LogoStack = ({ items }) => (
  <div className="logo-stack">
    {items.map((it, i) => (
      <img
        key={i}
        src={it.src}
        alt={it.alt}
        className="logo"
        style={{
          width: it.width || "auto",
          height: it.height || "auto",
        }}
      />
    ))}
  </div>
);

const ClientsSection = () => {
  return (
    <section className="clients-section">
      <div className="clients-grid">
        {/* Top-left Intro */}
        <div className="tile tile-intro">
          <h2 className="intro-title">
            Our Valued
            <br />
            Client Partners
          </h2>
          <p className="intro-copy">
            With more than 80% client retention rate, we have worked with all
            kinds of organizations across geography — from Multinational to
            startup, from Govt. to NGO/NPOs, and more.
          </p>
        </div>

        {/* Top row categories */}
        <div className="tile">
          <div className="tile-label">Consulting</div>
          <LogoStack items={consulting} />
        </div>

        <div className="tile">
          <div className="tile-label">International</div>
          <LogoStack items={international} />
        </div>

        <div className="tile">
          <div className="tile-label">Fintech</div>
          <LogoStack items={fintech} />
        </div>

        {/* Bottom row categories */}
        <div className="tile">
          <div className="tile-label">Corporate</div>
          <LogoStack items={corporate} />
        </div>

        <div className="tile">
          <div className="tile-label">Government</div>
          <LogoStack items={government} />
        </div>

        <div className="tile">
          <div className="tile-label">CSR</div>
          <LogoStack items={csr} />
        </div>

        {/* CTA gradient tile */}
        <div className="tile tile-cta">
          <div className="cta-accent" />
          <div className="cta-inner">
            <h3 className="cta-head">
              Check out the <br /> full client list
            </h3>
            <a href="#clients" className="cta-link">
              <span>Complete List</span>
              <span className="chev">›</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
