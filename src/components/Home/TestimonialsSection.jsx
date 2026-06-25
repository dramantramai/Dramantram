import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

const testimonialImageUrl = (id) =>
  `/api/v1/management/testimonial/${id}/image`;

const MOBILE_SLIDE_MS = 500;

const TestimonialCard = ({
  testimonial,
  className = "",
  colClass = "",
  eagerImage = false,
}) => (
  <div className={`${colClass} testimonial-card ${className}`.trim()}>
    <div className="card-content">
      <h3 className="card-name fw-semibold raleway-semibold">
        {testimonial.firstName} {testimonial.lastName}
      </h3>
      <p className="card-role">{testimonial.post}</p>
      <p className="card-company">{testimonial.company}</p>
      <div className="card-image-wrapper">
        <div className="card-image">
          <img
            src={testimonialImageUrl(testimonial._id)}
            alt={`${testimonial.firstName} ${testimonial.lastName}`}
            loading={eagerImage ? "eager" : "lazy"}
            fetchPriority={eagerImage ? "high" : "auto"}
            decoding="async"
          />
        </div>
      </div>
      <p className="card-quote">{testimonial.quote}</p>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("");
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const mobileIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const mobileAutoplayPaused = useRef(false);
  const mobileAutoplayResumeTimer = useRef(null);
  const mobileTransitionTimer = useRef(null);

  const preloadTestimonialImage = useCallback((id) => {
    if (!id) return;
    const img = new Image();
    img.src = testimonialImageUrl(id);
  }, []);

  useEffect(() => {
    mobileIndexRef.current = mobileIndex;
  }, [mobileIndex]);

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
    if (testimonials.length === 0) return;
    testimonials.forEach((t) => preloadTestimonialImage(t._id));
  }, [testimonials, preloadTestimonialImage]);

  const isMobileViewport = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767.98px)").matches;

  const pauseMobileAutoplay = useCallback((resumeMs = 8000) => {
    mobileAutoplayPaused.current = true;
    if (mobileAutoplayResumeTimer.current) {
      clearTimeout(mobileAutoplayResumeTimer.current);
    }
    mobileAutoplayResumeTimer.current = setTimeout(() => {
      mobileAutoplayPaused.current = false;
    }, resumeMs);
  }, []);

  const transitionToMobileSlide = useCallback(
    (toIndex, { pauseAutoplay = true } = {}) => {
      if (testimonials.length === 0 || isTransitioningRef.current) return;

      const next =
        ((toIndex % testimonials.length) + testimonials.length) %
        testimonials.length;

      if (next === mobileIndexRef.current) return;

      isTransitioningRef.current = true;
      if (pauseAutoplay) pauseMobileAutoplay();

      setMobileIndex(next);
      mobileIndexRef.current = next;

      if (mobileTransitionTimer.current) {
        clearTimeout(mobileTransitionTimer.current);
      }

      mobileTransitionTimer.current = setTimeout(() => {
        isTransitioningRef.current = false;
        mobileTransitionTimer.current = null;
      }, MOBILE_SLIDE_MS);
    },
    [testimonials.length, pauseMobileAutoplay]
  );

  useEffect(() => {
    if (testimonials.length <= 3 || isPaused) return;

    const interval = setInterval(() => {
      if (isMobileViewport()) return;

      setStartIndex((prevIndex) => {
        const nextIndex = prevIndex + 3;
        if (nextIndex >= testimonials.length) {
          setAnimationClass("slide-from-top");
          return 0;
        }
        setAnimationClass("slide-from-bottom");
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length, startIndex, isPaused]);

  useEffect(() => {
    if (testimonials.length <= 1) return;

    const interval = setInterval(() => {
      if (!isMobileViewport() || mobileAutoplayPaused.current) return;
      const next = (mobileIndexRef.current + 1) % testimonials.length;
      transitionToMobileSlide(next, { pauseAutoplay: false });
    }, 4500);

    return () => clearInterval(interval);
  }, [testimonials.length, transitionToMobileSlide]);

  useEffect(() => {
    return () => {
      if (mobileAutoplayResumeTimer.current) {
        clearTimeout(mobileAutoplayResumeTimer.current);
      }
      if (mobileTransitionTimer.current) {
        clearTimeout(mobileTransitionTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!animationClass) return;
    const timer = setTimeout(() => setAnimationClass(""), 500);
    return () => clearTimeout(timer);
  }, [animationClass]);

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

  const handleMobileDotClick = (index) => {
    transitionToMobileSlide(index);
  };

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
                More than who we are, what our client partner says, defines us!
              </p>
              <p className="description">
                See how businesses like yours found solutions with Dramantram
              </p>
              <div className="quote-marks">
                <img src="/Quote Symbol.png" alt="quotes" loading="lazy" />
              </div>
            </div>
          </div>

          <div className="testimonial-desktop-cards">
            {visibleTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial._id || index}
                testimonial={testimonial}
                colClass="col-lg-3 col-md-6 col-12"
                className={animationClass}
              />
            ))}
          </div>

          {testimonials.length > 0 && (
            <div className="testimonial-mobile-carousel">
              <div className="testimonial-mobile-viewport">
                <div
                  className="testimonial-mobile-track"
                  style={{
                    transform: `translate3d(-${mobileIndex * 100}%, 0, 0)`,
                  }}
                >
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial._id}
                      className="testimonial-mobile-slide"
                      aria-hidden={
                        testimonial._id !== testimonials[mobileIndex]?._id
                      }
                    >
                      <TestimonialCard testimonial={testimonial} eagerImage />
                    </div>
                  ))}
                </div>
              </div>

              {testimonials.length > 1 && (
                <div
                  className="testimonial-mobile-pagination"
                  role="tablist"
                  aria-label="Testimonial slides"
                >
                  {testimonials.map((testimonial, index) => (
                    <button
                      key={testimonial._id}
                      type="button"
                      role="tab"
                      aria-selected={index === mobileIndex}
                      aria-label={`Go to ${testimonial.firstName} ${testimonial.lastName}`}
                      className={`testimonial-mobile-pagination-dot ${
                        index === mobileIndex ? "active" : ""
                      }`}
                      onClick={() => handleMobileDotClick(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

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
