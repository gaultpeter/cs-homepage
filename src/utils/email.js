export const sendRequestEmail = async (env, title, description, debugLog = []) => {
  debugLog.push('=== sendRequestEmail called ===');
  debugLog.push(`env object keys: ${Object.keys(env).join(', ')}`);

  // Access the secret directly from env (set via wrangler secret put)
  const apiKey = env.RESEND_API_KEY;

  debugLog.push(`API Key exists: ${!!apiKey}`);
  debugLog.push(`API Key type: ${typeof apiKey}`);
  debugLog.push(`API Key length: ${apiKey ? apiKey.length : 0}`);
  debugLog.push(`API Key preview: ${apiKey ? apiKey.substring(0, 10) + '...' : 'N/A'}`);

  if (!apiKey) {
    debugLog.push('ERROR: RESEND_API_KEY is missing from env');
    return { success: false, debug: debugLog };
  }

  try {
    const payload = {
      from: 'Feature Requests <onboarding@resend.dev>',
      to: ['gault.peter@gmail.com'],
      subject: `New Feature Request: ${title}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2>${title}</h2>
          <p>${description || 'No description provided'}</p>
          <hr />
          <p style="color: #888; font-size: 12px;">Submitted at ${new Date().toLocaleString()}</p>
        </div>
      `,
    };

    debugLog.push(`Payload size: ${JSON.stringify(payload).length} bytes`);
    debugLog.push('Calling Resend API at https://api.resend.com/emails...');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    debugLog.push(`Response status: ${response.status}`);
    debugLog.push(`Response status text: ${response.statusText}`);

    const responseText = await response.text();
    debugLog.push(`Response body: ${responseText}`);

    if (!response.ok) {
      debugLog.push(`ERROR: Resend API returned ${response.status}`);
      return { success: false, debug: debugLog };
    }

    debugLog.push('SUCCESS: Email sent to Resend!');
    return { success: true, debug: debugLog };
  } catch (error) {
    debugLog.push(`FETCH ERROR: ${error.message}`);
    debugLog.push(`Error stack: ${error.stack}`);
    return { success: false, debug: debugLog };
  }
};