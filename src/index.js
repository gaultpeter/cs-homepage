import { handleRequestsRoute } from './handlers/requestsHandler.js';
import { createMainPageHtml } from './templates/mainPage.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Serve static assets (images) from the /public folder
    if (url.pathname.startsWith('/cheat-sheet/')) {
      const response = await env.ASSETS.fetch(request);
      const newResponse = new Response(response.body, response);

      // Cache for 1 year (immutable) as we want aggressive caching for these static assets
      // s-maxage ensures Cloudflare Edge keeps it just as long
      newResponse.headers.set('Cache-Control', 'public, max-age=31536000, s-maxage=31536000, immutable');
      return newResponse;
    }

    // Handle POST /requests (feature request submissions)
    if (url.pathname === '/requests' && request.method === 'POST') {
      return await handleRequestsRoute(request, env);
    }

    // Main page SWR (Stale-While-Revalidate) Caching Strategy
    const cache = caches.default;
    const cacheKey = new Request(url.toString(), request);

    let response = await cache.match(cacheKey);

    // If we have a cached response, return it, but maybe verify freshness or allow background update?
    // For this implementation, we will use a simple "Cache First" strategy with a short TTL,
    // trusting Cloudflare to handle the 'stale-while-revalidate' directive if headers are set correctly.
    // However, to strictly follow SWR pattern programmatically:

    if (!response) {
      // Cache Miss: Generate content
      const html = createMainPageHtml();
      response = new Response(html, {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
          // Browser cache: 5 min, Edge cache: handle via Worker logic specific or standard headers
          'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=3600'
        }
      });

      // Cache the response asynchronously
      ctx.waitUntil(cache.put(cacheKey, response.clone()));
    }

    return response;
  },
};
