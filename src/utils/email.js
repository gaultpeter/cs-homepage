export const sendRequestEmail = async (env, title, description) => {
  console.log('=== sendRequestEmail called ===');
  console.log('env object:', env);
  const apiKey = env.RESEND_API_KEY;
  
  console.log('API Key exists:', !!apiKey);
  console.log('API Key type:', typeof apiKey);
  console.log('API Key length:', apiKey ? apiKey.length : 0);
  console.log('API Key starts with:', apiKey ? apiKey.substring(0, 10) : 'N/A');
  
  if (!apiKey) {
    console.error('RESEND_API_KEY is missing');
    return false;
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
    
    console.log('Request payload:', JSON.stringify(payload));
    console.log('Calling Resend API...');
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    const responseText = await response.text();
    console.log('Response body:', responseText);

    if (!response.ok) {
      console.error('Resend API returned error:', response.status, responseText);
      return false;
    }

    console.log('Email sent successfully!');
    return true;
  } catch (error) {
    console.error('Fetch error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return false;
  }
};