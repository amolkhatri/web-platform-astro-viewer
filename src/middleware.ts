import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  
  // Cache for 1 hour (3600 seconds) on Fastly (Surrogate-Control)
  // Browser cache (Cache-Control) set to revalidate immediately to ensure fresh content
  // but allow serving stale if error occurs, or other strategies as needed.
  // For now, we'll set public max-age=0 to force revalidation with the edge.
  
  response.headers.set('Surrogate-Control', 'max-age=3600');
  response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');

  return response;
});
