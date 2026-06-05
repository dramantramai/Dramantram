import React from "react";
import LightLayout from "../components/Layout/LightLayout";
import Layout from "../components/Layout/Layout";
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
    <Layout>
      <section className="page-grid pt-5">
        <section className="contact-wrap pt-4">
          {/* CONTACT GRID & FORM*/}
          <div className="container-fluid">
            <div className="row g-0 contact-grid">
              {/* COL 1 — Intro */}
              <div className="col-12 col-lg-3 contact-panel contact-panel--intro">
                <div className="contact-panel-inner">
                  <h1 className="title">CONTACT US</h1>

                  <div className="eyebrow">Got an Idea</div>
                  <div className="subhead">Drop us a message</div>

                  <p className="muted">
                    We’re excited to work with you soon! Please drop an email
                    with your details & requirements to
                    <br />
                    <a href="mailto:hello@dramantram.com">
                      hello@dramantram.com
                    </a>
                    .
                  </p>

                  <p className="muted">
                    You can also fill this form & we’ll get back in 2 business
                    days.
                  </p>
                </div>
              </div>

              {/* COL 2 — Basic form */}
              <div className="col-12 col-lg-3 contact-panel">
                <div className="contact-panel-inner contact-panel-inner--form">
                  <label className="field">
                    <span className="label">Name</span>
                    <input className="input" placeholder="Enter Name" />
                  </label>

                  <label className="field">
                    <span className="label">Email</span>
                    <input className="input" placeholder="Enter Mail ID" />
                  </label>

                  <label className="field">
                    <span className="label">Phone Number</span>
                    <input className="input" placeholder="Enter Number" />
                  </label>

                  <label className="field">
                    <span className="label">
                      How Did You Get to Know About Us?
                    </span>
                    <select className="input select">
                      <option>Select option</option>
                      <option>Google</option>
                      <option>LinkedIn</option>
                      <option>Referral</option>
                    </select>
                  </label>

                  <label className="field">
                    <span className="label">Your Message</span>
                    <textarea
                      className="input textarea"
                      placeholder="Type your message here"
                      rows={3}
                    />
                  </label>
                </div>
              </div>

              {/* COL 3 — Services */}
              <div className="col-12 col-lg-3 contact-panel">
                <div className="contact-panel-inner">
                  <h3 className="q-title">
                    What Services Do <br /> You Need?*
                  </h3>

                  <ul className="radio-list">
                    <li className="radio-row">
                      <span className="line" />
                      <label>
                        <input type="checkbox" name="service" defaultChecked />
                        <span>Branding</span>
                      </label>
                      {/* <span className="dot" /> */}
                    </li>

                    <li className="radio-row">
                      <span className="line" />
                      <label>
                        <input type="checkbox" name="service" />
                        <span>Animation</span>
                      </label>
                    </li>

                    <li className="radio-row">
                      <span className="line" />
                      <label>
                        <input type="checkbox" name="service" />
                        <span>Live Action</span>
                      </label>
                    </li>

                    <li className="radio-row">
                      <span className="line" />
                      <label>
                        <input type="checkbox" name="service" />
                        <span>UI/UX</span>
                      </label>
                    </li>

                    <li className="radio-row">
                      <span className="line" />
                      <label>
                        <input type="checkbox" name="service" />
                        <span>Others</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>

              {/* COL 4 — Timeline + Submit */}
              <div className="col-12 col-lg-3 contact-panel contact-panel--last">
                <div className="contact-panel-inner">
                  <h3 className="q-title">
                    When Do You Need <br /> Your Product?*
                  </h3>

                  <ul className="radio-list">
                    <li className="radio-row">
                      <span className="line" />
                      <label>
                        <input type="radio" name="timeline" defaultChecked />
                        <span>ASAP</span>
                      </label>
                      {/* <span className="dot" /> */}
                    </li>

                    <li className="radio-row">
                      <span className="line" />
                      <label>
                        <input type="radio" name="timeline" />
                        <span>Within 15 days</span>
                      </label>
                    </li>

                    <li className="radio-row">
                      <span className="line" />
                      <label>
                        <input type="radio" name="timeline" />
                        <span>Within a Month</span>
                      </label>
                    </li>

                    <li className="radio-row">
                      <span className="line" />
                      <label>
                        <input type="radio" name="timeline" />
                        <span>Not Sure</span>
                      </label>
                    </li>
                  </ul>

                  <button type="button" className="submit-bar">
                    <span>Submit</span>
                    <span className="chev">›</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Office Locations */}
          <section className="offices-wrap">
            <div className="container-fluid office-align">
              {locations.map((loc, i) => (
                <div
                  className="row g-0 office-row align-items-center"
                  key={loc.city}
                >
                  {/* Col 1 — Image */}
                  <div className="col-12 col-lg-3 office-col office-col--image">
                    <div
                      className={`img-frame ${
                        loc.featured ? "is-featured" : ""
                      }`}
                    >
                      <img src={loc.image} alt={`${loc.city} office`} />
                    </div>
                  </div>

                  {/* Col 2 — City */}
                  <div className="col-12 col-lg-3 office-col">
                    <h2 className="city">{loc.city}</h2>
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
    </Layout>
  );
};

export default Contact;
