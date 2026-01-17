export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Serve static assets (images) from the /public folder
    if (url.pathname.startsWith('/insta-smoke/') || url.pathname.startsWith('/cheat-sheet/')) {
      return env.ASSETS.fetch(request);
    }

    // Handle /requests GET (view all requests)
    if (url.pathname === '/requests' && request.method === 'GET') {
      const keys = await env.REQUESTS_KV.list();
      const requests = [];
      
      for (const key of keys.keys) {
        const value = await env.REQUESTS_KV.get(key.name);
        if (value) {
          requests.push(JSON.parse(value));
        }
      }
      
      // Sort by date, newest first
      requests.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      const escapeHtml = (text) => {
        const map = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
      };
      
      const requestsHtml = `
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

        .container {
            max-width: 800px;
            margin: 0 auto;
        }

        h1 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 10px;
            padding-bottom: 20px;
            border-bottom: 1px solid var(--border);
        }

        .back-link {
            display: inline-block;
            margin-bottom: 20px;
            color: var(--accent);
            text-decoration: none;
            font-size: 0.9rem;
            transition: all 0.2s ease;
        }

        .back-link:hover {
            transform: translateX(-4px);
        }

        .request-item {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 15px;
            transition: all 0.2s ease;
        }

        .request-item:hover {
            border-color: var(--accent);
            background: #161b22;
        }

        .request-title {
            font-weight: 600;
            font-size: 1rem;
            margin-bottom: 8px;
            color: var(--text-main);
            word-break: break-word;
        }

        .request-description {
            font-size: 0.9rem;
            color: var(--text-dim);
            margin-bottom: 12px;
            line-height: 1.5;
            word-break: break-word;
        }

        .request-meta {
            display: flex;
            gap: 20px;
            font-size: 0.8rem;
            color: var(--text-dim);
        }

        .request-time {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: var(--text-dim);
        }

        .empty-state h2 {
            font-size: 1.2rem;
            margin-bottom: 10px;
            color: var(--text-main);
        }

        .delete-button {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #ef4444;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.2s ease;
            margin-left: auto;
        }

        .delete-button:hover {
            background: rgba(239, 68, 68, 0.2);
            border-color: rgba(239, 68, 68, 0.5);
        }

        .request-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 10px;
        }
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
            ${requests.map((req, index) => `
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
      return new Response(requestsHtml, { headers: { 'content-type': 'text/html;charset=UTF-8' } });
    }

    // Handle /requests POST (add new request)
    if (url.pathname === '/requests' && request.method === 'POST') {
      try {
        console.log('POST /requests - env:', Object.keys(env));
        console.log('POST /requests - REQUESTS_KV exists:', !!env.REQUESTS_KV);
        const data = await request.json();
        console.log('POST /requests - data:', data);
        const id = Date.now().toString();
        const requestData = {
          id,
          title: data.title,
          description: data.description || '',
          timestamp: new Date().toISOString()
        };
        console.log('POST /requests - putting to KV:', id);
        await env.REQUESTS_KV.put(id, JSON.stringify(requestData));
        console.log('POST /requests - success');
        return new Response(JSON.stringify({ success: true, id }), { 
          headers: { 'Content-Type': 'application/json' },
          status: 201
        });
      } catch (error) {
        console.error('POST /requests - error:', error);
        return new Response(JSON.stringify({ error: error.message }), { 
          headers: { 'Content-Type': 'application/json' },
          status: 500
        });
      }
    }

    // Handle /requests DELETE (remove request)
    if (url.pathname === '/requests' && request.method === 'DELETE') {
      const data = await request.json();
      await env.REQUESTS_KV.delete(data.id);
      return new Response(JSON.stringify({ success: true }), { 
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Counter Strike 2</title>
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
            scroll-behavior: smooth;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
        }

        h1 { 
            text-align: left; 
            font-weight: 600;
            font-size: 1.5rem;
            color: var(--text-main); 
            margin-bottom: 40px; 
            border-bottom: 1px solid var(--border);
            padding-bottom: 20px;
        }

        .section-header { 
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin: 40px 0 20px; 
        }

        .section-header h2 {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--text-dim);
            font-weight: 600;
        }

        .grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); 
            gap: 12px; 
        }
        
        .card { 
            padding: 20px;
            border-radius: 8px; 
            text-decoration: none; 
            color: var(--text-main); 
            display: flex; 
            align-items: center; 
            justify-content: space-between;
            transition: all 0.2s ease; 
            background: var(--surface);
            border: 1px solid var(--border);
        }

        .card:hover { 
            border-color: var(--accent);
            background: #161b22;
            transform: translateY(-2px);
        }

        .smoke-container {
            display: flex;
            flex-direction: column;
            gap: 50px;
            margin-top: 20px;
        }

        .smoke-item {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .smoke-label {
            font-size: 0.85rem;
            color: var(--accent);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .smoke-image-wrapper {
            overflow: hidden;
            border-radius: 8px;
            border: 1px solid var(--border);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .smoke-image {
            width: 100%;
            height: auto;
            display: block;
            transition: transform 0.5s ease;
        }

        .smoke-image-wrapper:hover .smoke-image {
            transform: scale(1.02);
        }

        .credit-link {
            font-size: 0.7rem;
            color: var(--text-dim);
            text-decoration: none;
            margin-top: 5px;
        }

        .credit-link:hover {
            color: var(--accent);
        }

        .credit-box {
            border: 1px solid var(--border);
            background: var(--surface);
            padding: 8px;
            border-radius: 8px;
            margin-top: 15px;
        }

        .credit-box p {
            margin: 0 0 8px 0;
            font-size: 0.8rem;
            color: var(--text-dim);
        }

        .map-details {
            margin-bottom: 20px;
        }

        .map-details summary {
            cursor: pointer;
            font-size: 0.85rem;
            color: var(--text-main);
            font-weight: 600;
            text-transform: capitalize;
            letter-spacing: 0.05em;
            margin-bottom: 10px;
            background: var(--surface);
            border: 1px solid var(--border);
            padding: 20px;
            border-radius: 8px;
            transition: all 0.2s ease;
        }

        .map-details summary:hover {
            border-color: var(--accent);
            background: #161b22;
            transform: translateY(-2px);
        }

        .map-details > div {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }

        .map-details[open] > div {
            max-height: 10000px;
        }

        .cheat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 15px;
        }

        .cheat-item {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .cheat-label {
            font-size: 0.8rem;
            color: var(--text-main);
            font-weight: 600;
            text-align: center;
        }

        .cheat-image-wrapper {
            overflow: hidden;
            border-radius: 8px;
            border: 1px solid var(--border);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        .cheat-image {
            width: 100%;
            height: auto;
            display: block;
            transition: transform 0.3s ease;
        }

        .cheat-image-wrapper:hover .cheat-image {
            transform: scale(1.05);
        }

        #image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.8);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #image-modal img {
            max-width: 90vw;
            max-height: 90vh;
            object-fit: contain;
        }

        .zoom-tip {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.7rem;
            color: var(--text-dim);
            margin: 0;
            background: rgba(0,0,0,0.5);
            padding: 5px 10px;
            border-radius: 4px;
        }

        .close-modal {
            position: absolute;
            top: 20px;
            right: 20px;
            background: var(--surface);
            color: var(--text-main);
            border: 1px solid var(--border);
            border-radius: 50%;
            width: 40px;
            height: 40px;

            display: flex;
            align-items: center;
            justify-content: center;

            cursor: pointer;
            font-size: 24px;
            font-family: inherit;
            padding: 0;
            z-index: 10;

            padding-bottom: 3px;
        }

        .close-modal:hover {
            background: var(--border);
        }

        .search-container {
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 1px solid var(--border);
        }

        .search-form {
            display: flex;
            gap: 8px;
            align-items: center;
        }

        .search-input {
            flex: 1;
            max-width: 400px;
            padding: 12px 16px;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 8px;
            color: var(--text-main);
            font-family: 'Inter', sans-serif;
            font-size: 0.95rem;
            transition: all 0.2s ease;
        }

        .search-input:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
        }

        .search-input::placeholder {
            color: var(--text-dim);
        }

        .search-button {
            padding: 12px 24px;
            background: var(--accent);
            border: none;
            border-radius: 8px;
            color: #0a0c10;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: 'Inter', sans-serif;
            font-size: 0.95rem;
        }

        .search-button:hover {
            background: #0ea5e9;
            transform: translateY(-2px);
        }

        .request-button {
            padding: 12px 24px;
            background: var(--border);
            border: 1px solid var(--border);
            border-radius: 8px;
            color: var(--text-main);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: 'Inter', sans-serif;
            font-size: 0.95rem;
        }

        .request-button:hover {
            background: #1e293b;
            border-color: var(--accent);
            color: var(--accent);
            transform: translateY(-2px);
        }

        /* Dialog Modal */
        #request-dialog {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        }

        #request-dialog.show {
            display: flex;
        }

        .dialog-content {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .dialog-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .dialog-header h2 {
            margin: 0;
            font-size: 1.3rem;
            color: var(--text-main);
        }

        .dialog-close {
            background: none;
            border: none;
            color: var(--text-dim);
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s ease;
        }

        .dialog-close:hover {
            color: var(--text-main);
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-size: 0.95rem;
            font-weight: 500;
            color: var(--text-main);
        }

        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            background: var(--bg);
            border: 1px solid var(--border);
            border-radius: 6px;
            color: var(--text-main);
            font-family: 'Inter', sans-serif;
            font-size: 0.95rem;
            box-sizing: border-box;
            transition: all 0.2s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
        }

        .form-group textarea {
            resize: vertical;
            min-height: 100px;
        }

        .dialog-actions {
            display: flex;
            gap: 10px;
            margin-top: 25px;
        }

        .dialog-actions button {
            flex: 1;
            padding: 12px 16px;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: 'Inter', sans-serif;
            font-size: 0.95rem;
        }

        .dialog-actions .submit-btn {
            background: var(--accent);
            color: #0a0c10;
        }

        .dialog-actions .submit-btn:hover {
            background: #0ea5e9;
        }

        .dialog-actions .cancel-btn {
            background: var(--border);
            color: var(--text-main);
            border: 1px solid var(--border);
        }

        .dialog-actions .cancel-btn:hover {
            background: #1e293b;
            border-color: var(--accent);
        }

        @media (max-width: 600px) {
            .grid { grid-template-columns: 1fr; }
            .search-form {
                flex-direction: column;
            }
            .search-input {
                max-width: 100%;
            }
            .dialog-content {
                width: 95%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="search-container">
            <form class="search-form" onsubmit="handleSearch(event)">
                <input type="text" class="search-input" id="search-input" placeholder="Search Google..." />
                <button type="submit" class="search-button">Search</button>
                <button type="button" class="request-button" onclick="openRequestDialog()">Request Feature</button>
                <a href="/requests" style="padding: 12px 24px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; color: var(--text-main); text-decoration: none; font-weight: 600; font-size: 0.95rem; display: flex; align-items: center; transition: all 0.2s ease; white-space: nowrap;" onmouseover="this.style.borderColor='var(--accent)'; this.style.background='#161b22';" onmouseout="this.style.borderColor='var(--border)'; this.style.background='var(--surface)';">📋 View Requests</a>
            </form>
        </div>
        
        <div class="section-header">
            <h2>Nade Lineups</h2>
            <p style="font-size: 0.75rem; color: var(--text-dim); margin: 8px 0 0 0; font-weight: 400;">via <a href="https://csnades.gg" style="color: var(--accent); text-decoration: none;">csnades.gg</a></p>
        </div>
        <div class="grid">
            <a href="https://csnades.gg/mirage" class="card">Mirage</a>
            <a href="https://csnades.gg/dust2" class="card">Dust 2</a>
            <a href="https://csnades.gg/inferno" class="card">Inferno</a>
            <a href="https://csnades.gg/overpass" class="card">Overpass</a>
            <a href="https://csnades.gg/nuke" class="card">Nuke</a>
            <a href="https://csnades.gg/ancient" class="card">Ancient</a>
            <a href="https://csnades.gg/anubis" class="card">Anubis</a>
        </div>

        <div class="section-header">
            <h2>Warm Up</h2>
            <p style="font-size: 0.75rem; color: var(--text-dim); margin: 8px 0 0 0; font-weight: 400;">via <a href="https://cybershoke.net" style="color: var(--accent); text-decoration: none;">cybershoke.net</a></p>
        </div>
        <div class="grid" style="margin-bottom: 60px;">
            <a href="https://cybershoke.net/cs2/servers/dm" class="card">Standard DM</a>
            <a href="https://cybershoke.net/cs2/servers/multicfgdm" class="card">Multicfg DM</a>
            <a href="https://cybershoke.net/cs2/servers/retake" class="card">Retakes</a>
        </div>
        
        <div class="section-header">
            <h2>Spawn Line Ups</h2>
        </div>
        <details class="map-details">
            <summary>Ancient</summary>
            <div class="cheat-grid">
                <div class="cheat-item">
                    <span class="cheat-label">CT</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/ancient/thumbnails/ancient-ct.jpg" data-full="/cheat-sheet/ancient/ancient-ct.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">T</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/ancient/thumbnails/ancient-t.jpg" data-full="/cheat-sheet/ancient/ancient-t.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">A Donut</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/ancient/thumbnails/Ancient-ADonut.jpg" data-full="/cheat-sheet/ancient/Ancient-ADonut.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">B Doors</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/ancient/thumbnails/Ancient-BDoors.jpg" data-full="/cheat-sheet/ancient/Ancient-BDoors.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Cave</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/ancient/thumbnails/Ancient-Cave.jpg" data-full="/cheat-sheet/ancient/Ancient-Cave.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Elbow</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/ancient/thumbnails/Ancient-Elbow.jpg" data-full="/cheat-sheet/ancient/Ancient-Elbow.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Extinguish</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/ancient/thumbnails/Ancient-Extinguish.jpg" data-full="/cheat-sheet/ancient/Ancient-Extinguish.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Mid Donut</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/ancient/thumbnails/Ancient-Mid-Donut.jpg" data-full="/cheat-sheet/ancient/Ancient-Mid-Donut.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Red Room</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/ancient/thumbnails/Ancient-Red-Room.jpg" data-full="/cheat-sheet/ancient/Ancient-Red-Room.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
            </div>
        </details>
        <details class="map-details">
            <summary>Anubis</summary>
            <div class="cheat-grid">
                <div class="cheat-item">
                    <span class="cheat-label">Instant Ebox Mid</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/anubis/thumbnails/anubis-instant-ebox-mid.jpg" data-full="/cheat-sheet/anubis/anubis-instant-ebox-mid.png" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Rugs</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/anubis/thumbnails/Anubis-Rugs.jpg" data-full="/cheat-sheet/anubis/Anubis-Rugs.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">T Stairs</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/anubis/thumbnails/Anubis-TStairs.jpg" data-full="/cheat-sheet/anubis/Anubis-TStairs.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
            </div>
        </details>
        <details class="map-details">
            <summary>Dust 2</summary>
            <div class="cheat-grid">
                <div class="cheat-item">
                    <span class="cheat-label">Mid Doors 1</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/dust2/thumbnails/Dust2-Mid-Doors1.jpg" data-full="/cheat-sheet/dust2/Dust2-Mid-Doors1.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Mid Doors 2</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/dust2/thumbnails/Dust2-Mid-Doors2.jpg" data-full="/cheat-sheet/dust2/Dust2-Mid-Doors2.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Spawns</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/dust2/thumbnails/dust2-spawns.jpg" data-full="/cheat-sheet/dust2/dust2-spawns.png" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Smokes Last 5 Spawns</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/dust2/thumbnails/dust2smokeslast5spawns.jpg" data-full="/cheat-sheet/dust2/dust2smokeslast5spawns.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
            </div>
        </details>
        <details class="map-details">
            <summary>Inferno</summary>
            <div class="cheat-grid">
                <div class="cheat-item">
                    <span class="cheat-label">G2</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/inferno/thumbnails/inferno-g2.jpg" data-full="/cheat-sheet/inferno/inferno-g2.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Faze</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/inferno/thumbnails/Inferno-Faze.jpg" data-full="/cheat-sheet/inferno/Inferno-Faze.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
            </div>
        </details>
        <details class="map-details">
            <summary>Mirage</summary>
            <div class="cheat-grid">
                <div class="cheat-item">
                    <span class="cheat-label">Window</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/mirage/thumbnails/mirage-window.jpg" data-full="/cheat-sheet/mirage/mirage-window.webp" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Astralis</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/mirage/thumbnails/Mirage-Astralis.jpg" data-full="/cheat-sheet/mirage/Mirage-Astralis.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">B Short Boost</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/mirage/thumbnails/Mirage-BShort-Boost.jpg" data-full="/cheat-sheet/mirage/Mirage-BShort-Boost.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Con</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/mirage/thumbnails/Mirage-Con.jpg" data-full="/cheat-sheet/mirage/Mirage-Con.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Instant Top Mid</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/mirage/thumbnails/Mirage-Instant-Top-Mid.jpg" data-full="/cheat-sheet/mirage/Mirage-Instant-Top-Mid.png" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Top Con</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/mirage/thumbnails/Mirage-Top-Con.jpg" data-full="/cheat-sheet/mirage/Mirage-Top-Con.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Window Alt</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/mirage/thumbnails/Mirage-Window-alt.jpg" data-full="/cheat-sheet/mirage/Mirage-Window-alt.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
            </div>
        </details>
        <details class="map-details">
            <summary>Nuke</summary>
            <div class="cheat-grid">
                <div class="cheat-item">
                    <span class="cheat-label">Heaven</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/nuke/thumbnails/Nuke-Heaven.jpg" data-full="/cheat-sheet/nuke/Nuke-Heaven.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Vent Lurk</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/nuke/thumbnails/Nuke-Vent-Lurk.jpg" data-full="/cheat-sheet/nuke/Nuke-Vent-Lurk.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
            </div>
        </details>
        <details class="map-details">
            <summary>Overpass</summary>
            <div class="cheat-grid">
                <div class="cheat-item">
                    <span class="cheat-label">Instant Fountain</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/overpass/thumbnails/Overpass-Instant-Fountain.jpg" data-full="/cheat-sheet/overpass/Overpass-Instant-Fountain.png" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Monster</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/overpass/thumbnails/overpass-monster-1.jpg" data-full="/cheat-sheet/overpass/overpass-monster-1.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Monster Alt</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/overpass/thumbnails/Overpass-Monster-alt.jpg" data-full="/cheat-sheet/overpass/Overpass-Monster-alt.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
            </div>
        </details>
        <details class="map-details">
            <summary>Train</summary>
            <div class="cheat-grid">
                <div class="cheat-item">
                    <span class="cheat-label">A Main</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/train/thumbnails/Train-AMain.jpg" data-full="/cheat-sheet/train/Train-AMain.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Bombtrain</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/train/thumbnails/Train-Bombtrain.jpg" data-full="/cheat-sheet/train/Train-Bombtrain.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Gate</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/train/thumbnails/Train-Gate.jpg" data-full="/cheat-sheet/train/Train-Gate.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Sandwich</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/train/thumbnails/Train-Sandwich.jpg" data-full="/cheat-sheet/train/Train-Sandwich.png" class="cheat-image" loading="lazy" onclick="openModal(this.dataset.full)">
                    </div>
                </div>
            </div>
        </details>
        <div class="credit-box" style="text-align: left; margin-top: 20px;">
            <p>Thanks to:</p>
            <a href="https://reddit.com/r/cs2/comments/1muco3t/cheat_sheets_for_instant_spawn_smokes_on_ancient/" class="credit-link">/u/synobazz</a><br>
            <a href="https://reddit.com/r/GlobalOffensive/comments/1hudn72/i_made_an_updated_cheatsheet_for_the_new_mirage/" class="credit-link">/u/Daanoking</a><br>
            <a href="https://www.reddit.com/r/GlobalOffensive/comments/1qaz4r2/i_made_a_steam_overlay_browser_homepage_for_cs2/nz7cx0f/" class="credit-link">/u/OliverSauce</a>
        </div>
    </div>
    <div id="image-modal" style="display: none;">
        <img id="modal-image" src="" alt="">
        <button class="close-modal" onclick="closeModal()">×</button>
        <p class="zoom-tip">Hold Shift and hover to zoom</p>
    </div>

    <div id="request-dialog">
        <div class="dialog-content">
            <div class="dialog-header">
                <h2>Request a Feature</h2>
                <button class="dialog-close" onclick="closeRequestDialog()">×</button>
            </div>
            <form id="request-form" onsubmit="handleRequestSubmit(event)">
                <div class="form-group">
                    <label for="request-title">Title</label>
                    <input type="text" id="request-title" name="title" placeholder="Brief title for your request" required>
                </div>
                <div class="form-group">
                    <label for="request-description">Description</label>
                    <textarea id="request-description" name="description" placeholder="Describe your feature request or feedback..."></textarea>
                </div>
                <div class="dialog-actions">
                    <button type="button" class="cancel-btn" onclick="closeRequestDialog()">Cancel</button>
                    <button type="submit" class="submit-btn">Submit Request</button>
                </div>
            </form>
        </div>
    </div>
    <script>
        function openModal(src) {
            document.getElementById('modal-image').src = src;
            document.getElementById('image-modal').style.display = 'flex';
        }
        function closeModal() {
            document.getElementById('image-modal').style.display = 'none';
        }
        document.getElementById('image-modal').addEventListener('click', function(event) {
            if (event.target === this) {
                closeModal();
            }
        });
        // Zoom on Shift + hover in modal
        let isZoomed = false;
        let isMouseOver = false;
        let lastMouseEvent = null;
        document.getElementById('modal-image').addEventListener('mouseenter', (e) => {
            isMouseOver = true;
            lastMouseEvent = e;
            if (e.shiftKey) {
                isZoomed = true;
                updateZoom(e);
            }
        });
        document.getElementById('modal-image').addEventListener('mousemove', (e) => {
            lastMouseEvent = e;
            if (isZoomed) {
                updateZoom(e);
            }
        });
        document.getElementById('modal-image').addEventListener('mouseleave', (e) => {
            isMouseOver = false;
            isZoomed = false;
            e.target.style.transform = '';
            e.target.style.transformOrigin = '';
            e.target.style.transition = 'transform 0.2s ease';
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Shift' && isMouseOver && !isZoomed) {
                isZoomed = true;
                updateZoom(lastMouseEvent);
            }
        });
        document.addEventListener('keyup', (e) => {
            if (e.key === 'Shift') {
                isZoomed = false;
                document.getElementById('modal-image').style.transform = '';
                document.getElementById('modal-image').style.transformOrigin = '';
                document.getElementById('modal-image').style.transition = 'transform 0.2s ease';
            }
        });
        function updateZoom(e) {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            e.target.style.transformOrigin = xPercent + '% ' + yPercent + '%';
            e.target.style.transform = 'scale(2)';
            e.target.style.transition = 'none';
        }

        // ESC to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        // Google Search functionality
        function handleSearch(event) {
            event.preventDefault();
            const query = document.getElementById('search-input').value.trim();
            if (query) {
                const searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query);
                window.location.href = searchUrl;
                document.getElementById('search-input').value = '';
            }
        }

        // Request Dialog Functions
        function openRequestDialog() {
            document.getElementById('request-dialog').classList.add('show');
            document.getElementById('request-title').focus();
        }

        function closeRequestDialog() {
            document.getElementById('request-dialog').classList.remove('show');
            document.getElementById('request-form').reset();
        }

        document.getElementById('request-dialog').addEventListener('click', function(event) {
            if (event.target === this) {
                closeRequestDialog();
            }
        });

        async function handleRequestSubmit(event) {
            event.preventDefault();
            const title = document.getElementById('request-title').value.trim();
            const description = document.getElementById('request-description').value.trim();

            if (!title) {
                alert('Please enter a title');
                return;
            }

            try {
                const response = await fetch('/requests', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, description })
                });

                if (response.ok) {
                    closeRequestDialog();
                    alert('Request submitted successfully!');
                    document.getElementById('request-form').reset();
                } else {
                    alert('Failed to submit request');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error submitting request');
            }
        }

        // Close dialog with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeRequestDialog();
            }
        });
    </script>
</body>
</html>
`;

    return new Response(html, { headers: { 'content-type': 'text/html;charset=UTF-8' } });
  },
};
