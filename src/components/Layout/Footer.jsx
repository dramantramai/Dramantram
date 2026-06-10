import React, { useState } from "react";
import "../../styles/Footer.css";
import logo from "/logos/DM_White.png";
import axios from "axios";
import { toast } from "react-hot-toast";
import linkedinIcon from "../../assets/social/linkedin.png";
import instagramIcon from "../../assets/social/instagram.png";
import xIcon from "../../assets/social/twitter.png";
import behanceIcon from "../../assets/social/behance.png";

const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/dramantram/posts/?feedView=all",
  instagram: "https://www.instagram.com/dramantram/",
  x: "https://x.com/Dramantram",
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
    key: "x",
    label: "X",
    href: SOCIAL_LINKS.x,
    src: xIcon,
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
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("referrer", referrer);
      formData.append("message", message);
      services.forEach((s) => formData.append("services", s));
      formData.append("duration", duration);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/management/send-inquiry`,
        formData
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
            <div className="content-wrapper">
              <h1 className="have-a-project-text">HAVE A PROJECT IN MIND?</h1>
              <div className="footer-brand-block">
                <img src={logo} alt="Mask Logo" className="footer-logo mt-4" />
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
          </div>

          {/* Middle Column: Form */}
          <div className="col-md-3 footer-col">
            <div className="content-wrapper">
              <form className="form-contact" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
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
                  <label className="form-label">Email</label>
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
            <div className="content-wrapper">
              <h5 className="mb-3 services-head">What Services Do <br />You Need?</h5>
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
                      checked={services.includes(service)}
                      onChange={() => handleServiceChange(service)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Duration Column */}
          <div className="col-md-3 checkbox-column footer-col">
            <div className="content-wrapper">
              <h5 className="mb-3 duration-head">When Do you Need<br />It?</h5>
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
                        checked={duration === time}
                        onChange={() => setDuration(time)}
                      />
                    </div>
                  )
                )}
              </div>
              <button
                type="button"
                className="btn btn-warning w-100 submit-button"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
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
              <Link className="employee-login-btn" to="/login">
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
