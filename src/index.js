export default {
  async fetch(request, env, ctx) {
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
            --accent: #38bdf8; /* Clean Minimal Blue */
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
            max-width: 900px;
            margin: 0 auto;
        }

        h1 { 
            text-align: left; 
            font-weight: 600;
            font-size: 1.5rem;
            color: var(--text-main); 
            margin-bottom: 40px; 
            letter-spacing: -0.025em;
            border-bottom: 1px solid var(--border);
            padding-bottom: 20px;
        }

        .section-header { 
            display: flex;
            align-items: center;
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
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
            gap: 12px; 
        }
        
        .card { 
            position: relative; 
            padding: 24px;
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

        .title { 
            font-size: 0.95rem; 
            font-weight: 400;
        }

        .arrow {
            color: var(--accent);
            font-size: 1.2rem;
            opacity: 0;
            transition: opacity 0.2s ease;
        }

        .card:hover .arrow {
            opacity: 1;
        }

        @media (max-width: 600px) {
            .grid { grid-template-columns: 1fr; }
            body { padding: 20px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Counter Strike 2</h1>
        
        <div class="section-header">
            <h2>Nade Lineups</h2>
        </div>
        <div class="grid">
            <a href="https://csnades.gg/mirage" class="card"><span class="title">Mirage</span><span class="arrow">→</span></a>
            <a href="https://csnades.gg/dust2" class="card"><span class="title">Dust 2</span><span class="arrow">→</span></a>
            <a href="https://csnades.gg/inferno" class="card"><span class="title">Inferno</span><span class="arrow">→</span></a>
            <a href="https://csnades.gg/overpass" class="card"><span class="title">Overpass</span><span class="arrow">→</span></a>
            <a href="https://csnades.gg/nuke" class="card"><span class="title">Nuke</span><span class="arrow">→</span></a>
            <a href="https://csnades.gg/ancient" class="card"><span class="title">Ancient</span><span class="arrow">→</span></a>
            <a href="https://csnades.gg/anubis" class="card"><span class="title">Anubis</span><span class="arrow">→</span></a>
        </div>

        <div class="section-header">
            <h2>Warm Up</h2>
        </div>
        <div class="grid">
            <a href="https://cybershoke.net/cs2/servers/multicfgdm" class="card"><span class="title">Multi-DM</span><span class="arrow">→</span></a>
            <a href="https://cybershoke.net/cs2/servers/dm" class="card"><span class="title">Standard DM</span><span class="arrow">→</span></a>
            <a href="https://cybershoke.net/cs2/servers/retake" class="card"><span class="title">Retakes</span><span class="arrow">→</span></a>
        </div>
    </div>
</body>
</html>
`;

    return new Response(html, { headers: { 'content-type': 'text/html;charset=UTF-8' } });
  },
};