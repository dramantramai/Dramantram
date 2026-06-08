import React, { useRef, useEffect } from "react";

/**
 * ProcessWrap — wraps the process section and fires an IntersectionObserver
 * that adds the `.process-animate` class once the section enters the viewport.
 * CSS in Process.css then reveals each column and arrow in sequence.
 */
const ProcessWrap = ({ children }) => {
  const wrapRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          wrapRef.current?.classList.add("process-animate");
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (wrapRef.current) observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="process-wrap" ref={wrapRef}>
      <div className="process-grid container-fluid">
        {children}
      </div>
    </section>
  );
};

export default ProcessWrap;
