import { getRequests, addRequest, deleteRequest } from '../utils/kv.js';
import { createRequestsPageHtml } from '../templates/requestsPage.js';

export const handleRequestsRoute = async (request, env, url) => {
  if (request.method === 'GET') {
    return handleGetRequests(env);
  } else if (request.method === 'POST') {
    return handlePostRequest(request, env);
  } else if (request.method === 'DELETE') {
    return handleDeleteRequest(request, env);
  }
  return null;
};

const handleGetRequests = async (env) => {
  const requests = await getRequests(env.REQUESTS_KV);
  const html = createRequestsPageHtml(requests);
  return new Response(html, { 
    headers: { 'content-type': 'text/html;charset=UTF-8' } 
  });
};

const handlePostRequest = async (request, env) => {
  try {
    const data = await request.json();
    const requestData = await addRequest(env.REQUESTS_KV, data.title, data.description);
    return new Response(JSON.stringify({ success: true, id: requestData.id }), { 
      headers: { 'Content-Type': 'application/json' },
      status: 201
    });
  } catch (error) {
    console.error('POST /requests error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), { 
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
};

const handleDeleteRequest = async (request, env) => {
  const data = await request.json();
  await deleteRequest(env.REQUESTS_KV, data.id);
  return new Response(JSON.stringify({ success: true }), { 
    headers: { 'Content-Type': 'application/json' }
  });
};
