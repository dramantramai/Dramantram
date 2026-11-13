// Open pages once after an admin change so they're rebuilt now, not by the first real visitor.
export const warmPages = (request, paths) =>
  Promise.all(
    paths.map((p) => fetch(new URL(p, request.url).origin + p).catch(() => {}))
  );
