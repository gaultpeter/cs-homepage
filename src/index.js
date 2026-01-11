export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Serve static assets (images) if the path isn't the root
    if (url.pathname !== "/") {
      return env.ASSETS.fetch(request);
    }

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CS2 Tactical Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root { --bg: #0f1214; --accent: #ff9800; --card-h: 180px; }
        body { margin: 0; padding: 20px; background: var(--bg); color: white; font-family: 'Roboto', sans-serif; }
        h1 { text-align: center; font-family: 'Orbitron'; color: var(--accent); margin-bottom: 40px; letter-spacing: 3px; }
        .section-title { border-left: 4px solid var(--accent); padding-left: 15px; margin: 40px auto 20px; max-width: 1200px; font-family: 'Orbitron'; text-transform: uppercase; }
        
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; max-width: 1200px; margin: 0 auto; }
        
        .card { 
            position: relative; height: var(--card-h); border-radius: 12px; overflow: hidden; 
            text-decoration: none; color: white; display: flex; align-items: center; 
            justify-content: center; transition: all 0.3s ease; background-size: cover; 
            background-position: center; border: 1px solid rgba(255,255,255,0.1);
        }

        .card:hover { transform: translateY(-5px); border-color: var(--accent); box-shadow: 0 10px 20px rgba(0,0,0,0.6), 0 0 15px rgba(255, 152, 0, 0.3); }
        .overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; transition: 0.3s; }
        .card:hover .overlay { background: rgba(0,0,0,0.3); }
        .title { font-family: 'Orbitron'; font-size: 1.4rem; z-index: 2; text-shadow: 2px 2px 10px black; text-align: center; padding: 0 10px; }

        /* Map Backgrounds (.webp) */
        .mirage { background-image: url('/mirage.webp'); }
        .dust2 { background-image: url('/dust2.webp'); }
        .overpass { background-image: url('/overpass.webp'); }
        .ancient { background-image: url('/ancient.webp'); }
        .inferno { background-image: url('/inferno.webp'); }
        .nuke { background-image: url('/nuke.webp'); }
        .anubis { background-image: url('/anubis.webp'); }
        
        /* Training Backgrounds (.jpg) */
        .dm { background-image: url('/dm.jpg'); }
        .multidm { background-image: url('/multicfgdm.jpg'); }
        .retakes { background-image: url('/retakes.jpg'); }
    </style>
</head>
<body>
    <h1>STRAT CENTER</h1>
    
    <div class="section-title">Nade Lineups</div>
    <div class="grid">
        <a href="https://csnades.gg/mirage" class="card mirage"><div class="overlay"><span class="title">Mirage</span></div></a>
        <a href="https://csnades.gg/dust2" class="card dust2"><div class="overlay"><span class="title">Dust 2</span></div></a>
        <a href="https://csnades.gg/inferno" class="card inferno"><div class="overlay"><span class="title">Inferno</span></div></a>
        <a href="https://csnades.gg/overpass" class="card overpass"><div class="overlay"><span class="title">Overpass</span></div></a>
        <a href="https://csnades.gg/nuke" class="card nuke"><div class="overlay"><span class="title">Nuke</span></div></a>
        <a href="https://csnades.gg/ancient" class="card ancient"><div class="overlay"><span class="title">Ancient</span></div></a>
        <a href="https://csnades.gg/anubis" class="card anubis"><div class="overlay"><span class="title">Anubis</span></div></a>
    </div>

    <div class="section-title">Warm Up</div>
    <div class="grid">
        <a href="https://cybershoke.net/cs2/servers/multicfgdm" class="card multidm"><div class="overlay"><span class="title">Multi-CFG DM</span></div></a>
        <a href="https://cybershoke.net/cs2/servers/dm" class="card dm"><div class="overlay"><span class="title">Standard DM</span></div></a>
        <a href="https://cybershoke.net/cs2/servers/retake" class="card retakes"><div class="overlay"><span class="title">Retakes</span></div></a>
    </div>
</body>
</html>
`;

    return new Response(html, { headers: { 'content-type': 'text/html;charset=UTF-8' } });
  },
};