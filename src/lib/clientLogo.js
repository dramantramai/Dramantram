// Client-safe (no DB imports): the <img> src for a client's logo.
// The updatedAt stamp busts the 1-year immutable cache when the admin replaces the image.
export const clientLogoUrl = (c) =>
  `/api/v1/management/client/${c._id}/image?t=${new Date(c.updatedAt).getTime()}`;
