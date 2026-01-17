import { escapeHtml } from '../utils/html.js';
import { commonStyles } from '../styles/common.css.js';
import { requestsPageStyles } from '../styles/requests-page.css.js';

export const createRequestsPageHtml = (requests) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Requests - Counter Strike 2</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        :root { 
            --bg: #0a0c10; 
            --surface: #12151c;
            --accent: #38bdf8;
            --border: #1e293b;
            --text-main: #f8fafc;
            --text-dim: #94a3b8;
        }

        body { 
            margin: 0; 
            padding: 40px 20px; 
            background: var(--bg); 
            color: var(--text-main); 
            font-family: 'Inter', sans-serif; 
            -webkit-font-smoothing: antialiased;
        }

        ${requestsPageStyles}
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-link">← Back</a>
        <h1>Requests (${requests.length})</h1>
        ${requests.length === 0 ? `
            <div class="empty-state">
                <h2>No requests yet</h2>
                <p>Requests you add will appear here</p>
            </div>
        ` : `
            ${requests.map((req) => `
                <div class="request-item">
                    <div class="request-header">
                        <div style="flex: 1;">
                            <div class="request-title">${escapeHtml(req.title)}</div>
                            ${req.description ? `<div class="request-description">${escapeHtml(req.description)}</div>` : ''}
                            <div class="request-meta">
                                <span class="request-time">📅 ${new Date(req.timestamp).toLocaleDateString()} at ${new Date(req.timestamp).toLocaleTimeString()}</span>
                            </div>
                        </div>
                        <button class="delete-button" onclick="deleteRequest('${req.id}')">Delete</button>
                    </div>
                </div>
            `).join('')}
        `}
    </div>
    <script>
        async function deleteRequest(id) {
            if (confirm('Delete this request?')) {
                const response = await fetch('/requests', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id })
                });
                if (response.ok) {
                    location.reload();
                }
            }
        }
    </script>
</body>
</html>
  `;
};
