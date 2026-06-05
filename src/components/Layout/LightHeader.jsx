import React from "react";
import "../../styles/LightHeader.css";
import { Link } from "react-router-dom";

const LightHeader = () => {
  return (
    <div>
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
              <li className="nav-item">
                <a className="nav-link-light nav-link" href="/academy">
                  Academy
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link-light nav-link" href="/services">
                  Services
                </a>
              </li>
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
              <li className="nav-item">
                <a className="nav-link-light nav-link" href="/pricing">
                  Pricing
                </a>
              </li>
            </ul>
            <Link className="btn" to="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LightHeader;
