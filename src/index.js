export default {
  async fetch(request, env, ctx) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CS2 Tactical Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Rajdhani:wght@500;700&display=swap" rel="stylesheet">
    <style>
        :root { 
            --bg: #050b10; 
            --neon-blue: #00f2ff; 
            --dark-blue: #00416a;
            --card-bg: rgba(0, 242, 255, 0.05);
        }

        body { 
            margin: 0; 
            padding: 20px; 
            background: var(--bg); 
            color: white; 
            font-family: 'Rajdhani', sans-serif; 
        }

        h1 { 
            text-align: center; 
            font-family: 'Orbitron'; 
            color: var(--neon-blue); 
            text-shadow: 0 0 15px var(--neon-blue);
            margin-bottom: 40px; 
            letter-spacing: 5px;
        }

        .section-title { 
            border-left: 3px solid var(--neon-blue); 
            padding-left: 15px; 
            margin: 40px auto 20px; 
            max-width: 1200px; 
            font-family: 'Orbitron'; 
            color: var(--neon-blue);
            text-transform: uppercase;
            font-size: 0.9rem;
            letter-spacing: 2px;
        }
        
        .grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
            gap: 20px; 
            max-width: 1200px; 
            margin: 0 auto; 
        }
        
        .card { 
            position: relative; 
            height: 100px; 
            border-radius: 4px; 
            overflow: hidden; 
            text-decoration: none; 
            color: var(--neon-blue); 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
            background: var(--card-bg);
            border: 1px solid var(--dark-blue);
            box-shadow: inset 0 0 10px rgba(0, 242, 255, 0.1);
        }

        .card:hover { 
            background: rgba(0, 242, 255, 0.15);
            border-color: var(--neon-blue); 
            box-shadow: 0 0 20px rgba(0, 242, 255, 0.4), inset 0 0 15px rgba(0, 242, 255, 0.2);
            transform: translateY(-3px);
        }

        .title { 
            font-family: 'Orbitron'; 
            font-size: 1.2rem; 
            z-index: 2; 
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        /* Decorative Scanlines effect */
        body::before {
            content: " ";
            position: fixed;
            top: 0; left: 0; bottom: 0; right: 0;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
            z-index: 100;
            background-size: 100% 2px, 3px 100%;
            pointer-events: none;
        }

    </style>
</head>
<body>
    <h1>STRAT CENTER</h1>
    
    <div class="section-title">Lineups</div>
    <div class="grid">
        <a href="https://csnades.gg/mirage" class="card"><span class="title">Mirage</span></a>
        <a href="https://csnades.gg/dust2" class="card"><span class="title">Dust 2</span></a>
        <a href="https://csnades.gg/inferno" class="card"><span class="title">Inferno</span></a>
        <a href="https://csnades.gg/overpass" class="card"><span class="title">Overpass</span></a>
        <a href="https://csnades.gg/nuke" class="card"><span class="title">Nuke</span></a>
        <a href="https://csnades.gg/ancient" class="card"><span class="title">Ancient</span></a>
        <a href="https://csnades.gg/anubis" class="card"><span class="title">Anubis</span></a>
    </div>

    <div class="section-title">Warm Up</div>
    <div class="grid">
        <a href="https://cybershoke.net/cs2/servers/multicfgdm" class="card"><span class="title">Multi-DM</span></a>
        <a href="https://cybershoke.net/cs2/servers/dm" class="card"><span class="title">Standard DM</span></a>
        <a href="https://cybershoke.net/cs2/servers/retake" class="card"><span class="title">Retakes</span></a>
    </div>
</body>
</html>
`;

    return new Response(html, { headers: { 'content-type': 'text/html;charset=UTF-8' } });
  },
};