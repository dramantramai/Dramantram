import React, { useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import "../styles/NavContactButton.css";

const easeInOut = (t) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

const MAX_FILL_PERCENT = 100;

const NavContactButton = ({
  variant = "dark",
  to,
  href,
  children,
  className = "inter-bold",
  ...rest
}) => {
  const elRef = useRef(null);
  const frameRef = useRef(null);
  const progressRef = useRef(0);
  const filledRef = useRef(false);

  const readTiming = useCallback(() => {
    const el = elRef.current;
    if (!el) {
      return { duration: 2400, textDelay: 1700 };
    }
    const s = getComputedStyle(el);
    return {
      duration:
        parseFloat(s.getPropertyValue("--nav-contact-fill-duration")) * 1000 ||
        2400,
      textDelay:
        parseFloat(s.getPropertyValue("--nav-contact-text-delay")) * 1000 ||
        1700,
    };
  }, []);

  const setProgress = useCallback((percent, filled) => {
    const el = elRef.current;
    if (!el) return;
    progressRef.current = percent;
    el.style.setProperty("--fill-progress", `${percent}%`);
    if (filled) {
      el.classList.add("is-filled");
      filledRef.current = true;
    } else {
      el.classList.remove("is-filled");
      filledRef.current = false;
    }
  }, []);

  const animateTo = useCallback(
    (target) => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      const el = elRef.current;
      if (!el) return;

      const { duration, textDelay } = readTiming();
      const from = progressRef.current;
      const start = performance.now();
      let textSwitched = filledRef.current;

      const step = (now) => {
        const elapsed = now - start;
        const raw = Math.min(elapsed / duration, 1);
        const t = easeInOut(raw);
        const progress = from + (target - from) * t;

        el.style.setProperty("--fill-progress", `${progress}%`);

        if (target > 0 && !textSwitched && elapsed >= textDelay) {
          el.classList.add("is-filled");
          filledRef.current = true;
          textSwitched = true;
        }

        if (target === 0 && raw > 0) {
          el.classList.remove("is-filled");
          filledRef.current = false;
          textSwitched = false;
        }

        if (raw < 1) {
          frameRef.current = requestAnimationFrame(step);
        } else {
          progressRef.current = target;
          if (target >= MAX_FILL_PERCENT) {
            el.classList.add("is-filled");
            filledRef.current = true;
          }
          if (target === 0) {
            el.classList.remove("is-filled");
            filledRef.current = false;
          }
        }
      };

      frameRef.current = requestAnimationFrame(step);
    },
    [readTiming],
  );

  useEffect(() => {
    setProgress(0, false);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [setProgress]);

  const handleEnter = () => animateTo(MAX_FILL_PERCENT);
  const handleLeave = () => animateTo(0);

  const shared = {
    ref: elRef,
    className:
      `btn nav-contact-btn nav-contact-btn--${variant} ${className}`.trim(),
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave,
    onFocus: handleEnter,
    onBlur: handleLeave,
    ...rest,
  };

  const content = (
    <>
      <span className="nav-contact-btn__fills" aria-hidden="true">
        <span className="nav-contact-btn__edge nav-contact-btn__edge--top" />
        <span className="nav-contact-btn__edge nav-contact-btn__edge--right" />
        <span className="nav-contact-btn__edge nav-contact-btn__edge--bottom" />
        <span className="nav-contact-btn__edge nav-contact-btn__edge--left" />
      </span>
      <span className="nav-contact-btn__label">{children}</span>
    </>
  );

  if (to) {
    return <Link href={to} {...shared}>{content}</Link>;
  }

  return <a href={href} {...shared}>{content}</a>;
};

export default NavContactButton;
