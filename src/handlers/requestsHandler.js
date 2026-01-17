import { sendRequestEmail } from '../utils/email.js';

export const handleRequestsRoute = async (request, env) => {
  if (request.method === 'POST') {
    return handlePostRequest(request, env);
  }
  return new Response('Method not allowed', { status: 405 });
};

const handlePostRequest = async (request, env) => {
  try {
    const data = await request.json();
    const { title, description } = data;

    if (!title) {
      return new Response(JSON.stringify({ error: 'Title is required' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400
      });
    }

    console.log('env keys:', Object.keys(env));
    console.log('RESEND_API_KEY exists:', !!env.RESEND_API_KEY);

    const emailSent = await sendRequestEmail(env, title, description);

    if (emailSent) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
        status: 201
      });
    } else {
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      });
    }
  } catch (error) {
    console.error('POST /requests error:', error.message, error.stack);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
};
