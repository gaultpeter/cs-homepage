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
        // Modal functions
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
};
