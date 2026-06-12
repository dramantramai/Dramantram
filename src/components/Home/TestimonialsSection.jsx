import React, { useState, useEffect } from "react";
import axios from "axios";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await axios.get("/api/v1/management/testimonial");
        if (data?.success) {
          setTestimonials(data.testimonials);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="testimonial-section">
      <div className="container-fluid">
        <div className="row g-0">
          <div className="col-lg-3 col-md-6 col-12 left-section">
            <div className="content-wrapper">
              <h2 className="main-heading russo-one-regular">
                THE CENTRE
                <br /> OF OUR
                <br /> UNIVERSE
              </h2>
              <p className="subtitle">
                More than who we are, what our client
                partner says, defines us!
              </p>
              <p className="description">
                See how businesses like yours found
                solutions with Dramantram
              </p>
              <div className="quote-marks">
                <img src="/Quote Symbol.png" alt="quotes" loading="lazy" />
              </div>
            </div>
          </div>

          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial._id || index}
              className="col-lg-3 col-md-6 col-12 testimonial-card"
            >
              <div className="card-content">
                <h3 className="card-name fw-semibold raleway-semibold">
                  {testimonial.firstName}
                </h3>
                <h3 className="card-name fw-semibold raleway-semibold">
                  {testimonial.lastName}
                </h3>
                <p className="card-role">{testimonial.post}</p>
                <p className="card-company">{testimonial.company}</p>
                <div className="card-image-wrapper">
                  <div className="card-image">
                    <img
                      src={`/api/v1/management/testimonial/${testimonial._id}/image`}
                      alt={`${testimonial.firstName} ${testimonial.lastName}`}
                      loading="lazy"
                    />
                  </div>
                </div>
                <p className="card-quote">{testimonial.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

