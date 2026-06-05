import React from "react";
import Layout from "../components/Layout/Layout";
import "../styles/About.css";
import GlitchButton from "../components/GlitchButton";

const About = () => {
  const teamMembers = [
    {
      name: "Kundan Kumar",
      role: "Co-Founder & Anti-CEO",
      image: "/team/Kundan.png",
    },
    {
      name: "Ankit Raj",
      role: "Co-Founder & Board Member",
      image: "/team/Ankit.png",
    },
    {
      name: "Rupam Biswas",
      role: "Co-Founder & Creative Head",
      image: "/team/Rupam.png",
    },
    {
      name: "LK Shashi",
      role: "Co-Founder & CTO",
      image: "/team/Lalan.png",
    },
    {
      name: "Harsh Bansal",
      role: "Head Visual Media",
      image: "/team/Harsh.png",
    },
    {
      name: "Tanishtha Katta",
      role: "Unit Lead - Graphic & Animation",
      image: "/team/Tanishtha.png",
    },
    {
      name: "Bhavesh Bhatia",
      role: "Unit Lead - Design",
      image: "/team/Bhavesh.png",
    },
    {
      name: "Abdul Rahman",
      role: "Video Editor",
      image: "/team/Abdul.png",
    },
    {
      name: "Mohammad Shadab",
      role: "Lead - 2D/3D Design & Animation",
      image: "/team/Shadab.png",
    },
    {
      name: "Ayushi Bajpai",
      role: "Graphic Designer",
      image: "/team/Ayushi.png",
    },
    {
      name: "Zainab Khan",
      role: "Graphic Designer",
      image: "/team/Zainab.png",
    },
    {
      name: "Shivam Sharma",
      role: "Graphic & Animation",
      image: "/team/Shivam.png",
    },
    {
      name: "Sushant Sino",
      role: "Junior Graphic Designer",
      image: "/team/Shushant.png",
    },
  ];

  return (
    <Layout>
      {/* Intro section */}
      <section className="discussion-container container-fluid">
        <div className="row">
          {/* Left part */}
          <div className="col-lg-4 discussion-left">
            <h2>
              Now Discussing <br /> Entrepreneurship
            </h2>
            <p>
              We are on a mission to "Help <br /> organizations become a better
              brand <br /> by curating meaningful visual stories."
            </p>
            <p>
              As smart one says, "a plan is only as <br /> good as its
              execution".
            </p>
            <a className="btn-connect-about" href="/contact">
              Let's Connect <span>›</span>
            </a>
          </div>

          {/* Right part (Image) */}
          <div className="col-lg-8 discussion-right">
            <img src="about.png" alt="Entrepreneurship discussion" />
          </div>
        </div>
      </section>

      {/* Our Philosophies */}
      <section className="philosophies-container container-fluid">
        <div className="row">
          {/* Left Section */}
          <div className="col-lg-6 col-12 philosophies-left">
            <h2>
              Our
              <br /> Philosophies
            </h2>
            <div className="philosophies-text">
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
              interactions and project executions. These philosophies are –
            </p>
          </div>

          <div className="col-lg-3 col-12 philosophies-right-2">
            <p className="phy-p-r">
              We also call these 5 philosophies our lenses.
            </p>
            <p className="phy-p-rr">
              All our deliverables are scanned through these 5 lenses.
            </p>
          </div>
        </div>
      </section>

      {/* Teams Section */}
      <div className="team-section">
        <div className="container-fluid container-fluid-custom">
          <div className="row g-0">
            {/* Left Sidebar */}
            <div className="col-lg-3 team-sidebar">
              <div className="sidebar-content">
                <h1 className="team-title">
                  Our
                  <br /> {""}
                  Team
                </h1>
                <p className="team-description">
                  It's not how happy we look, but what we do that defines us.
                  From our Batman Fan
                </p>
                <p className="team-description">
                  Along with relentless passive support from chai, our desi
                  Avengers have empowered multiple startups and enterprises
                  around the world with our services, SINCE 2015.
                </p>
                <a href="#" className="join-team-link">
                  Join Our Talented Team
                  <span className="ab-arrow">›</span>
                </a>
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
                          src={member.image}
                          alt={member.name}
                          className="team-image"
                        />
                      </div>
                      <div className="team-info">
                        <h3 className="member-name">{member.name}</h3>
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
    </Layout>
  );
};

export default About;
