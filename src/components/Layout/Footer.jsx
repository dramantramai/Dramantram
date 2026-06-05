import React from "react";
import "../../styles/Footer.css";
import logo from "../../assets/images/biglogo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-section text-white">
      <div className="">
        {/* ADDED class 'footer-row-grid' here. This ensures lines move WITH the columns. */}
        <div className="row align-items-start footer-row-grid">
          {/* Left Column */}
          <div className="col-md-3 footer-col">
            <div className="content-wrapper">
              <h1 className="have-a-project-text">HAVE A PROJECT IN MIND?</h1>
              <img src={logo} alt="Mask Logo" className="footer-logo mt-4" />
            </div>
          </div>

          {/* Middle Column: Form */}
          <div className="col-md-3 footer-col">
            <div className="content-wrapper">
              <form className="form-contact">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="form-control name-form"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    placeholder="Enter Mail ID"
                    className="form-control form-input"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Enter Number"
                    className="form-control form-input"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    How Did You Get to Know About Us?
                  </label>
                  <select className="form-select">
                    <option>Select option</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Your Message</label>
                  <textarea
                    rows={3}
                    placeholder="Type your message here"
                    className="form-control form-textarea"
                  ></textarea>
                </div>
              </form>
            </div>
          </div>

          {/* Services Column */}
          <div className="col-md-3 checkbox-column footer-col">
            <div className="content-wrapper">
              <h5 className="mb-3 services-head">What Services Do You Need?</h5>
              <div className="mb-4">
                {[
                  "Branding",
                  "Animation",
                  "Live Action",
                  "UI/UX",
                  "Others",
                ].map((service) => (
                  <div
                    key={service}
                    className="d-flex justify-content-between option-row"
                  >
                    <label htmlFor={service} className="form-label">
                      {service}
                    </label>
                    <input
                      type="checkbox"
                      name="services"
                      id={service}
                      className="form-check-input"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Duration Column */}
          <div className="col-md-3 checkbox-column footer-col">
            <div className="content-wrapper">
              <h5 className="mb-3 duration-head">When Do you Need It?</h5>
              <div className="mb-4">
                {["ASAP", "Within 15 Days", "Within a Month", "Not Sure"].map(
                  (time) => (
                    <div
                      key={time}
                      className="d-flex justify-content-between option-row"
                    >
                      <label htmlFor={time} className="form-label">
                        {time}
                      </label>
                      <input
                        type="radio"
                        name="duration"
                        id={time}
                        className="form-check-input"
                      />
                    </div>
                  )
                )}
              </div>
              <button
                type="button"
                className="btn btn-warning w-100 submit-button"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Employee Access Section */}
        <div className="employee-access text-center mt-5 pt-4 border-top border-secondary">
          <div className="row justify-content-center">
            <div className="col-auto">
              <p className="mb-1 emp-access-text">Already working with us?</p>
            </div>
            <div className="col-auto">
              <Link className="employee-login-btn" to="/login">
                Login as Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
