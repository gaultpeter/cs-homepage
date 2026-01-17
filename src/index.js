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
      newResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      return newResponse;
    }

    // Handle POST /requests (feature request submissions)
    if (url.pathname === '/requests' && request.method === 'POST') {
      return await handleRequestsRoute(request, env);
    }

    // Main page - all other routes
    const html = createMainPageHtml();
    return new Response(html, { headers: { 'content-type': 'text/html;charset=UTF-8' } });
  },
};
