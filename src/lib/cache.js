// Simple in-memory cache helper using a global store to survive Next.js dev hot-reloads
let cache = global._caseStudiesCache;
if (!cache) {
  cache = global._caseStudiesCache = {
    store: new Map(),
  };
}

export function getCachedData(key) {
  const data = cache.store.get(key);
  if (data !== undefined) {
    console.log(`[CACHE HIT] Key: ${key}`);
    return data;
  }
  console.log(`[CACHE MISS] Key: ${key}`);
  return null;
}

export function setCachedData(key, data) {
  console.log(`[CACHE SET] Key: ${key}`);
  cache.store.set(key, data);
}

export function invalidateCache() {
  console.log("[CACHE INVALIDATE] Clearing all case studies cache...");
  cache.store.clear();
}
