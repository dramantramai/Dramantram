import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import BackgroundGlow from "../components/BackgroundGlow";
import "../styles/ClientsPage.css";

const CLIENTS_GLOWS = [
  // Top right glow overlaying the hero section
  { top: "-80vh", left: "-15vw", size: "70vw", opacity: 0.65, blur: "80px" },
  // Bottom left glow for the listing section
  { top: "80vh", right: "-15vw", size: "60vw", opacity: 0.65, blur: "90px" },
];

const CATEGORIES_ORDER = ["Consulting", "International", "Fintech", "Corporate", "Government", "CSR"];

const ClientsPage = () => {
  const [rawClients, setRawClients] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
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
          const formatted = data.clients.map((c) => ({
            _id: c._id,
            name: c.name,
            category: c.category,
            src: `/api/v1/management/client/${c._id}/image`,
            width: c.width,
            height: c.height
          }));
          setRawClients(formatted);

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

  const filteredClients = rawClients.filter(
    (c) => selectedCategory === "All" || c.category === selectedCategory
  );

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
                Trusted By <br /> 100+ Organisations <br />
                Across Industries <br /> And Borders
              </h2>
              <p className="hero-desc">
                With more than 80% client retention rate, <br /> we have worked with all
                kinds of organizations <br /> across geography - from Multinational to
                startup, <br /> from Govt. to NGO/NPOs, and more.
              </p>
            </div>
            <div className="hero-image-col">
              <img src="/client_hero.png" alt="Client Partners" className="hero-image" />
            </div>
            <div className="grid-col-spacer"></div>
          </div>

          <div className="clients-stats-grid">
            <div className="grid-col-spacer"></div>
            <div className="stat-col">
              <div className="stat-num russo-one-regular-plain fs-h3">100+</div>
              <div className="stat-label raleway-regular">Clients Served</div>
            </div>
            <div className="stat-col">
              <div className="stat-num russo-one-regular-plain fs-h3">15+</div>
              <div className="stat-label raleway-regular">Industries</div>
            </div>
            <div className="stat-col">
              <div className="stat-num russo-one-regular-plain fs-h3">10+</div>
              <div className="stat-label raleway-regular">Years Of Experience</div>
            </div>
            <div className="stat-col">
              <div className="stat-num russo-one-regular-plain fs-h3">25+</div>
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
            <div className="clients-browse-section">
              {/* Header Grid containing Heading */}
              <div className="clients-browse-header-grid">
                <div className="grid-col-spacer"></div>
                <div className="browse-title-col">
                  <h2 className="raleway-semibold browse-title">Browse Clients by Industry</h2>
                </div>
                <div className="grid-col-spacer"></div>
                <div className="grid-col-spacer"></div>
                <div className="grid-col-spacer"></div>
              </div>

              {/* Filters Row */}
              <div className="clients-filters-grid">
                <div className="grid-col-spacer"></div>

                <div className="browse-filters-col">
                  <div className="categories-filter-bar">
                    <button
                      onClick={() => setSelectedCategory("All")}
                      className={`filter-btn ${selectedCategory === "All" ? "active" : ""}`}
                    >
                      All
                    </button>
                    {CATEGORIES_ORDER.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid-col-spacer"></div>
              </div>

              {/* 4-Column Logo Grid */}
              <div className="clients-browse-grid">
                <div className="grid-col-spacer"></div>
                
                {/* Column 1 */}
                <div className="browse-logos-col browse-col-1">
                  {filteredClients
                    .filter((_, idx) => idx % 4 === 0)
                    .map((c) => (
                      <div key={c._id} className="client-logo-wrapper">
                        <img
                          src={c.src}
                          alt={`${c.name} Logo`}
                          className="client-logo"
                          style={{ width: c.width || "auto", height: c.height || "auto" }}
                        />
                      </div>
                    ))}
                </div>

                {/* Column 2 */}
                <div className="browse-logos-col browse-col-2">
                  {filteredClients
                    .filter((_, idx) => idx % 4 === 1)
                    .map((c) => (
                      <div key={c._id} className="client-logo-wrapper">
                        <img
                          src={c.src}
                          alt={`${c.name} Logo`}
                          className="client-logo"
                          style={{ width: c.width || "auto", height: c.height || "auto" }}
                        />
                      </div>
                    ))}
                </div>

                {/* Column 3 */}
                <div className="browse-logos-col browse-col-3">
                  {filteredClients
                    .filter((_, idx) => idx % 4 === 2)
                    .map((c) => (
                      <div key={c._id} className="client-logo-wrapper">
                        <img
                          src={c.src}
                          alt={`${c.name} Logo`}
                          className="client-logo"
                          style={{ width: c.width || "auto", height: c.height || "auto" }}
                        />
                      </div>
                    ))}
                </div>

                {/* Column 4 */}
                <div className="browse-logos-col browse-col-4">
                  {filteredClients
                    .filter((_, idx) => idx % 4 === 3)
                    .map((c) => (
                      <div key={c._id} className="client-logo-wrapper">
                        <img
                          src={c.src}
                          alt={`${c.name} Logo`}
                          className="client-logo"
                          style={{ width: c.width || "auto", height: c.height || "auto" }}
                        />
                      </div>
                    ))}
                </div>

                <div className="grid-col-spacer"></div>
              </div>
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
