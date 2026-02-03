import { handleRequestsRoute } from './handlers/requestsHandler.js';
import { createMainPageHtml } from './templates/mainPage.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Keep aggressive caching for static images/assets
    if (url.pathname.startsWith('/cheat-sheet/')) {
      const response = await env.ASSETS.fetch(request);
      const newResponse = new Response(response.body, response);

      // Static assets stay cached for 1 year
      newResponse.headers.set('Cache-Control', 'public, max-age=31536000, s-maxage=31536000, immutable');
      return newResponse;
    }

    // 2. Handle POST /requests
    if (url.pathname === '/requests' && request.method === 'POST') {
      return await handleRequestsRoute(request, env);
    }

    // 3. Main page: Removed Worker Cache logic to ensure fresh delivery
    // We generate the HTML directly every time the edge is hit
    const html = createMainPageHtml();
    
    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        // 'no-cache' tells the browser to validate with the server every time
        // This ensures your UI updates (like the notice box) appear immediately
        'Cache-Control': 'public, no-cache, proxy-revalidate'
      }
    });
  },
};