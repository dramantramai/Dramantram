import React from "react";
import { serviceClientLogos } from "../data/serviceClientLogos";

const DEFAULT_LOGOS_TITLE =
  "Proud to work with the biggest brands in India & Abroad";

const ServicesLogosRow = ({
  serviceColumns,
  clients = serviceClientLogos,
  logosTitle = DEFAULT_LOGOS_TITLE,
}) => {
  return (
    <section className="row gx-0 align-items-start lower-section">
      <div className="col-lg-6 px-4 px-lg-5">
        <div className="row row-cols-1 row-cols-md-2 g-4 service-lists">
          {serviceColumns.map((items, columnIndex) => (
            <div key={columnIndex} className="col">
              <ul className="service-list inter-light">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="col-lg-6 px-4 px-lg-5">
        <p className="logos-title mb-4 raleway-semibold">{logosTitle}</p>
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
