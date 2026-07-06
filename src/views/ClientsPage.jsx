import React, { useState, useEffect, useRef } from "react";
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
  const [partnerIndex, setPartnerIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const autoplayTimeoutRef = useRef(null);

  const resetAutoplay = React.useCallback((delay) => {
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }
    autoplayTimeoutRef.current = setTimeout(() => {
      setPartnerIndex((prev) => (prev + 1) % featuredPartners.length);
      resetAutoplay(4000);
    }, delay);
  }, [featuredPartners.length]);

  const handleUserInteraction = (newIndex) => {
    setPartnerIndex(newIndex);
    resetAutoplay(8000);
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const delta = touchStartX.current - touchEndX.current;
    const threshold = 40;
    if (Math.abs(delta) > threshold) {
      let nextIndex;
      if (delta > 0) {
        nextIndex = (partnerIndex + 1) % featuredPartners.length;
      } else {
        nextIndex = (partnerIndex - 1 + featuredPartners.length) % featuredPartners.length;
      }
      handleUserInteraction(nextIndex);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    resetAutoplay(4000);
    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [resetAutoplay]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data } = await axios.get("/api/v1/management/client");
        if (data?.success) {
          const formatted = data.clients.map((c) => ({
            _id: c._id,
            name: c.name,
            category: c.category,
            src: `/api/v1/management/client/${c._id}/image?t=${new Date(c.updatedAt).getTime()}`,
            width: c.width,
            height: c.height
          }));
          setRawClients(formatted);

          // Update featured partner image URLs if found in the fetched database items
          const unClient = data.clients.find(c => c.name.toLowerCase().includes("united nations"));
          const npciClient = data.clients.find(c => c.name.toLowerCase().includes("npci"));
          const eyClient = data.clients.find(c => c.name.toLowerCase().includes("ey") || c.name.toLowerCase().includes("ernst"));
          setFeaturedPartners([
            {
              name: "United Nations",
              src: unClient
                ? `/api/v1/management/client/${unClient._id}/image?t=${new Date(unClient.updatedAt).getTime()}`
                : "/images/un.png",
              desc: "Partnered for impactful communication across global development initiatives."
            },
            {
              name: "NPCI",
              src: npciClient
                ? `/api/v1/management/client/${npciClient._id}/image?t=${new Date(npciClient.updatedAt).getTime()}`
                : "/images/npci.png",
              desc: "Partnered for impactful communication across global development initiatives."
            },
            {
              name: "EY",
              src: eyClient
                ? `/api/v1/management/client/${eyClient._id}/image?t=${new Date(eyClient.updatedAt).getTime()}`
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

            <div
              className="featured-partners-slider-wrapper"
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0].clientX;
                touchEndX.current = e.touches[0].clientX;
              }}
              onTouchMove={(e) => {
                touchEndX.current = e.touches[0].clientX;
              }}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="featured-partners-slider-track"
                style={{
                  transform: `translate3d(-${partnerIndex * 100}%, 0, 0)`,
                }}
              >
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
              </div>

              <div className="featured-mobile-pagination">
                {featuredPartners.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`featured-mobile-pagination-dot ${idx === partnerIndex ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUserInteraction(idx);
                    }}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ClientsPage;
