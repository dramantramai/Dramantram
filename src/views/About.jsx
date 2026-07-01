import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import "../styles/About.css";
import GlitchButton from "../components/GlitchButton";
import BackgroundGlow from "../components/BackgroundGlow";

// Glow orbs for About page
const ABOUT_GLOWS = [
  // Hero (discussion) section — warm glow top-right
  { top: "-50vh", right: "10vw", size: "85vw", opacity: 0.85, blur: "80px" },
  // Team section (black bg) — bottom-left warm orb
  { top: "250vh", left: "-10vw", size: "55vw", opacity: 0.65, blur: "80px" },
  // Team section right
  { top: "320vh", right: "-15vw", size: "45vw", opacity: 0.55, blur: "80px" },
];

const ABOUT_GLOWS_MOBILE = [
  // Hero section — top-right
  { top: "-30vh", right: "0vw", size: "120vw", opacity: 0.8, blur: "70px" },
  // Philosophies section — center-left
  { top: "100vh", left: "0vw", size: "90vw", opacity: 0.6, blur: "70px" },
  // Team section — middle-right
  { top: "250vh", right: "-25vw", size: "90vw", opacity: 0.55, blur: "70px" },
  // Team section lower — bottom-left
  { top: "380vh", left: "-30vw", size: "90vw", opacity: 0.5, blur: "70px" },
];

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data } = await axios.get("/api/v1/management/team");
        if (data?.success) {
          setTeamMembers(data.teamMembers);
        }
      } catch (err) {
        console.error("Error fetching team members:", err);
      }
    };
    fetchTeam();
  }, []);


  const [isPhyIntersecting, setIsPhyIntersecting] = useState(false);
  const phyRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setIsPhyIntersecting(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (phyRef.current) {
      observer.observe(phyRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      {/* Page-level glow wrapper */}
      <div style={{ position: "relative" }}>
        <BackgroundGlow glows={ABOUT_GLOWS} mobileGlows={ABOUT_GLOWS_MOBILE} />

        {/* Intro section */}
        <section className="discussion-container container-fluid">
          <div className="row align-items-center">
            {/* Left part */}
            <div className="col-lg-3 discussion-left">
              <h2 className="raleway-semibold">
                Now Discussing <br /> Entrepreneurship
              </h2>
              <p>
                {"We are on a mission to \"Help organizations become a better brand by curating meaningful visual stories.\""}
              </p>
              <p>
                {"As smart one says, \"a plan is only as good as its execution\"."}
              </p>
              <GlitchButton
                className="btn-connect-about"
                href="/contact"
                targetText="Let's Connect"
              />
            </div>

            {/* Right part (Image) */}
            <div className="col-lg-9 discussion-right">
              <img src="/about.png" alt="Entrepreneurship discussion" />
            </div>
          </div>
        </section>

        {/* Our Philosophies */}
        <div className="philosophies-sticky-container" ref={phyRef}>
          <section className={`philosophies-container container-fluid ${isPhyIntersecting ? "philosophies-animate" : ""}`}>
            <div className="row">
              {/* Left Section */}
              <div className="col-lg-6 col-12 philosophies-left">
                <h3>
                  Our
                  <br /> Philosophies
                </h3>
                <div className="philosophies-text russo-one-regular">
                  <p>BOLD</p>
                  <p>LOCALLY GLOBAL</p>
                  <p>ESSENTIALISM</p>
                  <p>STORYTELLING</p>
                  <p>UNDP ALIGNED</p>
                </div>
              </div>

              {/* Right Section */}
              <div className="col-lg-3 col-12 philosophies-right">
                <p>
                  At Dramantram, we have laid down{" "}
                  <strong>five philosophies</strong> that act as a guiding tool for
                  our people, processes, and deliverables for every stage of our
                  interactions and project executions.
                </p>
              </div>

              <div className="col-lg-3 col-12 philosophies-right-2">
                <p className="phy-p-r fs-h4">
                  We also call these 5 philosophies our lenses.
                </p>
                <p className="phy-p-rr fs-h4">
                  All our deliverables are scanned through these 5 lenses.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Teams Section */}
        <div className="team-section">
          <div className="container-fluid container-fluid-custom">
            <div className="row g-0">
              {/* Left Sidebar */}
              <div className="col-lg-3 team-sidebar">
                <div className="sidebar-content">
                  <h2 className="team-title raleway-semibold">
                    Our
                    <br /> {""}
                    Team
                  </h2>
                  <p className="team-description">
                    {"It's not how happy we look, but what we do that defines us. From our Batman Fan."}
                  </p>
                  <p className="team-description">
                    Along with relentless passive support from chai, our desi
                    Avengers have empowered multiple startups and enterprises
                    around the world with our services, SINCE 2015.
                  </p>
                  <GlitchButton
                    className="join-team-link"
                    href="https://www.linkedin.com/company/dramantram/jobs/"
                    targetText="Join Our Talented Team"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                </div>
              </div>

              {/* Team Members Grid */}
              <div className="col-lg-9">
                <div className="row g-0">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="col-md-6 col-lg-4">
                      <div className="team-card">
                        <div className="team-image-wrapper">
                          <img
                            src={`/api/v1/management/team/${member._id}/image?t=${new Date(member.updatedAt).getTime()}`}
                            alt={member.name}
                            className="team-image"
                          />
                        </div>
                        <div className="team-info">
                          <h4 className="member-name">{member.name}</h4>
                          <p className="member-role">{member.role}</p>
                          <a href="#" className="linkedin-icon">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
