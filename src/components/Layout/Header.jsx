import "../../styles/Header.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/images/header.png";
import GlitchButton from "../GlitchButton";

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      setScrollY(currentScrollY);

      const nav = document.querySelector("nav");

      if (currentScrollY <= 0) {
        nav.classList.remove("scroll-up");
      }

      if (
        currentScrollY > lastScrollY.current &&
        !nav.classList.contains("scroll-down")
      ) {
        // Scrolling down
        nav.classList.add("scroll-down");
        nav.classList.remove("scroll-up");
      }

      if (
        currentScrollY < lastScrollY.current &&
        nav.classList.contains("scroll-down")
      ) {
        // Scrolling up
        nav.classList.remove("scroll-down");
        nav.classList.add("scroll-up");
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top py-3`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Logo"
            width="250"
            height="22"
            className="d-inline-block align-text-top"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            {/* SERVICES DROPDOWN START */}
            <li
              className="nav-item dropdown"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <a
                className="nav-link dropdown-toggle"
                to="/branding"
                role="none"
                aria-expanded={isDropdownOpen}
              >
                Services
              </a>
              <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                <li>
                  <Link className="dropdown-item" to="/services/branding">
                    Branding
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/services/animated-videos"
                  >
                    Animated Videos
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/services/live-action">
                    Live Action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/services/ui-ux">
                    UI/UX
                  </Link>
                </li>
              </ul>
            </li>
            {/* SERVICES DROPDOWN END */}

            <li className="nav-item">
              <Link className="nav-link" to="/portfolio">
                Portfolio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
          </ul>
          <GlitchButton className="btn" href="/contact" targetText="Contact Us">
            <a href="/contact">Contact Us</a>
          </GlitchButton>
        </div>
      </div>
    </nav>
  );
};

export default Header;
