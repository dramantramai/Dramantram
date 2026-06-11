import React, { useState, useEffect, useRef } from "react";
import "../../styles/LightHeader.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavContactButton from "../NavContactButton";

const LINKEDIN_URL = "https://www.linkedin.com/company/dramantram/jobs/";

const LightHeader = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const isContactPage = pathname === "/contact";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      setScrollY(currentScrollY);

      const nav = document.querySelector("nav.navbar-light");
      if (!nav) return;

      if (currentScrollY <= 0) {
        nav.classList.remove("scroll-up");
        nav.classList.remove("scroll-down");
      }

      if (
        currentScrollY > lastScrollY.current &&
        !nav.classList.contains("scroll-down")
      ) {
        nav.classList.add("scroll-down");
        nav.classList.remove("scroll-up");
      }

      if (
        currentScrollY < lastScrollY.current &&
        nav.classList.contains("scroll-down")
      ) {
        nav.classList.remove("scroll-down");
        nav.classList.add("scroll-up");
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`navbar navbar-light navbar-expand-lg py-3 ${
          scrollY > 50 ? "navbar-scrolled" : ""
        }`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <img
              src="/DM_LOGO_Dark.png"
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
            data-bs-target="#navbarLightContent"
            aria-controls="navbarLightContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarLightContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              {/* SERVICES DROPDOWN */}
              <li
                className="nav-item dropdown"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <a
                  className="nav-link-light nav-link dropdown-toggle"
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
                    <Link className="dropdown-item" href="/services/animated-videos">
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
                    <Link className="dropdown-item" href="/services/experiential-lab">
                      <span className="dropdown-item-label">Experiential Lab</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link-light nav-link" href="/portfolio">
                  Portfolio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link-light nav-link" href="/about">
                  About Us
                </Link>
              </li>
            </ul>
            {isContactPage ? (
              <NavContactButton
                variant="light"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Us
              </NavContactButton>
            ) : (
              <NavContactButton variant="light" href="/contact">
                Contact Us
              </NavContactButton>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default LightHeader;
