import { commonStyles } from '../styles/common.css.js';
import { dialogStyles } from '../styles/dialog.css.js';
import { cheatsheetStyles } from '../styles/cheatsheet.css.js';
import { getCheatSheetsHtml } from './cheatSheets.html.js';

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

        ${commonStyles}
        ${dialogStyles}
        ${cheatsheetStyles}
    </style>
</head>
<body>
    <div class="container">
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
        ${getCheatSheetsHtml()}
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
    <script src="/scripts/modal.js"></script>
    <script src="/scripts/search.js"></script>
    <script src="/scripts/request-dialog.js"></script>
</body>
</html>
  `;
};
