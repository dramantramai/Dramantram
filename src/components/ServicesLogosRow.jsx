import React from "react";
import { serviceClientLogos } from "../data/serviceClientLogos";

const DEFAULT_LOGOS_TITLE =
  "Proud to work with the biggest brands in India & Abroad";

const ServicesLogosRow = ({
  serviceColumns,
  clients = serviceClientLogos,
  logosTitle = DEFAULT_LOGOS_TITLE,
  showLists = true,
}) => {
  return (
    <section className="lower-section">
      {showLists && (
        <div className="lower-section-col lower-section-col-left">
          <div className="service-lists">
            {serviceColumns.map((items, columnIndex) => (
              <div key={columnIndex} className="service-list-column">
                <ul className="service-list inter-light">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="lower-section-col lower-section-col-right">
        <p className="logos-title raleway-semibold">{logosTitle}</p>
        <div className="logos-grid">
          {clients.map((client) => (
            <div key={client.alt} className="logo-item">
              <img
                src={client.src}
                alt={client.alt}
                style={{
                  ...(client.maxWidth ? { maxWidth: client.maxWidth } : {}),
                  ...(client.maxHeight ? { maxHeight: client.maxHeight } : {}),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesLogosRow;
