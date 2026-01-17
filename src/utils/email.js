export const sendRequestEmail = async (env, title, description) => {
  const apiKey = env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.error('RESEND_API_KEY is missing');
    return false;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Feature Requests <onboarding@resend.dev>', // Added a friendly name
        to: ['gault.peter@gmail.com'], // Arrays are safer for multiple recipients later
        subject: `New Feature Request: ${title}`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.5;">
            <h2>${title}</h2>
            <p>${description || 'No description provided'}</p>
            <hr />
            <p style="color: #888; font-size: 12px;">Submitted at ${new Date().toLocaleString()}</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend API Error:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Network or Parsing Error:', error);
    return false;
  }
};