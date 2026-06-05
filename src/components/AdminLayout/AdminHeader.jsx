import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/images/header.png";
import "../../styles/Header.css";
import { UseAuth } from "../../context/auth";
import toast from "react-hot-toast";

const AdminHeader = () => {
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0); // Using useRef to store the last scroll position
  const [auth, setAuth] = UseAuth();

  // --- LOGOUT FUNCTIONALITY ---
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset; // Get the current scroll position
      setScrollY(currentScrollY); // Store the current scroll position

      if (currentScrollY <= 0) {
        document.querySelector("nav")?.classList.remove("scroll-up");
      }

      if (
        currentScrollY > lastScrollY.current &&
        !document.querySelector("nav")?.classList.contains("scroll-down")
      ) {
        // Scrolling down
        document.querySelector("nav")?.classList.add("scroll-down");
        document.querySelector("nav")?.classList.remove("scroll-up");
      }

      if (
        currentScrollY < lastScrollY.current &&
        document.querySelector("nav")?.classList.contains("scroll-down")
      ) {
        // Scrolling up
        document.querySelector("nav")?.classList.remove("scroll-down");
        document.querySelector("nav")?.classList.add("scroll-up");
      }

      lastScrollY.current = currentScrollY; // Update last scroll position
    };

    // Adding the event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Cleanup: Removing the event listener when the component unmounts
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
            <li className="nav-item">
              <Link className="nav-link" to="/internal/case-studies">
                Case-Studies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/internal/create-case-study">
                Create Case-Study
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={handleLogout}
                className="nav-link"
                to="/"
                style={{ cursor: "pointer" }}
              >
                Logout
              </Link>
            </li>
          </ul>
          <Link className="btn" to="">
            Hello - <strong>{auth?.user?.name}</strong>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
