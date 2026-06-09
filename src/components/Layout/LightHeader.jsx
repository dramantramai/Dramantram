import React, { useState } from "react";
import "../../styles/LightHeader.css";
import { Link } from "react-router-dom";

const LightHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <nav className="navbar navbar-light navbar-expand-lg py-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="DM_LOGO_Dark.png"
              alt="Logo"
              width="250"
              height="22"
              className="d-inline-block align-text-top"
            />
          </a>
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
            <ul className="navbar-nav m-auto mb-2 mb-lg-0 ">
              {/* SERVICES DROPDOWN START */}
              <li
                className="nav-item dropdown"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <a
                  className="nav-link-light nav-link dropdown-toggle"
                  to="/branding"
                  role="none"
                  aria-expanded={isDropdownOpen}
                >
                  <span className="nav-link-label">Services</span>
                </a>
                <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                  <li>
                    <Link className="dropdown-item" to="/services/branding">
                      <span className="dropdown-item-label">Branding</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/services/animated-videos"
                    >
                      <span className="dropdown-item-label">Animated Videos</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/services/live-action">
                      <span className="dropdown-item-label">Live Action</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/services/ui-ux">
                      <span className="dropdown-item-label">UI/UX</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/services/experiential-lab"
                    >
                      <span className="dropdown-item-label">Experiential Lab</span>
                    </Link>
                  </li>
                </ul>
              </li>
              {/* SERVICES DROPDOWN END */}
              <li className="nav-item">
                <a className="nav-link-light nav-link" href="/portfolio">
                  Portfolio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link-light nav-link" href="/about">
                  About Us
                </a>
              </li>
            </ul>
            <Link className="btn" to="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default LightHeader;
