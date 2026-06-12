import React, { useState } from "react";
import Link from "next/link";
import "../../styles/Footer.css";
const logo = "/logos/DM_White.png";
import axios from "axios";
import { toast } from "react-hot-toast";
const linkedinIcon = "/social/linkedin.png";
const instagramIcon = "/social/instagram.png";
const youtubeIcon = "/social/youtube.png";
const behanceIcon = "/social/behance.png";

const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/dramantram/posts/?feedView=all",
  instagram: "https://www.instagram.com/dramantram/",
  youtube:"https://www.youtube.com/@Dramantram",
  behance: "https://www.behance.net/dramantram",
};

const socialIcons = [
  {
    key: "linkedin",
    label: "LinkedIn",
    href: SOCIAL_LINKS.linkedin,
    src: linkedinIcon,
  },
  {
    key: "instagram",
    label: "Instagram",
    href: SOCIAL_LINKS.instagram,
    src: instagramIcon,
  },
  {
    key: "youtube",
    label: "Youtube",
    href: SOCIAL_LINKS.youtube,
    src: youtubeIcon,
  },
  {
    key: "behance",
    label: "Behance",
    href: SOCIAL_LINKS.behance,
    src: behanceIcon,
  },
];

const Footer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [referrer, setReferrer] = useState("");
  const [message, setMessage] = useState("");
  const [services, setServices] = useState([]);
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  const handleServiceChange = (serviceName) => {
    if (services.includes(serviceName)) {
      setServices(services.filter((s) => s !== serviceName));
    } else {
      setServices([...services, serviceName]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Name and Email are required");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/v1/management/send-inquiry`,
        { name, email, phone, referrer, message, services, duration }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Inquiry sent successfully!");
        setName("");
        setEmail("");
        setPhone("");
        setReferrer("");
        setMessage("");
        setServices([]);
        setDuration("");
      } else {
        toast.error(res.data.message || "Failed to send inquiry");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to submit. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer-section text-white">
      <div className="">
        {/* ADDED class 'footer-row-grid' here. This ensures lines move WITH the columns. */}
        <div className="row align-items-start footer-row-grid">
          {/* Left Column */}
          <div className="col-md-3 footer-col">
            <div className="content-wrapper footer-left-wrap">
              <h2 className="have-a-project-text russo-one-regular">HAVE A PROJECT IN MIND?</h2>
              <img src={logo} alt="Mask Logo" className="footer-logo" />
              <div className="footer-social">
                {socialIcons.map(({ key, label, href, src }) => (
                  <a
                    key={key}
                    href={href}
                    className="footer-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    <img src={src} alt="" className="footer-social-icon" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column: Form */}
          <div className="col-md-3 footer-col">
            <div className="content-wrapper">
              <form className="form-contact" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name <span style={{color:"red"}}>*</span></label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="form-control name-form"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email <span style={{color:"red"}}>*</span></label>
                  <input
                    type="email"
                    placeholder="Enter Mail ID"
                    className="form-control form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Enter Number"
                    className="form-control form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    How Did You Get to Know About Us?
                  </label>
                  <select
                    className="form-select"
                    value={referrer}
                    onChange={(e) => setReferrer(e.target.value)}
                  >
                    <option value="" disabled hidden>Select option</option>
                    <option value="Google">Google Search</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Recommendation">Recommendation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Your Message</label>
                  <textarea
                    rows={3}
                    placeholder="Type your message here"
                    className="form-control form-textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
              </form>
            </div>
          </div>

          {/* Services Column */}
          <div className="col-md-3 checkbox-column footer-col">
            <div className="content-wrapper footer-options-wrap">
              <h4 className="footer-options-head inter-bold">
                What Services Do <br />
                You Need?
              </h4>
              <div className="footer-options-list">
                {[
                  "Branding",
                  "Animation",
                  "Live Action",
                  "UI/UX",
                  "Others",
                ].map((service) => {
                  const isSelected = services.includes(service);
                  return (
                    <label
                      key={service}
                      htmlFor={service}
                      className={`footer-option-row${isSelected ? " is-selected" : ""}`}
                    >
                      <span className="footer-option-accent" aria-hidden="true" />
                      <span className="footer-option-content">
                        <span className="footer-option-label">{service}</span>
                        <input
                          type="checkbox"
                          name="services"
                          id={service}
                          className="footer-option-input"
                          checked={isSelected}
                          onChange={() => handleServiceChange(service)}
                        />
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Duration Column */}
          <div className="col-md-3 checkbox-column footer-col">
            <div className="content-wrapper footer-options-wrap">
              <h4 className="footer-options-head inter-bold">
                When Do You Need <br />
                Your Product?
              </h4>
              <div className="footer-options-list">
                {["ASAP", "Within 15 days", "Within a Month", "Not Sure"].map(
                  (time) => {
                    const isSelected = duration === time;
                    return (
                      <label
                        key={time}
                        htmlFor={time}
                        className={`footer-option-row${isSelected ? " is-selected" : ""}`}
                      >
                        <span className="footer-option-accent" aria-hidden="true" />
                        <span className="footer-option-content">
                          <span className="footer-option-label">{time}</span>
                          <input
                            type="radio"
                            name="duration"
                            id={time}
                            className="footer-option-input"
                            checked={isSelected}
                            onChange={() => setDuration(time)}
                          />
                        </span>
                      </label>
                    );
                  },
                )}
              </div>
              <button
                type="button"
                className="footer-submit-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                <span className="footer-submit-text">
                  {loading ? "Submitting..." : "Submit"}
                </span>
                <span className="footer-submit-chev" aria-hidden="true">
                  ›
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Employee Access Section
        <div className="employee-access text-center mt-5 pt-4 border-top border-secondary">
          <div className="row justify-content-center">
            <div className="col-auto">
              <p className="mb-1 emp-access-text">Already working with us?</p>
            </div>
            <div className="col-auto">
              <Link className="employee-login-btn" href="/login">
                Login as Admin
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
