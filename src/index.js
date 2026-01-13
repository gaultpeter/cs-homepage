export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Serve static assets (images) from the /public folder
    if (url.pathname.startsWith('/insta-smoke/') || url.pathname.startsWith('/cheat-sheet/')) {
      return env.ASSETS.fetch(request);
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

        .map-details {
            margin-bottom: 20px;
        }

        .map-details summary {
            cursor: pointer;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--text-dim);
            font-weight: 600;
            margin-bottom: 10px;
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

            transform: translateY(1px);
        }

        .close-modal:hover {
            background: var(--border);
        }

        @media (max-width: 600px) {
            .grid { grid-template-columns: 1fr; }
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
        </div>
        <div class="grid" style="margin-bottom: 60px;">
            <a href="https://cybershoke.net/cs2/servers/multicfgdm" class="card">Multi-cfg DM</a>
            <a href="https://cybershoke.net/cs2/servers/dm" class="card">Standard DM</a>
            <a href="https://cybershoke.net/cs2/servers/retake" class="card">Retakes</a>
        </div>

        <div class="section-header">
            <h2>Instant Smokes</h2>
        </div>
        <div class="smoke-container">
            <div class="smoke-item">
                <span class="smoke-label">Ancient CT</span>
                <div class="smoke-image-wrapper">
                    <img src="/insta-smoke/ancient-ct.jpg" class="smoke-image" loading="lazy" onclick="openModal(this.src)">
                </div>
                <a href="https://reddit.com/r/cs2/comments/1muco3t/cheat_sheets_for_instant_spawn_smokes_on_ancient/" class="credit-link">/u/synobazz</a>
            </div>
            <div class="smoke-item">
                <span class="smoke-label">Ancient T</span>
                <div class="smoke-image-wrapper">
                    <img src="/insta-smoke/ancient-t.jpg" class="smoke-image" loading="lazy" onclick="openModal(this.src)">
                </div>
                <a href="https://reddit.com/r/cs2/comments/1muco3t/cheat_sheets_for_instant_spawn_smokes_on_ancient/" class="credit-link">/u/synobazz</a>
            </div>
            <div class="smoke-item">
                <span class="smoke-label">Mirage</span>
                <div class="smoke-image-wrapper">
                    <img src="/insta-smoke/mirage.webp" class="smoke-image" loading="lazy" onclick="openModal(this.src)">
                </div>
                <a href="https://reddit.com/r/GlobalOffensive/comments/1hudn72/i_made_an_updated_cheatsheet_for_the_new_mirage/" class="credit-link">/u/Daanoking</a>
            </div>
            <div class="smoke-item">
                <span class="smoke-label">Inferno</span>
                <div class="smoke-image-wrapper">
                    <img src="/insta-smoke/inferno.jpg" class="smoke-image" loading="lazy" onclick="openModal(this.src)">
                </div>
                <a href="https://reddit.com/r/GlobalOffensive/comments/1hudn72/i_made_an_updated_cheatsheet_for_the_new_mirage/" class="credit-link">/u/synobazz</a>
            </div>
            <div class="smoke-item">
                <span class="smoke-label">Overpass</span>
                <div class="smoke-image-wrapper">
                    <img src="/insta-smoke/overpass.jpg" class="smoke-image" loading="lazy" onclick="openModal(this.src)">
                </div>
                <a href="https://reddit.com/r/GlobalOffensive/comments/1hudn72/i_made_an_updated_cheatsheet_for_the_new_mirage/" class="credit-link">/u/synobazz</a>
            </div>
        </div>

        <div class="section-header">
            <h2>Cheat Sheets</h2>
        </div>
        <details class="map-details">
            <summary>Ancient Cheat Sheets</summary>
            <div class="cheat-grid">
                <div class="cheat-item">
                    <span class="cheat-label">A Donut</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/ancient/Ancient-ADonut.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">B Doors</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/ancient/Ancient-BDoors.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Cave</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/ancient/Ancient-Cave.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Elbow</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/ancient/Ancient-Elbow.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Extinguish</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/ancient/Ancient-Extinguish.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Mid Donut</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/ancient/Ancient-Mid-Donut.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Red Room</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/ancient/Ancient-Red-Room.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
            </div>
        </details>
        <details class="map-details">
            <summary>Anubis Cheat Sheets</summary>
            <div class="cheat-grid">
                <div class="cheat-item">
                    <span class="cheat-label">Instant Ebox Mid</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/anubis/anubis-instant-ebox-mid.png" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Rugs</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/anubis/Anubis-Rugs.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">T Stairs</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/anubis/Anubis-TStairs.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
            </div>
        </details>
        <details class="map-details">
            <summary>Dust 2 Cheat Sheets</summary>
            <div class="cheat-grid">
                <div class="cheat-item">
                    <span class="cheat-label">Mid Doors 1</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/dust2/Dust2-Mid-Doors1.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Mid Doors 2</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/dust2/Dust2-Mid-Doors2.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Spawns</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/dust2/dust2-spawns.png" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Smokes Last 5 Spawns</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/dust2/dust2smokeslast5spawns.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
            </div>
        </details>
        <details class="map-details">
            <summary>Inferno Cheat Sheets</summary>
            <div class="cheat-grid">
                <div class="cheat-item">
                    <span class="cheat-label">Fa Ze</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/inferno/Inferno-Fa-Ze.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
            </div>
        </details>
        <details class="map-details">
            <summary>Mirage Cheat Sheets</summary>
            <div class="cheat-grid">
                <div class="cheat-item">
                    <span class="cheat-label">Astralis</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/mirage/Mirage-Astralis.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">B Short Boost</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/mirage/Mirage-BShort-Boost.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Con</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/mirage/Mirage-Con.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Instant Top Mid</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/mirage/Mirage-Instant-Top-Mid.png" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Top Con</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/mirage/Mirage-Top-Con.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Window</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/mirage/Mirage-Window.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
            </div>
        </details>
        <details class="map-details">
            <summary>Nuke Cheat Sheets</summary>
            <div class="cheat-grid">
                <div class="cheat-item">
                    <span class="cheat-label">Heaven</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/nuke/Nuke-Heaven.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Vent Lurk</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/nuke/Nuke-Vent-Lurk.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
            </div>
        </details>
        <details class="map-details">
            <summary>Overpass Cheat Sheets</summary>
            <div class="cheat-grid">
                <div class="cheat-item">
                    <span class="cheat-label">Instant Fountain</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/overpass/Overpass-Instant-Fountain.png" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Monster</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/overpass/Overpass-Monster.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
            </div>
        </details>
        <details class="map-details">
            <summary>Train Cheat Sheets</summary>
            <div class="cheat-grid">
                <div class="cheat-item">
                    <span class="cheat-label">A Main</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/train/Train-AMain.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Bombtrain</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/train/Train-Bombtrain.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Gate</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/train/Train-Gate.jpg" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
                <div class="cheat-item">
                    <span class="cheat-label">Sandwich</span>
                    <div class="cheat-image-wrapper">
                        <img src="/cheat-sheet/train/Train-Sandwich.png" class="cheat-image" loading="lazy" onclick="openModal(this.src)">
                    </div>
                </div>
            </div>
        </details>
    </div>
    <div id="image-modal" style="display: none;">
        <img id="modal-image" src="" alt="">
        <button class="close-modal" onclick="closeModal()">×</button>
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
    </script>
</body>
</html>
`;

    return new Response(html, { headers: { 'content-type': 'text/html;charset=UTF-8' } });
  },
};