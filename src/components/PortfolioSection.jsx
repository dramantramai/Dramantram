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
  "Technology",
  "NGO",  
  "School",
  "Service",
  "Product",
  'Luxury Jewellery',
  'Healthcare',
  'Food & Agriculture',
  'Real Estate',
  'Data Security',
  'LogisticsTech',
  'Manufacturing & Printing',
];

const DURATION_OPTIONS = [
  'Under 1 month',
  "1 month",
  "2 months",
  "3 months",
  "4 months",
  "5 months",
  "6 months or more",
  'Monthly Retainer'
];

const SERVICE_OPTIONS = [
  "Brand Identity & Design", // - Branding
  "Creating Logo", // - Branding
  "Branding Strategy", // - Branding
  "Booklet design", // - Branding
  "Defining Brand Style Guide", // - Branding
  "Social Media Branding", // - Branding
  "Re-Branding", // - Branding
  "Stationery Design", // - Branding
  "Catalogues & Brochure Design", // - Branding
  "Packaging Design", // - Branding
  "Explainer Animated Video", // - Animation
  "Ad Film", // - Live Action
  "Sales & Marketing Video", // - Animation
  "Demo Video", // - Animation
  "e-Learning Video", // - Animation
  "Animated Graphic/GIF", // - Animation
  "Corporate Videos", // - Live Action
  "Testimonials", // - Live Action
  "Event Video", // - Live Action
  "Website Design", // - Web & App Development
  "Web Development", // - Web & App Development
  "App Design", // - Web & App Development
  "Game Development", // - Experiential Lab
  "Interactive Screens (Touch, Gesture, Motion)", // - Experiential Lab
  "Anamorphic", // - Experiential Lab
  "AR/VR", // - Experiential Lab
  'Production & Post Production' // - Live Action
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
  const [mobileIndex, setMobileIndex] = useState(0);
  const [carouselMetrics, setCarouselMetrics] = useState({
    step: 0,
    centerOffset: 0,
  });
  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  const touchStartX = useRef(null);
  const autoplayPaused = useRef(false);
  const autoplayResumeTimer = useRef(null);

  const isCarouselView = isHomePage || !isPortfolioPage;

  // Reset startIndex when filters or pages change
  useEffect(() => {
    setStartIndex(0);
    setMobileIndex(0);
  }, [filters, isHomePage, isPortfolioPage, baseService]);

  useEffect(() => {
    setMobileIndex(0);
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
      <ul className="dropdown-menu show custom-dropdown-list">
        {/* Option to clear specific filter */}
        <li
          onClick={() => handleSelect(category, "")}
          className="custom-dropdown-item clear-option"
        >
          {category === "duration" ? "All Project Duration" : `All ${category.charAt(0).toUpperCase() + category.slice(1)}`}
        </li>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleSelect(category, option)}
            className="custom-dropdown-item"
          >
            {option}
          </li>
        ))}
      </ul>
    );
  };

  const displayedCaseStudies = isPortfolioPage
    ? caseStudies
    : baseService !== "" || isHomePage
      ? caseStudies.slice(0, 6)
      : caseStudies;

  const mobileCaseStudies = caseStudies.slice(0, 6);

  const measureCarousel = () => {
    const viewport = carouselRef.current;
    const track = trackRef.current;
    const slide = track?.querySelector(".home-mobile-carousel-slide");
    if (!viewport || !track || !slide) return;

    const gap = parseFloat(window.getComputedStyle(track).gap) || 12;
    const slideWidth = slide.offsetWidth;
    const step = slideWidth + gap;
    /* Center active slide in the middle of grid 2 */
    const centerOffset = viewport.offsetWidth / 2 - slideWidth / 2;

    setCarouselMetrics({ step, centerOffset });
  };

  const goToMobileSlide = (index) => {
    if (mobileCaseStudies.length === 0) return;

    const total = mobileCaseStudies.length;
    const nextIndex = ((index % total) + total) % total;
    setMobileIndex(nextIndex);
  };

  const pauseAutoplay = (resumeMs = 8000) => {
    autoplayPaused.current = true;
    if (autoplayResumeTimer.current) {
      clearTimeout(autoplayResumeTimer.current);
    }
    autoplayResumeTimer.current = setTimeout(() => {
      autoplayPaused.current = false;
    }, resumeMs);
  };

  useEffect(() => {
    if (!isCarouselView) return;

    const updateStep = () => measureCarousel();

    updateStep();
    const rafId = requestAnimationFrame(updateStep);

    const observer = new ResizeObserver(updateStep);
    if (carouselRef.current) observer.observe(carouselRef.current);

    window.addEventListener("resize", updateStep);
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", updateStep);
    };
  }, [isCarouselView, loading, mobileCaseStudies.length]);

  useEffect(() => {
    if (!isCarouselView || mobileCaseStudies.length <= 1) return;

    const interval = setInterval(() => {
      if (autoplayPaused.current) return;
      setMobileIndex((prev) => (prev + 1) % mobileCaseStudies.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isCarouselView, mobileCaseStudies.length]);

  useEffect(() => {
    return () => {
      if (autoplayResumeTimer.current) {
        clearTimeout(autoplayResumeTimer.current);
      }
    };
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    pauseAutoplay();
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const delta = touchStartX.current - e.changedTouches[0].clientX;
    const threshold = 40;

    if (Math.abs(delta) > threshold) {
      if (delta > 0) {
        goToMobileSlide(mobileIndex + 1);
      } else {
        goToMobileSlide(mobileIndex - 1);
      }
    }

    touchStartX.current = null;
  };

  const handlePaginationClick = (index) => {
    pauseAutoplay();
    goToMobileSlide(index);
  };

  const getSlideClass = (index) => {
    if (index === mobileIndex) return "is-active";
    if (index === mobileIndex - 1 || index === mobileIndex + 1) {
      return "is-peek";
    }
    return "";
  };

  const trackTransform =
    carouselMetrics.step > 0
      ? `translateX(${carouselMetrics.centerOffset - mobileIndex * carouselMetrics.step}px)`
      : undefined;

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(caseStudies.length / pageSize));
  const currentPage = Math.floor(startIndex / pageSize);

  const goToPage = (page) => {
    const nextIndex = page * pageSize;
    if (nextIndex === startIndex) return;
    setAnimationClass(nextIndex > startIndex ? "slide-from-bottom" : "slide-from-top");
    setStartIndex(nextIndex);
  };

  const filterConfigs = [
    { key: "service", label: "Service", options: SERVICE_OPTIONS },
    { key: "complexity", label: "Complexity", options: COMPLEXITY_OPTIONS },
    { key: "industry", label: "Industry", options: INDUSTRY_OPTIONS },
    { key: "duration", label: "Project Duration", options: DURATION_OPTIONS },
  ];

  return (
    <div
      className={`portfolio-section ${isCarouselView ? "home-portfolio" : ""}${
        isPortfolioPage ? " portfolio-page-section" : ""
      }`}
    >
      {/* FILTER ROW - Only show if showFilters is true AND not on Homepage */}
      {showFilters && !isHomePage && (
        <div
          ref={filterRowRef}
          className="row g-0 p-0 filter-row col-lg-12"
        >
          {filterConfigs.map(({ key, label, options }) => (
            <div key={key} className="col-6 col-lg-3 position-relative">
              <button
                className={`filter-pill ${activeDropdown === key ? "active" : ""}`}
                onClick={() => toggleDropdown(key)}
              >
                <span className={key === "service" ? "text-truncate" : ""}>
                  {filters[key] || label}
                </span>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    transition: "transform 0.3s ease",
                    transform: activeDropdown === key ? "rotate(180deg)" : "rotate(0deg)",
                    color: activeDropdown === key ? "#ffffff" : "#888",
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
              {activeDropdown === key && renderDropdownList(options, key)}
            </div>
          ))}
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
                targetText={isPortfolioPage ? "Let's Connect" : "Complete List"}
              />
            </div>
          </div>

          {/* Right Column - Grid matching Our Teams */}
          <div className="col-lg-9">
            <div className={`row g-0 ${isCarouselView ? "home-desktop-grid" : ""}`}>
              {loading && !isHomePage ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="col-lg-4 col-12">
                    <div className="portfolio-card-wrapper">
                      <div className="portfolio-item">
                        <div className="portfolio-skeleton" />
                      </div>
                    </div>
                  </div>
                ))
              ) : !loading && displayedCaseStudies.length > 0 ? (
                displayedCaseStudies.map((item) => (
                  <div key={item._id} className={`col-lg-4 col-12 ${animationClass}`}>
                    <div className="portfolio-card-wrapper">
                      <Link href={`/case-study/${item.slug}`}>
                        <PortfolioItem
                          imageSrc={item.thumbnailDataUri || `${apiUrl}/api/v1/management/get-thumbnail-image/${item._id}?t=${new Date(item.updatedAt).getTime()}`}
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
            {isCarouselView && (
              <div
                className={`home-mobile-carousel-wrap${loading ? " is-loading" : ""}`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div ref={carouselRef} className="home-mobile-carousel-viewport">
                  <div
                    ref={trackRef}
                    className="home-mobile-carousel-track"
                    style={{ transform: trackTransform }}
                  >
                    {loading ? (
                      <div className="home-mobile-carousel-slide is-active">
                        <div className="portfolio-card-wrapper">
                          <div className="portfolio-item">
                            <div className="portfolio-skeleton" />
                          </div>
                        </div>
                      </div>
                    ) : mobileCaseStudies.length > 0 ? (
                      mobileCaseStudies.map((item, index) => (
                        <div
                          key={item._id}
                          className={`home-mobile-carousel-slide ${getSlideClass(index)}`}
                        >
                          <div className="portfolio-card-wrapper">
                            <Link href={`/case-study/${item.slug}`}>
                              <PortfolioItem
                                imageSrc={
                                  item.thumbnailDataUri ||
                                  `${apiUrl}/api/v1/management/get-thumbnail-image/${item._id}?t=${new Date(item.updatedAt).getTime()}`
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

                {!loading && mobileCaseStudies.length > 1 && (
                  <div className="home-mobile-pagination" role="tablist" aria-label="Case study slides">
                    {mobileCaseStudies.map((item, index) => (
                      <button
                        key={item._id}
                        type="button"
                        role="tab"
                        aria-selected={index === mobileIndex}
                        aria-label={`Go to ${item.case_study_name}`}
                        className={`home-mobile-pagination-dot ${index === mobileIndex ? "active" : ""
                          }`}
                        onClick={() => handlePaginationClick(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Pagination controls are removed since we show all on the portfolio page and a max of 6 on other pages */}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection;
