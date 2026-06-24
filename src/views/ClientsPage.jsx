import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import BackgroundGlow from "../components/BackgroundGlow";
import "../styles/ClientsPage.css";

const CLIENTS_GLOWS = [
  // Top right glow overlaying the hero section
  { top: "-80vh", right: "5vw", size: "90vw", opacity: 0.65, blur: "80px" },
  // Bottom left glow for the listing section
  { top: "80vh", right: "-15vw", size: "60vw", opacity: 0.65, blur: "90px" },
];

const CATEGORIES_ORDER = ["Consulting", "International", "Fintech", "Corporate", "Government", "CSR"];

const ClientsPage = () => {
  const [clients, setClients] = useState({
    Consulting: [],
    International: [],
    Fintech: [],
    Corporate: [],
    Government: [],
    CSR: []
  });
  const [featuredPartners, setFeaturedPartners] = useState([
    { name: "United Nations", src: "/images/un.png", desc: "Partnered for impactful communication across global development initiatives." },
    { name: "NPCI", src: "/images/npci.png", desc: "Partnered for impactful communication across global development initiatives." },
    { name: "EY", src: "/images/ey.png", desc: "Partnered for impactful communication across global development initiatives." }
  ]);
  const [loading, setLoading] = useState(true);

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
                _id: c._id,
                name: c.name,
                src: `/api/v1/management/client/${c._id}/image`,
                width: c.width,
                height: c.height
              });
            }
          });
          setClients(grouped);

          // Update featured partner image URLs if found in the fetched database items
          setFeaturedPartners([
            {
              name: "United Nations",
              src: data.clients.find(c => c.name.toLowerCase().includes("united nations"))
                ? `/api/v1/management/client/${data.clients.find(c => c.name.toLowerCase().includes("united nations"))._id}/image`
                : "/images/un.png",
              desc: "Partnered for impactful communication across global development initiatives."
            },
            {
              name: "NPCI",
              src: data.clients.find(c => c.name.toLowerCase().includes("npci"))
                ? `/api/v1/management/client/${data.clients.find(c => c.name.toLowerCase().includes("npci"))._id}/image`
                : "/images/npci.png",
              desc: "Partnered for impactful communication across global development initiatives."
            },
            {
              name: "EY",
              src: data.clients.find(c => c.name.toLowerCase().includes("ey") || c.name.toLowerCase().includes("ernst"))
                ? `/api/v1/management/client/${data.clients.find(c => c.name.toLowerCase().includes("ey") || c.name.toLowerCase().includes("ernst"))._id}/image`
                : "/images/ey.png",
              desc: "Partnered for impactful communication across global development initiatives."
            }
          ]);
        }
      } catch (err) {
        console.error("Error fetching clients:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  return (
    <Layout>
      <div className="clients-page-wrapper">
        <BackgroundGlow glows={CLIENTS_GLOWS} />

        {/* Hero Section */}
        <section className="clients-hero-section">
          <div className="clients-hero-grid">
            <div className="grid-col-spacer"></div>
            <div className="hero-main-col">
              <h2 className="russo-one-regular hero-title">
                OUR VALUED <br /> CLIENT PARTNERS
              </h2>
              <p className="hero-desc">
                With more than 80% client retention rate, <br /> we have worked with all
                kinds of organizations <br /> across geography - from Multinational to
                startup, <br /> from Govt. to NGO/NPOs, and more.
              </p>
            </div>
            <div className="grid-col-spacer"></div>
            <div className="grid-col-spacer"></div>
            <div className="grid-col-spacer"></div>
          </div>

          <div className="clients-stats-grid">
            <div className="grid-col-spacer"></div>
            <div className="stat-col">
              <div className="stat-num raleway-semibold fs-h3">100+</div>
              <div className="stat-label raleway-regular">Clients Served</div>
            </div>
            <div className="stat-col">
              <div className="stat-num raleway-semibold fs-h3">15+</div>
              <div className="stat-label raleway-regular">Industries</div>
            </div>
            <div className="stat-col">
              <div className="stat-num raleway-semibold fs-h3">10+</div>
              <div className="stat-label raleway-regular">Years Of Experience</div>
            </div>
            <div className="stat-col">
              <div className="stat-num raleway-semibold fs-h3">25+</div>
              <div className="stat-label raleway-regular">Countries Impacted</div>
            </div>
            <div className="grid-col-spacer"></div>
          </div>
        </section>

        {/* Listings Section */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {loading ? (
            <div className="clients-page-loading">Loading client list...</div>
          ) : (
            <div className="clients-page-grid">
              {/* Row 1 */}
              <div className="client-category-tile tile-consulting">
                <div className="tile-label">Consulting</div>
                <div className="logo-stack">
                  {(clients.Consulting || []).map((c) => (
                    <img
                      key={c._id}
                      src={c.src}
                      alt={`${c.name} Logo`}
                      className="client-logo"
                      style={{ width: c.width || "auto", height: c.height || "auto" }}
                    />
                  ))}
                </div>
              </div>

              <div className="client-category-tile tile-international">
                <div className="tile-label">International</div>
                <div className="logo-stack">
                  {(clients.International || []).map((c) => (
                    <img
                      key={c._id}
                      src={c.src}
                      alt={`${c.name} Logo`}
                      className="client-logo"
                      style={{ width: c.width || "auto", height: c.height || "auto" }}
                    />
                  ))}
                </div>
              </div>

              <div className="client-category-tile tile-fintech">
                <div className="tile-label">Fintech</div>
                <div className="logo-stack">
                  {(clients.Fintech || []).map((c) => (
                    <img
                      key={c._id}
                      src={c.src}
                      alt={`${c.name} Logo`}
                      className="client-logo"
                      style={{ width: c.width || "auto", height: c.height || "auto" }}
                    />
                  ))}
                </div>
              </div>

              <div className="client-category-tile tile-corporate">
                <div className="tile-label">Corporate</div>
                <div className="logo-stack">
                  {(clients.Corporate || []).map((c) => (
                    <img
                      key={c._id}
                      src={c.src}
                      alt={`${c.name} Logo`}
                      className="client-logo"
                      style={{ width: c.width || "auto", height: c.height || "auto" }}
                    />
                  ))}
                </div>
              </div>

              {/* Row 2 */}
              <div className="client-category-tile tile-government">
                <div className="tile-label">Government</div>
                <div className="logo-stack">
                  {(clients.Government || []).map((c) => (
                    <img
                      key={c._id}
                      src={c.src}
                      alt={`${c.name} Logo`}
                      className="client-logo"
                      style={{ width: c.width || "auto", height: c.height || "auto" }}
                    />
                  ))}
                </div>
              </div>

              <div className="client-category-tile tile-csr">
                <div className="tile-label">CSR</div>
                <div className="logo-stack">
                  {(clients.CSR || []).map((c) => (
                    <img
                      key={c._id}
                      src={c.src}
                      alt={`${c.name} Logo`}
                      className="client-logo"
                      style={{ width: c.width || "auto", height: c.height || "auto" }}
                    />
                  ))}
                </div>
              </div>

              {/* Empty spacer tiles for grid lines completeness */}
              <div className="client-category-tile tile-empty-1"></div>
              <div className="client-category-tile tile-empty-2"></div>
            </div>
          )}
        </div>

        {/* Featured Partnerships Grid Section */}
        {!loading && (
          <section className="featured-section-grid">
            <div className="tile-featured-cta">
              <h3 className="raleway-semibold featured-cta-title">
                Featured <br /> Partnerships
              </h3>
              <p className="featured-cta-desc">
                Long-term collaborations <br />
                Built on trust, innovation <br />
                and shared impact.
              </p>
            </div>

            {featuredPartners.map((partner, index) => (
              <div key={index} className="tile-featured-partner">
                <div className="featured-partner-logo-wrap">
                  <img
                    src={partner.src}
                    alt={`${partner.name} Logo`}
                    className="featured-partner-logo"
                  />
                </div>
                <p className="featured-partner-desc">
                  {partner.desc}
                </p>
              </div>
            ))}
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ClientsPage;
