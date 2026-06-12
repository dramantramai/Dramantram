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

const PortfolioSection = ({ showFilters = true, isHomePage = false }) => {
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
        filters
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

    // B. If on Portfolio Page, check if filters are active
    const hasActiveFilters = Object.values(filters).some((val) => val !== "");

    if (hasActiveFilters) {
      filterResults();
    } else {
      // If no filters are active, fetch all
      getCaseStudies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, isHomePage]);

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
          All {category.charAt(0).toUpperCase() + category.slice(1)}
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

  // Limit case studies to 6 items if on homepage (for a 3x2 grid), otherwise show all matching case studies
  const displayedCaseStudies = isHomePage ? caseStudies.slice(0, 6) : caseStudies;

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
              <span>{filters.duration || "Duration"}</span>
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
              <h1 className="portfolio-title raleway-semibold">
                Portfolio & Case Studies
              </h1>
              <p className="portfolio-description">
                {"We're brand builders at heart, creators by design, tech"}
                {" enthusiasts in practice, and integrated at our core."}
              </p>
              <GlitchButton
                href="/contact"
                className="connect-link"
                targetText="Let's Connect"
              />
            </div>
          </div>

          {/* Right Column - Grid matching Our Teams */}
          <div className="col-lg-9">
            <div className="row g-0">
              {loading ? (
                <div className="col-12 text-center text-white py-5">
                  <h5>Loading...</h5>
                </div>
              ) : displayedCaseStudies.length > 0 ? (
                displayedCaseStudies.map((item) => (
                  <div key={item._id} className="col-md-6 col-lg-4">
                    <div className="portfolio-card-wrapper">
                      <Link href={`/case-study/${item.slug}`}>
                        <PortfolioItem
                          imageSrc={`${apiUrl}/api/v1/management/get-thumbnail-image/${item._id}`}
                          title={item.case_study_name}
                          slug={item.slug}
                        />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center text-white py-5">
                  <p>No case studies found matching these filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection;
