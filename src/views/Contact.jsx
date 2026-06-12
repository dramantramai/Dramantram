import React from "react";
import LightLayout from "../components/Layout/LightLayout";
import "../styles/ContactPage.css";

const Contact = () => {
  const locations = [
    {
      city: "Delhi",
      image: "/DelhiOffice.png",
      address: `D108, 2nd Floor, 100 Feet Rd,
Chhatarpur, New Delhi, 110074`,
      email: "lkshashi@dramantram.com",
      phone: "+91 80109 73780 (LK Shashi)",
      // featured: true, // blue stroke + square
    },
    {
      city: "Lucknow",
      image: "/LucknowOffice.png",
      address: `TCG 3, Summit Building, 12 Floor,
Gomti Nagar, Lucknow, Uttar Pradesh 226010`,
      email: "ankit@dramantram.com",
      phone: "+91 89395 71959 (Ankit Raj)",
    },
    {
      city: "Hyderabad",
      image: "/USOffice.png",
      address: `2nd floor, Vaishnavi's Cynosure, Lorven Smart Spaces, near Reliance Digital, Gachibowli, Hyderabad, Telangana 500032`,
      email: "hello@dramantram.com",
      phone: "+91 95995 71599 (Ankit Raj)",
    },
  ];

  return (
    <LightLayout>
      <section className="page-grid">
        <section className="contact-wrap">
          {/* Office Locations */}
          <section className="offices-wrap">
            <div className="container-fluid office-align">
              {locations.map((loc, i) => (
                <div className="row g-0 office-row" key={loc.city}>
                  {/* Col 1 — Image */}
                  <div className="col-12 col-lg-3 office-col office-col--image">
                    <div
                      className={`img-frame ${loc.featured ? "is-featured" : ""
                        }`}
                    >
                      <img src={loc.image} alt={`${loc.city} office`} />
                    </div>
                  </div>

                  {/* Col 2 — City */}
                  <div className="col-12 col-lg-3 office-col">
                    <h2 className="city inter-bold">{loc.city}</h2>
                  </div>

                  {/* Col 3 — Address */}
                  <div className="col-12 col-lg-3 office-col">
                    <p className="address">{loc.address}</p>
                  </div>

                  {/* Col 4 — Contact */}
                  <div className="col-12 col-lg-3 office-col">
                    <p className="contact">
                      Email: <a href={`mailto:${loc.email}`}>{loc.email}</a>
                      <br />
                      Phone: {loc.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      </section>
    </LightLayout>
  );
};

export default Contact;
