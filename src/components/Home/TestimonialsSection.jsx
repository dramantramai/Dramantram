import React from "react";

const testimonials = [
  {
    firstName: "Remya",
    lastName: "Lakshmanan",
    post: "Sr. Assistant Vice President",
    company: "Invest India",
    quote:
      "Great job guys! You exceed our expectations each time. Looking forward to many more projects with the Team Dramantram.",
    image: "/remya.png",
  },
  {
    firstName: "Praveen",
    lastName: "Dev",
    post: "Assistant Manager",
    company: "Bharti Airtel",
    quote:
      "This team has done fantastic work from start to finish, putting in tremendous effort to deliver quality content in a short time. I would definitely recommend Dramantram for their quality and commitment.",
    image: "/praveen.png",
  },
  {
    firstName: "Deepanshu",
    lastName: "Pathak",
    post: "Project Coordinator",
    company: "",
    quote:
      "Dramantram was very patient with our requirements and had a great turnaround time. The ease with which they understood the context of the videos and brought them to life was commendable.",
    image: "/deepanshu.png",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="testimonial-section">
      <div className="container-fluid">
        <div className="row g-0">
          <div className="col-lg-3 col-md-6 col-12 left-section">
            <div className="content-wrapper">
              <h1 className="main-heading russo-one-regular">
                THE CENTRE
                <br /> OF OUR
                <br /> UNIVERSE
              </h1>
              <p className="subtitle">
                More than who we are, what our client
                <br />
                partner says, defines us!
              </p>
              <p className="description">
                See how businesses like yours found
                <br />
                solutions with Dramanrtam
              </p>
              <div className="quote-marks">
                <img src="/Quote Symbol.png" alt="quotes" loading="lazy" />
              </div>
            </div>
          </div>

          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="col-lg-3 col-md-6 col-12 testimonial-card"
            >
              <div className="card-content">
                <h2 className="card-name fw-semibold raleway-semibold">
                  {testimonial.firstName}
                </h2>
                <h2 className="card-name fw-semibold raleway-semibold">
                  {testimonial.lastName}
                </h2>
                <p className="card-role">{testimonial.post}</p>
                <p className="card-company">{testimonial.company}</p>
                <div className="card-image-wrapper">
                  <div className="card-image">
                    <img
                      src={testimonial.image}
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
