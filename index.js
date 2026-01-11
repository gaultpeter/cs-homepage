export default {
  async fetch(request, env, ctx) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CS2 Tactical Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-dark: #0f1214;
            --accent: #ff9800;
            --glass: rgba(0, 0, 0, 0.6);
        }

        body {
            margin: 0;
            padding: 20px;
            background-color: var(--bg-dark);
            color: white;
            font-family: 'Roboto', sans-serif;
        }

        h1, h2 {
            text-align: center;
            font-family: 'Orbitron', sans-serif;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 30px;
            color: var(--accent);
        }

        .section-title {
            border-left: 4px solid var(--accent);
            padding-left: 15px;
            margin-top: 50px;
            text-align: left;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .card {
            position: relative;
            height: 160px;
            border-radius: 12px;
            overflow: hidden;
            text-decoration: none;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s, box-shadow 0.2s;
            background-size: cover;
            background-position: center;
            border: 1px solid rgba(255,255,255,0.1);
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.5), 0 0 15px var(--accent);
            border-color: var(--accent);
        }

        .card-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }

        .card-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 1.5rem;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
            z-index: 2;
        }

        /* Map Backgrounds */
        .mirage { background-image: url('https://wallpaperaccess.com/full/3041384.jpg'); }
        .dust2 { background-image: url('https://wallpaperaccess.com/full/3041416.jpg'); }
        .overpass { background-image: url('https://wallpaperaccess.com/full/3041539.jpg'); }
        .ancient { background-image: url('https://wallpaperaccess.com/full/6314841.jpg'); }
        .inferno { background-image: url('https://wallpaperaccess.com/full/3041460.jpg'); }
        .nuke { background-image: url('https://wallpaperaccess.com/full/3041525.jpg'); }
        .anubis { background-image: url('https://wallpaperaccess.com/full/9036980.jpg'); }
        
        /* Warmup Backgrounds */
        .warmup { background-image: url('https://wallpaperaccess.com/full/1126132.jpg'); filter: hue-rotate(45deg); }

        @media (max-width: 600px) {
            .grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>

    <h1>Tactical Center</h1>

    <h2 class="section-title">Nade Lineups</h2>
    <div class="grid">
        <a href="https://csnades.gg/mirage" class="card mirage"><div class="card-overlay"><span class="card-title">Mirage</span></div></a>
        <a href="https://csnades.gg/dust2" class="card dust2"><div class="card-overlay"><span class="card-title">Dust 2</span></div></a>
        <a href="https://csnades.gg/inferno" class="card inferno"><div class="card-overlay"><span class="card-title">Inferno</span></div></a>
        <a href="https://csnades.gg/overpass" class="card overpass"><div class="card-overlay"><span class="card-title">Overpass</span></div></a>
        <a href="https://csnades.gg/nuke" class="card nuke"><div class="card-overlay"><span class="card-title">Nuke</span></div></a>
        <a href="https://csnades.gg/ancient" class="card ancient"><div class="card-overlay"><span class="card-title">Ancient</span></div></a>
        <a href="https://csnades.gg/anubis" class="card anubis"><div class="card-overlay"><span class="card-title">Anubis</span></div></a>
    </div>

    <h2 class="section-title">Warm Up</h2>
    <div class="grid">
        <a href="https://cybershoke.net/cs2/servers/multicfgdm" class="card warmup"><div class="card-overlay"><span class="card-title">Multi-CFG DM</span></div></a>
        <a href="https://cybershoke.net/cs2/servers/dm" class="card warmup"><div class="card-overlay"><span class="card-title">Standard DM</span></div></a>
        <a href="https://cybershoke.net/cs2/servers/retake" class="card warmup"><div class="card-overlay"><span class="card-title">Retakes</span></div></a>
    </div>

    <footer style="text-align: center; margin-top: 50px; opacity: 0.5; font-size: 0.8rem;">
        GL HF.
    </footer>

</body>
</html>
`;

    return new Response(html, {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
    });
  },
};