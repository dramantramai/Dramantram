// src/components/PortfolioItem.jsx

import React, { useState } from "react";
import "../styles/PortfolioSection.css";

const PortfolioItem = ({ imageSrc, title, slug }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="portfolio-item">
      {!imageLoaded && <div className="portfolio-skeleton" />}
      <img
        src={imageSrc}
        alt="Portfolio"
        className="portfolio-img"
        onLoad={() => setImageLoaded(true)}
        style={{ opacity: imageLoaded ? 1 : 0 }}
      />
      {imageLoaded && (
        <div className="overlay case-link">
          {title} <span>›</span>
        </div>
      )}
    </div>
  );
};

export default PortfolioItem;
