// src/components/ClientsSection.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import GlitchButton from "../GlitchButton";
import '../../styles/Clients.css';

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
  const [clients, setClients] = useState({
    Consulting: [],
    International: [],
    Fintech: [],
    Corporate: [],
    Government: [],
    CSR: []
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data } = await axios.get("/api/v1/management/client");
        if (data?.success) {
          const grouped = {
            Consulting: [],
            International: [],
            Fintech: [],
            Corporate: [],
            Government: [],
            CSR: []
          };
          data.clients.forEach((c) => {
            if (grouped[c.category]) {
              grouped[c.category].push({
                alt: c.name,
                src: `/api/v1/management/client/${c._id}/image`,
                width: c.width,
                height: c.height
              });
            }
          });
          setClients(grouped);
        }
      } catch (err) {
        console.error("Error fetching clients:", err);
      }
    };
    fetchClients();
  }, []);

  return (
    <section className="clients-section">
      <div className="clients-grid">
        {/* Top-left Intro */}
        <div className="tile tile-intro">
          <h2 className="intro-title raleway-semibold">
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
          <LogoStack items={clients.Consulting} />
        </div>

        <div className="tile">
          <div className="tile-label">International</div>
          <LogoStack items={clients.International} />
        </div>

        <div className="tile">
          <div className="tile-label">Fintech</div>
          <LogoStack items={clients.Fintech} />
        </div>

        {/* Bottom row categories */}
        <div className="tile">
          <div className="tile-label">Corporate</div>
          <LogoStack items={clients.Corporate} />
        </div>

        <div className="tile">
          <div className="tile-label">Government</div>
          <LogoStack items={clients.Government} />
        </div>

        <div className="tile">
          <div className="tile-label">CSR</div>
          <LogoStack items={clients.CSR} />
        </div>

        {/* CTA gradient tile */}
        <div className="tile tile-cta">
          <div className="cta-inner">
            <h4 className="cta-head raleway-semibold">
              Check out the <br /> full client list
            </h4>
            <GlitchButton
              className="clients-cta-btn"
              href="#clients"
              targetText="Complete List"
            >
              Complete List
            </GlitchButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;

