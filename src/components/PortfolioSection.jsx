import React, { useState, useEffect, useRef } from "react";
import PortfolioItem from "./PortfolioItem";
import "../styles/PortfolioSection.css";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import GlitchButton from "./GlitchButton";

// --- CONSTANTS ---
const INDUSTRY_OPTIONS = [
  "Government",
  "Fintech",
  "Edtech",
  "Hospitality",
  "Consulting",
  "Tech",
  "NGO",
  "School",
  "Service",
  "Product",
];

const DURATION_OPTIONS = [
  "1 month",
  "2 months",
  "3 months",
  "4 months",
  "5 months",
  "6 months or more",
];

const SERVICE_OPTIONS = [
  "Brand Identity & Design",
  "Creating Logo",
  "Branding Strategy",
  "Defining Brand Style Guide",
  "Social Media Branding",
  "Re-Branding",
  "Stationery Design",
  "Catalogues & Brochure Design",
  "Packaging Design",
  "Explainer Animated Video",
  "Ad Film",
  "Sales & Marketing Video",
  "Demo Video",
  "e-Learning Video",
  "Animated Graphic/GIF",
  "Corporate Videos",
  "Testimonials",
  "Event Video",
  "Website Design",
  "web development",
  "app design",
  "game development",
  "Interactive Screens (Touch, Gesture, Motion)",
  "Anamorphic",
  "AR/VR",
];

const COMPLEXITY_OPTIONS = ["High", "Medium", "Low"];

