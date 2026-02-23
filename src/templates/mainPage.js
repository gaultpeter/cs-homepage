import { commonStyles } from '../styles/common.css.js';
import { dialogStyles } from '../styles/dialog.css.js';
import { cheatsheetStyles } from '../styles/cheatsheet.css.js';
import { getCsnadesHtml } from './components/csnades.js';
import { getWarmupHtml } from './components/warmup.js';
import { getCheatSheetsHtml } from './components/cheatSheets.js';

export const createMainPageHtml = () => {
    return `
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
            --notice-gold: #f59e0b;
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

        /* Notice Box Styles */
        .notice-box {
            position: relative;
            background: rgba(245, 158, 11, 0.07);
            border: 1px solid rgba(245, 158, 11, 0.2);
            border-left: 4px solid var(--notice-gold);
            padding: 16px 45px 16px 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            line-height: 1.6;
            display: none; /* Controlled by JS */
            transition: opacity 0.3s ease;
        }

        .notice-close {
            position: absolute;
            top: 10px;
            right: 12px;
            background: none;
            border: none;
            color: var(--text-dim);
            font-size: 20px;
            cursor: pointer;
            padding: 5px;
            line-height: 1;
        }

        .notice-close:hover {
            color: var(--notice-gold);
        }

        .notice-box code {
            background: #1e293b;
            padding: 2px 6px;
            border-radius: 4px;
            color: #fbbf24;
            font-family: monospace;
            font-size: 0.9em;
        }

        .url-comparison {
            margin-top: 10px;
            display: block;
            font-size: 0.85em;
            color: var(--text-dim);
        }

        /* Source Selector */
        .nade-section-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            flex-wrap: wrap;
            gap: 12px;
        }

        .source-selector-wrapper {
            display: flex;
            align-items: center;
            padding-bottom: 4px;
        }

        .source-select {
            appearance: none;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 6px;
            color: var(--text-main);
            font-family: 'Inter', sans-serif;
            font-size: 0.85rem;
            padding: 6px 28px 6px 10px;
            cursor: pointer;
            outline: none;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394a3b8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 8px center;
        }

        .source-select:hover {
            border-color: var(--accent);
        }

        .source-select:focus {
            border-color: var(--accent);
            box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
        }

        ${commonStyles}
        ${dialogStyles}
        ${cheatsheetStyles}
    </style>
</head>
<body>
    <div class="container">
        <div id="rep-notice" class="notice-box">
            <button class="notice-close" onclick="dismissNotice('rep-notice', 'hideRepNotice')">×</button>
            <strong style="color: var(--notice-gold);">Pro Tip:</strong> Want to see player reputation and stats? 
            Simply add a <strong>w</strong> to the beginning of any Steam profile URL to navigate to <strong>csrep.gg</strong>.
            <div class="url-comparison">
                <code>https://steamcommunity.com/id/username/</code> → <code>https://wsteamcommunity.com/id/username/</code>
            </div>
        </div>

        <div id="source-notice" class="notice-box">
            <button class="notice-close" onclick="dismissNotice('source-notice', 'hideSourceNotice')">×</button>
            <strong style="color: var(--notice-gold);">Pro Tip:</strong> You can switch the Nade Lineup source between 
            <strong>csnades.gg</strong> and <strong>jumpthrow.pro</strong> using the dropdown next to "Nade Lineups" below.
            Your preference is saved automatically.
        </div>

        <div class="header-wrapper">
            <h1>Counter Strike 2</h1>
            <button type="button" class="request-button" onclick="openRequestDialog()">Request Feature</button>
        </div>
        <div class="search-container">
            <form class="search-form" onsubmit="handleSearch(event)">
                <input type="text" class="search-input" id="search-input" placeholder="Search Google..." />
                <button type="submit" class="search-button">Search</button>
            </form>
        </div>
        
        ${getCsnadesHtml()}
        ${getWarmupHtml()}
        ${getCheatSheetsHtml()}

        <div class="credit-box" style="text-align: left; margin-top: 20px;">
            <p>Thanks to:</p>
            <a href="https://reddit.com/r/cs2/comments/1muco3t/cheat_sheets_for_instant_spawn_smokes_on_ancient/" class="credit-link">/u/synobazz</a><br>
            <a href="https://reddit.com/r/GlobalOffensive/comments/1hudn72/i_made_an_updated_cheatsheet_for_the_new_mirage/" class="credit-link">/u/Daanoking</a><br>
            <a href="https://www.reddit.com/r/GlobalOffensive/comments/1qaz4r2/i_made_a_steam_overlay_browser_homepage_for_cs2/nz7cx0f/" class="credit-link">/u/OliverSauce</a>
        </div>
    </div>
    
    <div id="image-modal" style="display: none;">
        <div id="modal-image-wrapper" class="modal-image-wrapper">
            <img id="modal-image" src="" alt="">
        </div>
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

    <div id="success-toast" class="success-toast">
        <span class="checkmark">✓</span>
        <span>Request submitted!</span>
    </div>

    <script>
        // ── Nade Source Config ──────────────────────────────────────────────
        const NADE_SOURCES = {
            csnades: {
                label: 'csnades.gg',
                url: 'https://csnades.gg',
                slugs: {
                    mirage:   'https://csnades.gg/mirage',
                    dust2:    'https://csnades.gg/dust2',
                    inferno:  'https://csnades.gg/inferno',
                    overpass: 'https://csnades.gg/overpass',
                    nuke:     'https://csnades.gg/nuke',
                    ancient:  'https://csnades.gg/ancient',
                    anubis:   'https://csnades.gg/anubis',
                }
            },
            jumpthrow: {
                label: 'jumpthrow.pro',
                url: 'https://jumpthrow.pro',
                slugs: {
                    mirage:   'https://jumpthrow.pro/maps/mirage/',
                    dust2:    'https://jumpthrow.pro/maps/dust2/',
                    inferno:  'https://jumpthrow.pro/maps/inferno/',
                    overpass: 'https://jumpthrow.pro/maps/overpass/',
                    nuke:     'https://jumpthrow.pro/maps/nuke/',
                    ancient:  'https://jumpthrow.pro/maps/ancient/',
                    anubis:   'https://jumpthrow.pro/maps/anubis/',
                }
            }
        };

        function applyNadesSource(sourceKey) {
            const source = NADE_SOURCES[sourceKey] || NADE_SOURCES.csnades;
            // Update card links
            document.querySelectorAll('.nade-card[data-map]').forEach(card => {
                const map = card.dataset.map;
                card.href = source.slugs[map] || source.url;
            });
            // Update credit text
            const credit = document.getElementById('nade-source-credit');
            if (credit) {
                credit.innerHTML = 'via <a href="' + source.url + '" target="_blank" rel="noopener noreferrer" style="color: var(--accent); text-decoration: none;">' + source.label + '</a>';
            }
            // Sync dropdown
            const select = document.getElementById('nade-source-select');
            if (select) select.value = sourceKey;
        }

        function setNadesSource(sourceKey) {
            localStorage.setItem('nadesSource', sourceKey);
            applyNadesSource(sourceKey);
        }

        // ── Notice Boxes ────────────────────────────────────────────────────
        document.addEventListener('DOMContentLoaded', () => {
            // csrep notice
            if (!localStorage.getItem('hideRepNotice')) {
                document.getElementById('rep-notice').style.display = 'block';
            }
            // source notice
            if (!localStorage.getItem('hideSourceNotice')) {
                document.getElementById('source-notice').style.display = 'block';
            }
            // Apply saved nade source (default: csnades)
            const savedSource = localStorage.getItem('nadesSource') || 'csnades';
            applyNadesSource(savedSource);
        });

        function dismissNotice(id, key) {
            const notice = document.getElementById(id);
            notice.style.opacity = '0';
            setTimeout(() => {
                notice.style.display = 'none';
                localStorage.setItem(key, 'true');
            }, 300);
        }

        // Modal functions
        function openModal(src) {
            document.getElementById('modal-image').src = src;
            document.getElementById('image-modal').style.display = 'flex';
        }
        function closeModal() {
            document.getElementById('image-modal').style.display = 'none';
            document.getElementById('modal-image').src = '';
        }
        document.getElementById('image-modal').addEventListener('click', function(event) {
            if (event.target === this) {
                closeModal();
            }
        });

        // Zoom on Shift + hover in modal
        let isZoomed = false;
        let lastMouseEvent = null;
        const img = document.getElementById('modal-image');

        document.getElementById('image-modal').addEventListener('mousemove', (e) => {
            lastMouseEvent = e;
            if (isZoomed) updateZoom(e);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Shift' && document.getElementById('image-modal').style.display === 'flex') {
                isZoomed = true;
                updateZoom(lastMouseEvent || { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });
            }
            if (e.key === 'Escape') {
                closeModal();
                closeRequestDialog();
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'Shift') {
                isZoomed = false;
                img.style.transform = '';
                img.style.transformOrigin = '';
                img.style.transition = 'transform 0.2s ease';
            }
        });

        function updateZoom(e) {
            const xPercent = (e.clientX / window.innerWidth) * 100;
            const yPercent = (e.clientY / window.innerHeight) * 100;
            img.style.transformOrigin = xPercent + '% ' + yPercent + '%';
            img.style.transform = 'scale(2)';
            img.style.transition = 'none';
        }

        // Search
        function handleSearch(event) {
            event.preventDefault();
            const query = document.getElementById('search-input').value.trim();
            if (query) {
                window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(query);
            }
        }

        // Request Dialog
        function openRequestDialog() {
            document.getElementById('request-dialog').classList.add('show');
            document.getElementById('request-title').focus();
        }
        function closeRequestDialog() {
            document.getElementById('request-dialog').classList.remove('show');
            document.getElementById('request-form').reset();
        }

        async function handleRequestSubmit(event) {
            event.preventDefault();
            const title = document.getElementById('request-title').value.trim();
            const description = document.getElementById('request-description').value.trim();
            try {
                const response = await fetch('/requests', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, description })
                });
                if (response.ok) {
                    closeRequestDialog();
                    showSuccessToast();
                }
            } catch (error) { console.error(error); }
        }

        function showSuccessToast() {
            const toast = document.getElementById('success-toast');
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2500);
        }

        // Lazy loading
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        document.querySelectorAll("img.lazy").forEach(img => lazyImageObserver.observe(img));
    </script>
</body>
</html>
    `;
};