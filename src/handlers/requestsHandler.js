import { sendRequestEmail } from '../utils/email.js';

export const handleRequestsRoute = async (request, env) => {
  if (request.method === 'POST') {
    return handlePostRequest(request, env);
  }
  return new Response('Method not allowed', { status: 405 });
};

const handlePostRequest = async (request, env) => {
  const debugLog = [];
  
  try {
    debugLog.push('=== Request received ===');
    debugLog.push(`env keys: ${Object.keys(env).join(', ')}`);
    debugLog.push(`RESEND_API_KEY exists: ${!!env.RESEND_API_KEY}`);
    
    const data = await request.json();
    debugLog.push(`Request data: ${JSON.stringify(data)}`);
    const { title, description } = data;

    if (!title) {
      debugLog.push('Error: Title is required');
      return new Response(JSON.stringify({ error: 'Title is required', debug: debugLog }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400
      });
    }

    debugLog.push('Calling sendRequestEmail...');
    const emailResult = await sendRequestEmail(env, title, description, debugLog);
    debugLog.push(`Email result: ${emailResult.success}`);
    
    if (emailResult.success) {
      return new Response(JSON.stringify({ success: true, debug: debugLog }), {
        headers: { 'Content-Type': 'application/json' },
        status: 201
      });
    } else {
      return new Response(JSON.stringify({ error: 'Failed to send email', debug: emailResult.debug || debugLog }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      });
    }
  } catch (error) {
    debugLog.push(`Catch error: ${error.message}`);
    debugLog.push(`Stack: ${error.stack}`);
    return new Response(JSON.stringify({ error: error.message, debug: debugLog }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
};
