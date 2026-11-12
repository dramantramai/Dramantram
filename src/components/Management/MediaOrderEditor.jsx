import React from "react";
import { mediaLabel } from "../../lib/caseStudyMedia";

/**
 * Lets the admin reorder a case study's images/videos.
 * - order:  full ordered list of media keys (see lib/caseStudyMedia)
 * - active: { [key]: previewUrl | true } for media that currently exists/is selected
 * - onChange(newOrder): called with the new full order
 */
const MediaOrderEditor = ({ order, active, onChange }) => {
  const visible = order.filter((k) => active[k]);

  const move = (idx, dir) => {
    const target = idx + dir;
    if (target < 0 || target >= visible.length) return;
    const next = [...order];
    const a = next.indexOf(visible[idx]);
    const b = next.indexOf(visible[target]);
    [next[a], next[b]] = [next[b], next[a]];
    onChange(next);
  };

  if (visible.length === 0) {
    return (
      <p style={{ color: "#888", fontSize: "0.85rem", margin: 0 }}>
        Add images or video links above to arrange their order.
      </p>
    );
  }

  const btn = (disabled) => ({
    background: "#222",
    color: disabled ? "#555" : "#fff",
    border: "1px solid #444",
    borderRadius: "4px",
    width: "30px",
    height: "28px",
    cursor: disabled ? "default" : "pointer",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {visible.map((key, idx) => (
        <div
          key={key}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "8px 10px",
            border: "1px solid #333",
            borderRadius: "6px",
            background: "#161616",
          }}
        >
          <span style={{ color: "#888", width: "20px", textAlign: "right" }}>{idx + 1}</span>
          {typeof active[key] === "string" ? (
            <img
              src={active[key]}
              alt=""
              style={{ width: "64px", height: "38px", objectFit: "cover", borderRadius: "3px" }}
            />
          ) : (
            <span
              style={{
                width: "64px",
                height: "38px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#222",
                color: "#aaa",
                fontSize: "0.7rem",
                borderRadius: "3px",
              }}
            >
              VIDEO
            </span>
          )}
          <span style={{ color: "#fff", flex: 1, fontSize: "0.9rem" }}>{mediaLabel(key)}</span>
          <button
            type="button"
            aria-label={`Move ${mediaLabel(key)} up`}
            disabled={idx === 0}
            onClick={() => move(idx, -1)}
            style={btn(idx === 0)}
          >
            ▲
          </button>
          <button
            type="button"
            aria-label={`Move ${mediaLabel(key)} down`}
            disabled={idx === visible.length - 1}
            onClick={() => move(idx, 1)}
            style={btn(idx === visible.length - 1)}
          >
            ▼
          </button>
        </div>
      ))}
    </div>
  );
};

export default MediaOrderEditor;
