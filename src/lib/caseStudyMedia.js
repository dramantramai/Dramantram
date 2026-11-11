// Shared (client + server) helpers for case study images/videos and their display order.

export const MAX_IMAGES = 10;
export const IMAGE_KEYS = Array.from({ length: MAX_IMAGES }, (_, i) => `image${i + 1}`);
export const VIDEO_KEYS = ["video_link_1", "video_link_2"];

// Order used when a case study has no saved media_order (matches the original layout).
export const DEFAULT_MEDIA_ORDER = [
  "video_link_1",
  "image1",
  "image2",
  "video_link_2",
  ...IMAGE_KEYS.slice(2),
];

export const mediaLabel = (key) =>
  key.startsWith("video_link_") ? `Video ${key.slice(-1)}` : `Image ${key.slice(5)}`;

// Saved order first (valid, de-duplicated keys), then anything missing in default order.
export const normalizeMediaOrder = (saved) => {
  const valid = new Set(DEFAULT_MEDIA_ORDER);
  const out = [];
  for (const k of Array.isArray(saved) ? saved : []) {
    if (valid.has(k) && !out.includes(k)) out.push(k);
  }
  for (const k of DEFAULT_MEDIA_ORDER) if (!out.includes(k)) out.push(k);
  return out;
};

const hasValue = (v) => typeof v === "string" && v.trim() !== "";

// Keys of media that actually exist on a case study, in display order.
export const resolveMediaOrder = (cs) =>
  normalizeMediaOrder(cs?.media_order).filter((k) => hasValue(cs?.[k]));
