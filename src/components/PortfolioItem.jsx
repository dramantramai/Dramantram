import React, { useState } from "react";
import Image from "next/image";
import "../styles/PortfolioSection.css";

const PortfolioItem = ({ imageSrc, title, slug }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!imageSrc) return null;

  return (
    <div className="portfolio-item-container">
      <div className="portfolio-item">
        {!imageLoaded && <div className="portfolio-skeleton" />}
        <Image
          src={imageSrc}
          alt={title || "Portfolio"}
          className="portfolio-img"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setImageLoaded(true)}
          style={{
            opacity: imageLoaded ? 1 : 0,
            objectFit: "cover",
          }}
        />
        {imageLoaded && (
          <div className="overlay case-link">
            {title} <span>›</span>
          </div>
        )}
      </div>
      {imageLoaded && (
        <div className="portfolio-mobile-title">
          <span className="title-text">{title}</span>
          <span className="arrow">›</span>
        </div>
      )}
    </div>
  );
};

export default PortfolioItem;
