import { handleRequestsRoute } from './handlers/requestsHandler.js';
import { createMainPageHtml } from './templates/mainPage.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Serve static assets (images) from the /public folder
    if (url.pathname.startsWith('/cheat-sheet/')) {
      return env.ASSETS.fetch(request);
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
