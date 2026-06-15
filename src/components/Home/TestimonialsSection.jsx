import React, { useState, useEffect } from "react";
import axios from "axios";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("");

  const [isPaused, setIsPaused] = useState(false);

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

  useEffect(() => {
    if (testimonials.length <= 3 || isPaused) return;

    const interval = setInterval(() => {
      setStartIndex((prevIndex) => {
        const nextIndex = prevIndex + 3;
        if (nextIndex >= testimonials.length) {
          setAnimationClass("slide-from-top");
          return 0;
        } else {
          setAnimationClass("slide-from-bottom");
          return nextIndex;
        }
      });
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length, startIndex, isPaused]);

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => Math.max(0, prev - 3));
      setAnimationClass("slide-from-top");
    }
  };

  const handleNext = () => {
    if (startIndex + 3 < testimonials.length) {
      setStartIndex((prev) => prev + 3);
      setAnimationClass("slide-from-bottom");
    }
  };

  useEffect(() => {
    if (!animationClass) return;
    const timer = setTimeout(() => {
      setAnimationClass("");
    }, 500);
    return () => clearTimeout(timer);
  }, [animationClass]);

  const visibleTestimonials = testimonials.slice(startIndex, startIndex + 3);
  const canGoUp = startIndex > 0;
  const canGoDown = startIndex + 3 < testimonials.length;

  return (
    <section 
      className="testimonial-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
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

          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={testimonial._id || index}
              className={`col-lg-3 col-md-6 col-12 testimonial-card ${animationClass}`}
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

          {/* Testimonial Controls in the rightmost empty space */}
          <div className="testimonial-controls">
            <button
              onClick={handlePrev}
              disabled={!canGoUp}
              className="testimonial-btn"
              aria-label="Previous testimonials"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 15L12 9L6 15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={!canGoDown}
              className="testimonial-btn"
              aria-label="Next testimonials"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
