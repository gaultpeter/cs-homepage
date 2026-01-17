export const sendRequestEmail = async (env, title, description) => {
  const apiKey = env.RESEND_API_KEY;
  
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'gault.peter@gmail.com',
        subject: `New Feature Request: ${title}`,
        html: `
          <h2>${title}</h2>
          <p>${description || 'No description provided'}</p>
          <p style="color: #888; font-size: 12px;">Submitted at ${new Date().toLocaleString()}</p>
        `,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
};
