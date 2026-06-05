import React, { useState, useEffect } from "react";
import PortfolioItem from "./PortfolioItem";
import "../styles/PortfolioSection.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

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

const PortfolioFilters = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for Dropdowns
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [filters, setFilters] = useState({
    service: "",
    complexity: "",
    industry: "",
    duration: "",
  });

  // API URL helper
  const apiUrl = import.meta.env.VITE_API_URL;

  // 1. Get All Data (Initial Load)
  const getAllCaseStudies = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/v1/management/get-case-studies`
      );
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

  // 2. Filter Data (Called when filters change)
  const filterResults = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        // `http://localhost:5000/api/v1/management/filter-case-studies`,
        `${apiUrl}/api/v1/management/filter-case-studies`,
        filters // Sends { service, complexity, industry, duration }
      );

      if (data?.success) {
        setCaseStudies(data.caseStudies);
      }
    } catch (error) {
      console.log(error);
      // Optional: Only show error toast if it's a real failure, not just 0 results
      toast.error("Error filtering results");
    } finally {
      setLoading(false);
    }
  };

  // 3. Initial Load Lifecycle
  useEffect(() => {
    getAllCaseStudies();
  }, []);

  // 4. Filter Lifecycle: Triggers whenever 'filters' state changes
  useEffect(() => {
    // Check if any filter actually has a value
    const hasActiveFilters = Object.values(filters).some((val) => val !== "");

    if (hasActiveFilters) {
      filterResults();
    } else {
      // If user cleared all filters, revert to the "Get All" API to be safe
      // (Or you can just call filterResults() if your backend handles empty objects)
      getAllCaseStudies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Toggle Dropdown Handler
  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
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
        className="dropdown-menu show"
        style={{
          position: "absolute",
          zIndex: 1000,
          width: "100%",
          maxHeight: "300px",
          overflowY: "auto",
          marginTop: "5px",
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "8px",
          listStyle: "none",
          padding: "0",
          textAlign: "left",
        }}
      >
        {/* Option to clear specific filter */}
        <li
          onClick={() => handleSelect(category, "")}
          style={{
            padding: "8px 12px",
            cursor: "pointer",
            borderBottom: "1px solid #eee",
            color: "#888",
            fontSize: "0.9rem",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          All {category.charAt(0).toUpperCase() + category.slice(1)}
        </li>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleSelect(category, option)}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              borderBottom: "1px solid #eee",
              color: "#8a8a8aff",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            {option}
          </li>
        ))}
      </ul>
    );
  };

  // Split data for the layout requirements
  const row1Data = caseStudies.slice(0, 3);
  const row2Data = caseStudies.slice(3);

  return (
    <div className="row g-0 p-0 filter-row col-md-12">
      {/* SERVICE FILTER */}
      <div className="col-6 col-md-3 position-relative">
        <button
          className={`filter-pill ${
            activeDropdown === "service" ? "active" : ""
          }`}
          onClick={() => toggleDropdown("service")}
        >
          {/* Show selected value or default label */}
          <span className="text-truncate">{filters.service || "Service"}</span>
          <span className="caret">ˇ</span>
        </button>
        {activeDropdown === "service" &&
          renderDropdownList(SERVICE_OPTIONS, "service")}
      </div>

      {/* COMPLEXITY FILTER */}
      <div className="col-6 col-md-3 position-relative">
        <button
          className={`filter-pill ${
            activeDropdown === "complexity" ? "active" : ""
          }`}
          onClick={() => toggleDropdown("complexity")}
        >
          <span>{filters.complexity || "Complexity"}</span>
          <span className="caret">ˇ</span>
        </button>
        {activeDropdown === "complexity" &&
          renderDropdownList(COMPLEXITY_OPTIONS, "complexity")}
      </div>

      {/* INDUSTRY FILTER */}
      <div className="col-6 col-md-3 position-relative">
        <button
          className={`filter-pill ${
            activeDropdown === "industry" ? "active" : ""
          }`}
          onClick={() => toggleDropdown("industry")}
        >
          <span>{filters.industry || "Industry"}</span>
          <span className="caret">ˇ</span>
        </button>
        {activeDropdown === "industry" &&
          renderDropdownList(INDUSTRY_OPTIONS, "industry")}
      </div>

      {/* DURATION FILTER */}
      <div className="col-6 col-md-3 position-relative">
        <button
          className={`filter-pill ${
            activeDropdown === "duration" ? "active" : ""
          }`}
          onClick={() => toggleDropdown("duration")}
        >
          <span>{filters.duration || "Duration"}</span>
          <span className="caret">ˇ</span>
        </button>
        {activeDropdown === "duration" &&
          renderDropdownList(DURATION_OPTIONS, "duration")}
      </div>
    </div>
  );
};

export default PortfolioFilters;
