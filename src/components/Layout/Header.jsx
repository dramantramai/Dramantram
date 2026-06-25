import "../../styles/Header.css";
import Link from "next/link";
import NavContactButton from "../NavContactButton";
import React, { useState, useEffect, useRef } from "react";
const logo = "/images/header.png";

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const [isOpen, setIsOpen] = useState(false); // Mobile menu open/close state
  const [activeSubMenu, setActiveSubMenu] = useState(null); // null or 'services'
  const lastScrollY = useRef(0);
  const menuRef = useRef(null);
  const togglerRef = useRef(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        togglerRef.current &&
        !togglerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setActiveSubMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (isOpen) {
      body.style.overflow = "hidden";
      body.style.height = "100vh";
      html.style.overflow = "hidden";
      html.style.height = "100vh";
    } else {
      body.style.overflow = "";
      body.style.height = "";
      html.style.overflow = "";
      html.style.height = "";
    }
    return () => {
      body.style.overflow = "";
      body.style.height = "";
      html.style.overflow = "";
      html.style.height = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      setScrollY(currentScrollY);

      const nav = document.querySelector("nav");
      if (!nav) return;

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
    <nav className={`navbar navbar-expand-lg fixed-top py-3 ${scrollY > 50 ? "navbar-scrolled" : ""} ${isOpen ? "mobile-menu-open" : ""}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" href="/" onClick={() => { setIsOpen(false); setActiveSubMenu(null); }}>
          <img
            src={logo}
            alt="Logo"
            width="250"
            height="22"
            className="d-inline-block align-text-top"
          />
        </Link>
        <button
          ref={togglerRef}
          className={`navbar-toggler ${isOpen ? "open" : ""}`}
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) setActiveSubMenu(null);
          }}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="toggler-bar top-bar"></span>
          <span className="toggler-bar middle-bar"></span>
          <span className="toggler-bar bottom-bar"></span>
        </button>
        <div
          ref={menuRef}
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <div className="mobile-menu-slider-wrapper">
            <div className={`mobile-menu-slider ${activeSubMenu ? "slide-sub" : ""}`}>
              {/* Main Pane */}
              <div className="mobile-menu-pane main-pane">
                <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                  {/* SERVICES DROPDOWN (Desktop only) */}
                  <li
                    className="nav-item dropdown d-none d-lg-block"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <a
                      className="nav-link dropdown-toggle"
                      role="button"
                      aria-expanded={isDropdownOpen}
                    >
                      <span className="nav-link-label">Services</span>
                    </a>
                    <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                      <li>
                        <Link className="dropdown-item" href="/services/branding">
                          <span className="dropdown-item-label">Branding</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          href="/services/animated-videos"
                        >
                          <span className="dropdown-item-label">Animated Videos</span>
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="/services/live-action">
                          <span className="dropdown-item-label">Live Action</span>
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="/services/ui-ux">
                          <span className="dropdown-item-label">UI/UX</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          href="/services/experiential-lab"
                        >
                          <span className="dropdown-item-label">Experiential Lab</span>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* SERVICES Mobile Trigger (Mobile only) */}
                  <li className="nav-item d-lg-none">
                    <button
                      className="nav-link mobile-menu-item-btn"
                      onClick={() => setActiveSubMenu("services")}
                    >
                      <span>Services</span>
                      <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="/portfolio" onClick={() => { setIsOpen(false); setActiveSubMenu(null); }}>
                      Portfolio
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/about" onClick={() => { setIsOpen(false); setActiveSubMenu(null); }}>
                      About Us
                    </Link>
                  </li>
                </ul>
                <div className="mobile-contact-wrapper d-lg-none">
                  <NavContactButton variant="dark" to="/contact" onClick={() => { setIsOpen(false); setActiveSubMenu(null); }}>
                    Contact Us
                  </NavContactButton>
                </div>
              </div>

              {/* Services Sub-Pane (Mobile only) */}
              <div className="mobile-menu-pane sub-pane">
                <button className="mobile-menu-back-btn" onClick={() => setActiveSubMenu(null)}>
                  <svg className="back-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  <span>Services</span>
                </button>
                <ul className="navbar-nav mobile-sub-nav">
                  <li className="nav-item">
                    <Link className="nav-link" href="/services/branding" onClick={() => { setIsOpen(false); setActiveSubMenu(null); }}>
                      Branding
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/services/animated-videos" onClick={() => { setIsOpen(false); setActiveSubMenu(null); }}>
                      Animated Videos
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/services/live-action" onClick={() => { setIsOpen(false); setActiveSubMenu(null); }}>
                      Live Action
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/services/ui-ux" onClick={() => { setIsOpen(false); setActiveSubMenu(null); }}>
                      UI/UX
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/services/experiential-lab" onClick={() => { setIsOpen(false); setActiveSubMenu(null); }}>
                      Experiential Lab
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <NavContactButton variant="dark" to="/contact" className="d-none d-lg-block">
            Contact Us
          </NavContactButton>
        </div>
      </div>
    </nav>
  );
};

export default Header;