const PortfolioSection = ({ showFilters = true, isHomePage = false, isPortfolioPage = false, baseService = "" }) => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for Dropdowns
  const [activeDropdown, setActiveDropdown] = useState(null);
  const filterRowRef = useRef(null);
  const [filters, setFilters] = useState({
    service: "",
    complexity: "",
    industry: "",
    duration: "",
  });

  const [startIndex, setStartIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("");
  const [homeMobileIndex, setHomeMobileIndex] = useState(0);
  const [homeCarouselMetrics, setHomeCarouselMetrics] = useState({
    step: 0,
    centerOffset: 0,
  });
  const homeCarouselRef = useRef(null);
  const homeTrackRef = useRef(null);
  const touchStartX = useRef(null);
  const homeAutoplayPaused = useRef(false);
  const homeAutoplayResumeTimer = useRef(null);

  // Reset startIndex when filters or pages change
  useEffect(() => {
    setStartIndex(0);
    setHomeMobileIndex(0);
  }, [filters, isHomePage, isPortfolioPage, baseService]);

  useEffect(() => {
    setHomeMobileIndex(0);
  }, [caseStudies]);

  // Save active case studies to sessionStorage for detail view pagination
  useEffect(() => {
    if (caseStudies && caseStudies.length > 0) {
      try {
        sessionStorage.setItem("filteredCaseStudies", JSON.stringify(caseStudies));
      } catch (e) {
        console.error("Failed to save caseStudies to sessionStorage", e);
      }
    }
  }, [caseStudies]);

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => Math.max(0, prev - 6));
      setAnimationClass("slide-from-top");
    }
  };

  const handleNext = () => {
    if (startIndex + 6 < caseStudies.length) {
      setStartIndex((prev) => prev + 6);
      setAnimationClass("slide-from-bottom");
    }
  };

  useEffect(() => {
    if (!animationClass) return;
    const timer = setTimeout(() => {
      setAnimationClass("");
    }, 500);
    return () => clearTimeout(timer);
  }, [animationClass]);

  // API URL helper
  const apiUrl = "";

  // --- 1. Main Fetch Function (Handles both Home & All) ---
  const getCaseStudies = async () => {
    try {
      setLoading(true);

      // Select endpoint based on isHomePage prop
      const endpoint = isHomePage
        ? `${apiUrl}/api/v1/management/get-homepage-case-studies` // The new controller you made
        : `${apiUrl}/api/v1/management/get-case-studies`; // The original controller

      const { data } = await axios.get(endpoint);

      if (data?.success) {
        setCaseStudies(data.caseStudies);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // --- 2. Filter Data (Only used on Portfolio Page) ---
  const filterResults = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${apiUrl}/api/v1/management/filter-case-studies`,
        { ...filters, baseService }
      );

      if (data?.success) {
        setCaseStudies(data.caseStudies);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error filtering results");
    } finally {
      setLoading(false);
    }
  };

  // --- 3. Unified Lifecycle Hook ---
  useEffect(() => {
    // A. If on Homepage, ignore filters and just fetch featured items
    if (isHomePage) {
      getCaseStudies();
      return;
    }

    // B. If filters or baseService are active, trigger filterResults
    const hasActiveFilters = Object.values(filters).some((val) => val !== "") || baseService !== "";

    if (hasActiveFilters) {
      filterResults();
    } else {
      // If no filters are active, fetch all
      getCaseStudies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, isHomePage, baseService]);

  const scrollToFilterRow = () => {
    const el = filterRowRef.current;
    if (!el) return;

    const portfolioSection = el.closest("section.portfolio") ?? el;
    const top =
      portfolioSection.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  useEffect(() => {
    if (!activeDropdown) return;

    const handleClickOutside = (event) => {
      if (
        filterRowRef.current &&
        !filterRowRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  // Toggle Dropdown Handler
  const toggleDropdown = (name) => {
    const isOpening = activeDropdown !== name;
    setActiveDropdown(isOpening ? name : null);

    if (isOpening) {
      scrollToFilterRow();
    }
  };

  // Select Option Handler
  const handleSelect = (category, value) => {
    setFilters((prev) => ({ ...prev, [category]: value }));
    setActiveDropdown(null); // Close dropdown after selection
  };

  // Helper to render the dropdown list
  const renderDropdownList = (options, category) => {
    return (
      <ul
        className="dropdown-menu show custom-dropdown-list"
        style={{
          position: "absolute",
          zIndex: 1000,
          left: 0,
          right: 0,
          width: "100%",
          maxHeight: "280px",
          overflowY: "auto",
          marginTop: "8px",
          backgroundColor: "#121212",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: "8px",
          listStyle: "none",
          padding: "6px 0",
          textAlign: "left",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Option to clear specific filter */}
        <li
          onClick={() => handleSelect(category, "")}
          style={{
            padding: "10px 16px",
            cursor: "pointer",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            color: "#888",
            fontSize: "0.9rem",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
            e.target.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#888";
          }}
        >
          {category === "duration" ? "All Project Duration" : `All ${category.charAt(0).toUpperCase() + category.slice(1)}`}
        </li>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleSelect(category, option)}
            style={{
              padding: "10px 16px",
              cursor: "pointer",
              borderBottom: index === options.length - 1 ? "none" : "1px solid rgba(255, 255, 255, 0.05)",
              color: "#e0e0e0",
              fontSize: "0.9rem",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
              e.target.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#e0e0e0";
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    );
  };

  const displayedCaseStudies = (isPortfolioPage || baseService !== "")
    ? caseStudies.slice(startIndex, startIndex + 6)
    : isHomePage
      ? caseStudies.slice(0, 6)
      : caseStudies;

  const homeMobileCaseStudies = caseStudies.slice(0, 6);

  const measureHomeCarousel = () => {
    const viewport = homeCarouselRef.current;
    const track = homeTrackRef.current;
    const slide = track?.querySelector(".home-mobile-carousel-slide");
    if (!viewport || !track || !slide) return;

    const gap = parseFloat(window.getComputedStyle(track).gap) || 12;
    const slideWidth = slide.offsetWidth;
    const step = slideWidth + gap;
    /* Center active slide in the middle of grid 2 */
    const centerOffset = viewport.offsetWidth / 2 - slideWidth / 2;

    setHomeCarouselMetrics({ step, centerOffset });
  };

  const goToHomeMobileSlide = (index) => {
    if (homeMobileCaseStudies.length === 0) return;

    const total = homeMobileCaseStudies.length;
    const nextIndex = ((index % total) + total) % total;
    setHomeMobileIndex(nextIndex);
  };

  const pauseHomeAutoplay = (resumeMs = 8000) => {
    homeAutoplayPaused.current = true;
    if (homeAutoplayResumeTimer.current) {
      clearTimeout(homeAutoplayResumeTimer.current);
    }
    homeAutoplayResumeTimer.current = setTimeout(() => {
      homeAutoplayPaused.current = false;
    }, resumeMs);
  };

  useEffect(() => {
    if (!isHomePage) return;

    const updateStep = () => measureHomeCarousel();

    updateStep();
    const rafId = requestAnimationFrame(updateStep);

    const observer = new ResizeObserver(updateStep);
    if (homeCarouselRef.current) observer.observe(homeCarouselRef.current);

    window.addEventListener("resize", updateStep);
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", updateStep);
    };
  }, [isHomePage, loading, homeMobileCaseStudies.length]);

  useEffect(() => {
    if (!isHomePage || homeMobileCaseStudies.length <= 1) return;

    const interval = setInterval(() => {
      if (homeAutoplayPaused.current) return;
      setHomeMobileIndex((prev) => (prev + 1) % homeMobileCaseStudies.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isHomePage, homeMobileCaseStudies.length]);

  useEffect(() => {
    return () => {
      if (homeAutoplayResumeTimer.current) {
        clearTimeout(homeAutoplayResumeTimer.current);
      }
    };
  }, []);

  const handleHomeTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    pauseHomeAutoplay();
  };

  const handleHomeTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const delta = touchStartX.current - e.changedTouches[0].clientX;
    const threshold = 40;

    if (Math.abs(delta) > threshold) {
      if (delta > 0) {
        goToHomeMobileSlide(homeMobileIndex + 1);
      } else {
        goToHomeMobileSlide(homeMobileIndex - 1);
      }
    }

    touchStartX.current = null;
  };

  const handleHomePaginationClick = (index) => {
    pauseHomeAutoplay();
    goToHomeMobileSlide(index);
  };

  const getHomeSlideClass = (index) => {
    if (index === homeMobileIndex) return "is-active";
    if (index === homeMobileIndex - 1 || index === homeMobileIndex + 1) {
      return "is-peek";
    }
    return "";
  };

  const homeTrackTransform =
    homeCarouselMetrics.step > 0
      ? `translateX(${homeCarouselMetrics.centerOffset - homeMobileIndex * homeCarouselMetrics.step}px)`
      : undefined;

  return (
    <div className={`portfolio-section ${isHomePage ? "home-portfolio" : ""}`}>
      {/* FILTER ROW - Only show if showFilters is true AND not on Homepage */}
      {showFilters && !isHomePage && (
        <div
          ref={filterRowRef}
          className="row g-0 p-0 filter-row col-md-12"
        >
          {/* SERVICE FILTER */}
          <div className="col-6 col-md-3 position-relative">
            <button
              className={`filter-pill ${activeDropdown === "service" ? "active" : ""
                }`}
              onClick={() => toggleDropdown("service")}
            >
              <span className="text-truncate">
                {filters.service || "Service"}
              </span>
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transition: "transform 0.3s ease",
                  transform: activeDropdown === "service" ? "rotate(180deg)" : "rotate(0deg)",
                  color: activeDropdown === "service" ? "#ffffff" : "#888",
                  marginLeft: "10px",
                  flexShrink: 0
                }}
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {activeDropdown === "service" &&
              renderDropdownList(SERVICE_OPTIONS, "service")}
          </div>

          {/* COMPLEXITY FILTER */}
          <div className="col-6 col-md-3 position-relative">
            <button
              className={`filter-pill ${activeDropdown === "complexity" ? "active" : ""
                }`}
              onClick={() => toggleDropdown("complexity")}
            >
              <span>{filters.complexity || "Complexity"}</span>
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transition: "transform 0.3s ease",
                  transform: activeDropdown === "complexity" ? "rotate(180deg)" : "rotate(0deg)",
                  color: activeDropdown === "complexity" ? "#ffffff" : "#888",
                  marginLeft: "10px",
                  flexShrink: 0
                }}
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {activeDropdown === "complexity" &&
              renderDropdownList(COMPLEXITY_OPTIONS, "complexity")}
          </div>

          {/* INDUSTRY FILTER */}
          <div className="col-6 col-md-3 position-relative">
            <button
              className={`filter-pill ${activeDropdown === "industry" ? "active" : ""
                }`}
              onClick={() => toggleDropdown("industry")}
            >
              <span>{filters.industry || "Industry"}</span>
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transition: "transform 0.3s ease",
                  transform: activeDropdown === "industry" ? "rotate(180deg)" : "rotate(0deg)",
                  color: activeDropdown === "industry" ? "#ffffff" : "#888",
                  marginLeft: "10px",
                  flexShrink: 0
                }}
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {activeDropdown === "industry" &&
              renderDropdownList(INDUSTRY_OPTIONS, "industry")}
          </div>

          {/* DURATION FILTER */}
          <div className="col-6 col-md-3 position-relative">
            <button
              className={`filter-pill ${activeDropdown === "duration" ? "active" : ""
                }`}
              onClick={() => toggleDropdown("duration")}
            >
              <span>{filters.duration || "Project Duration"}</span>
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transition: "transform 0.3s ease",
                  transform: activeDropdown === "duration" ? "rotate(180deg)" : "rotate(0deg)",
                  color: activeDropdown === "duration" ? "#ffffff" : "#888",
                  marginLeft: "10px",
                  flexShrink: 0
                }}
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {activeDropdown === "duration" &&
              renderDropdownList(DURATION_OPTIONS, "duration")}
          </div>
        </div>
      )}

      <div className="container-fluid container-fluid-custom">
        <div className="row g-0">
          {/* Left Sidebar - Styled like Our Teams */}
          <div className="col-lg-3 portfolio-sidebar">
            <div className="sidebar-content">
              <h2 className="portfolio-title raleway-semibold">
                Portfolio & <br />Case Studies
              </h2>
              <p className="portfolio-description">
                {"We're brand builders at heart, creators by design, tech"}
                {" enthusiasts in practice, and integrated at our core."}
              </p>
              <GlitchButton
                to={isPortfolioPage ? "/contact" : "/portfolio"}
                className="connect-link"
                targetText={isPortfolioPage ? "Let's Connect" : "Show All"}
              />
            </div>
          </div>

          {/* Right Column - Grid matching Our Teams */}
          <div className="col-lg-9">
            <div className={`row g-0 ${isHomePage ? "home-desktop-grid" : ""}`}>
              {loading && !isHomePage ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div className="portfolio-card-wrapper">
                      <div className="portfolio-item">
                        <div className="portfolio-skeleton" />
                      </div>
                    </div>
                  </div>
                ))
              ) : !loading && displayedCaseStudies.length > 0 ? (
                displayedCaseStudies.map((item) => (
                  <div key={item._id} className={`col-md-6 col-lg-4 ${animationClass}`}>
                    <div className="portfolio-card-wrapper">
                      <Link href={`/case-study/${item.slug}`}>
                        <PortfolioItem
                          imageSrc={item.thumbnailDataUri || `${apiUrl}/api/v1/management/get-thumbnail-image/${item._id}`}
                          title={item.case_study_name}
                          slug={item.slug}
                        />
                      </Link>
                    </div>
                  </div>
                ))
              ) : !loading ? (
                <div className="col-12 text-center text-white py-5">
                  <p>No case studies found matching these filters.</p>
                </div>
              ) : null}
            </div>

            {/* Mobile home carousel — grid 2 */}
            {isHomePage && (
              <div
                className={`home-mobile-carousel-wrap${loading ? " is-loading" : ""}`}
                onTouchStart={handleHomeTouchStart}
                onTouchEnd={handleHomeTouchEnd}
              >
                <div ref={homeCarouselRef} className="home-mobile-carousel-viewport">
                  <div
                    ref={homeTrackRef}
                    className="home-mobile-carousel-track"
                    style={{ transform: homeTrackTransform }}
                  >
                    {loading ? (
                      <div className="home-mobile-carousel-slide is-active">
                        <div className="portfolio-card-wrapper">
                          <div className="portfolio-item">
                            <div className="portfolio-skeleton" />
                          </div>
                        </div>
                      </div>
                    ) : homeMobileCaseStudies.length > 0 ? (
                      homeMobileCaseStudies.map((item, index) => (
                        <div
                          key={item._id}
                          className={`home-mobile-carousel-slide ${getHomeSlideClass(index)}`}
                        >
                          <div className="portfolio-card-wrapper">
                            <Link href={`/case-study/${item.slug}`}>
                              <PortfolioItem
                                imageSrc={
                                  item.thumbnailDataUri ||
                                  `${apiUrl}/api/v1/management/get-thumbnail-image/${item._id}`
                                }
                                title={item.case_study_name}
                                slug={item.slug}
                              />
                            </Link>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="home-mobile-carousel-slide is-active">
                        <p className="home-mobile-empty">No case studies found.</p>
                      </div>
                    )}
                  </div>
                </div>

                {!loading && homeMobileCaseStudies.length > 1 && (
                  <div className="home-mobile-pagination" role="tablist" aria-label="Case study slides">
                    {homeMobileCaseStudies.map((item, index) => (
                      <button
                        key={item._id}
                        type="button"
                        role="tab"
                        aria-selected={index === homeMobileIndex}
                        aria-label={`Go to ${item.case_study_name}`}
                        className={`home-mobile-pagination-dot ${
                          index === homeMobileIndex ? "active" : ""
                        }`}
                        onClick={() => handleHomePaginationClick(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Portfolio Pagination Controls in the rightmost empty space */}
          {(isPortfolioPage || baseService !== "") && (
            <div className="portfolio-controls">
              <button
                onClick={handlePrev}
                disabled={startIndex === 0}
                className="portfolio-btn"
                aria-label="Previous case studies"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 15L12 9L6 15"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                disabled={startIndex + 6 >= caseStudies.length}
                className="portfolio-btn"
                aria-label="Next case studies"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection;
