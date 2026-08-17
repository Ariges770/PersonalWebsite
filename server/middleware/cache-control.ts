export default defineEventHandler((event) => {
  // Dev-only. The Coder workspace proxy adds a long max-age to uncached
  // responses, which poisons browsers with stale module graphs. Production
  // (e.g. Vercel) manages its own caching and must not be affected.
  if (import.meta.dev) {
    setResponseHeader(event, 'Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  }
});
