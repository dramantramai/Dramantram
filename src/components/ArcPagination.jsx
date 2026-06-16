import React, { useState, useEffect, useRef } from "react";
import "..styles/ArcPagination.css";

// Dome geometry constants (for 132px x 72px container)
const RADIUS = 60;
const DOT_SIZE = 12;
const CENTER_X = RADIUS + DOT_SIZE / 2; // 66
const BASE_Y = RADIUS + DOT_SIZE / 2; // 66

// Calculate x, y positions along the arc for slot index i (-1 to 5)
const getDotCoords = (slot) => {
  const angle = Math.PI * (1 - slot / 4);
  const x = CENTER_X + RADIUS * Math.cos(angle);
  const y = BASE_Y - RADIUS * Math.sin(angle);
  return { x, y };
};

// Clamp scroll window center index to keep the 5 slots within bounds (pages 1 to totalPages)
const clampCenter = (center, total) => {
  if (total < 5) return (total + 1) / 2;
  return Math.max(3, Math.min(total - 2, center));
};

const ArcPagination = ({ totalPages, currentPage, onPageChange }) => {
  // scrollWindowCenter represents which page is in the middle slot (slot 2)
  const [scrollWindowCenter, setScrollWindowCenter] = useState(() => {
    return clampCenter(currentPage || 3, totalPages);
  });

  // Array of dots currently rendering in DOM (includes leaving dots during transition)
  const [renderDots, setRenderDots] = useState([]);
  const prevCenter = useRef(scrollWindowCenter);
  const containerRef = useRef(null);
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);

  // Sync scrollWindowCenter with parent currentPage if it goes out of the current visible range
  useEffect(() => {
    const minVisible = scrollWindowCenter - 2;
    const maxVisible = scrollWindowCenter + 2;
    if (currentPage < minVisible || currentPage > maxVisible) {
      setScrollWindowCenter(clampCenter(currentPage, totalPages));
    }
  }, [currentPage, totalPages, scrollWindowCenter]);

  // Sync scrollWindowCenter when totalPages changes (e.g. from filters changing)
  useEffect(() => {
    setScrollWindowCenter(clampCenter(currentPage || 3, totalPages));
  }, [totalPages]);

  // Register Wheel and Touch listeners directly via refs to avoid passive event warnings
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      // Prevent default page scroll when interacting with pagination
      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollTime.current < 400) return; // Throttle gesture steps

      if (totalPages <= 5) return; // No scroll needed if all pages fit

      if (e.deltaY > 0) {
        setScrollWindowCenter((prev) => {
          const next = prev + 1;
          const clamped = clampCenter(next, totalPages);
          if (clamped !== prev) {
            lastScrollTime.current = now;
            return clamped;
          }
          return prev;
        });
      } else if (e.deltaY < 0) {
        setScrollWindowCenter((prev) => {
          const next = prev - 1;
          const clamped = clampCenter(next, totalPages);
          if (clamped !== prev) {
            lastScrollTime.current = now;
            return clamped;
          }
          return prev;
        });
      }
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (totalPages <= 5) return;
      e.preventDefault(); // Stop standard scrolling
    };

    const handleTouchEnd = (e) => {
      if (totalPages <= 5) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY.current - touchEndY;
      const now = Date.now();

      if (now - lastScrollTime.current < 400) return; // Throttle swipe steps

      if (Math.abs(diffY) > 30) {
        if (diffY > 0) {
          // Swipe up -> Scroll down (increment center page)
          setScrollWindowCenter((prev) => {
            const next = prev + 1;
            const clamped = clampCenter(next, totalPages);
            if (clamped !== prev) {
              lastScrollTime.current = now;
              return clamped;
            }
            return prev;
          });
        } else {
          // Swipe down -> Scroll up (decrement center page)
          setScrollWindowCenter((prev) => {
            const next = prev - 1;
            const clamped = clampCenter(next, totalPages);
            if (clamped !== prev) {
              lastScrollTime.current = now;
              return clamped;
            }
            return prev;
          });
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [totalPages]);

  // Handle slide/fade transition logic when scrollWindowCenter updates
  useEffect(() => {
    if (prevCenter.current === scrollWindowCenter) {
      // First mount or non-incremental change
      const initialDots = [];
      if (totalPages < 5) {
        for (let p = 1; p <= totalPages; p++) {
          const slot = p - scrollWindowCenter + 2;
          initialDots.push({ page: p, slot, opacity: 1, key: p });
        }
      } else {
        const startPage = Math.max(1, scrollWindowCenter - 2);
        const endPage = Math.min(totalPages, scrollWindowCenter + 2);
        for (let p = startPage; p <= endPage; p++) {
          const slot = p - scrollWindowCenter + 2;
          initialDots.push({ page: p, slot, opacity: 1, key: p });
        }
      }
      setRenderDots(initialDots);
      return;
    }

    const prev = prevCenter.current;
    const next = scrollWindowCenter;
    prevCenter.current = next;

    if (totalPages < 5) {
      // If page count fits inside layout without scrolling, update dots directly
      const newDots = [];
      for (let p = 1; p <= totalPages; p++) {
        const slot = p - next + 2;
        newDots.push({ page: p, slot, opacity: 1, key: p });
      }
      setRenderDots(newDots);
      return;
    }

    const diff = next - prev;
    if (diff === 1) {
      // Scroll Down (Window moves right):
      // Leaving page at slot 0 (prev - 2) -> slot -1 (opacity 0)
      // Entering page at slot 5 (next + 2) -> slot 4 (opacity 1)
      const leavingPage = prev - 2;
      const enteringPage = next + 2;

      const nextDots = [
        { page: leavingPage, slot: -1, opacity: 0, key: leavingPage, isLeaving: true },
        { page: prev - 1, slot: 0, opacity: 1, key: prev - 1 },
        { page: prev, slot: 1, opacity: 1, key: prev },
        { page: prev + 1, slot: 2, opacity: 1, key: prev + 1 },
        { page: prev + 2, slot: 3, opacity: 1, key: prev + 2 },
        { page: enteringPage, slot: 5, opacity: 0, key: enteringPage, isEntering: true }
      ];

      setRenderDots(nextDots);

      // Force trigger transition for entering dot
      const timer1 = setTimeout(() => {
        setRenderDots((current) =>
          current.map((dot) =>
            dot.page === enteringPage ? { ...dot, slot: 4, opacity: 1 } : dot
          )
        );
      }, 50);

      // Unmount the leaving dot after transition finishes
      const timer2 = setTimeout(() => {
        setRenderDots((current) =>
          current.filter((dot) => dot.page !== leavingPage)
        );
      }, 400);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else if (diff === -1) {
      // Scroll Up (Window moves left):
      // Leaving page at slot 4 (prev + 2) -> slot 5 (opacity 0)
      // Entering page at slot -1 (next - 2) -> slot 0 (opacity 1)
      const leavingPage = prev + 2;
      const enteringPage = next - 2;

      const nextDots = [
        { page: enteringPage, slot: -1, opacity: 0, key: enteringPage, isEntering: true },
        { page: prev - 2, slot: 1, opacity: 1, key: prev - 2 },
        { page: prev - 1, slot: 2, opacity: 1, key: prev - 1 },
        { page: prev, slot: 3, opacity: 1, key: prev },
        { page: prev + 1, slot: 4, opacity: 1, key: prev + 1 },
        { page: leavingPage, slot: 5, opacity: 0, key: leavingPage, isLeaving: true }
      ];

      setRenderDots(nextDots);

      const timer1 = setTimeout(() => {
        setRenderDots((current) =>
          current.map((dot) =>
            dot.page === enteringPage ? { ...dot, slot: 0, opacity: 1 } : dot
          )
        );
      }, 50);

      const timer2 = setTimeout(() => {
        setRenderDots((current) =>
          current.filter((dot) => dot.page !== leavingPage)
        );
      }, 400);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      // Fallback for large jumps: reload dots directly without transition
      const newDots = [];
      const startPage = Math.max(1, next - 2);
      const endPage = Math.min(totalPages, next + 2);
      for (let p = startPage; p <= endPage; p++) {
        const slot = p - next + 2;
        newDots.push({ page: p, slot, opacity: 1, key: p });
      }
      setRenderDots(newDots);
    }
  }, [scrollWindowCenter, totalPages]);

  return (
    <nav
      ref={containerRef}
      className="arc-pagination-container"
      aria-label="Pagination Control"
    >
      <div className="arc-pagination-track" />
      {renderDots.map((dot) => {
        const { x, y } = getDotCoords(dot.slot);
        return (
          <button
            key={dot.key}
            className={`arc-pagination-dot ${dot.page === currentPage ? "active" : ""}`}
            style={{
              left: `${x - DOT_SIZE / 2}px`,
              top: `${y - DOT_SIZE / 2}px`,
              opacity: dot.opacity,
            }}
            onClick={() => onPageChange(dot.page)}
            aria-label={`Go to page ${dot.page}`}
            aria-current={dot.page === currentPage ? "page" : undefined}
          />
        );
      })}
    </nav>
  );
};

export default ArcPagination;
