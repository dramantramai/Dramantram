// src/components/PortfolioItem.jsx

import React from "react";
import { Card } from "react-bootstrap";
import Link from "next/link";
import "../styles/PortfolioSection.css";

const PortfolioItem = ({ imageSrc, title, slug }) => {
  return (
    <div className="portfolio-item">
      <img src={imageSrc} alt="Portfolio" className="portfolio-img" />
      <div className="overlay case-link">
        {/* <button className=""> */}
        {title} <span>›</span>
        {/* </button> */}
      </div>
    </div>
  );
};

export default PortfolioItem;
