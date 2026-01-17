# CS2 Homepage & Cheat Sheets

A lightweight, high-performance browser homepage designed specifically for Counter-Strike 2 players. This project provides instant access to spawn lineups, detailed grenade cheat sheets, and warm-up resources, all served from the edge for maximum speed.

## Features

-   **Instant Cheat Sheets**: High-quality, lazy-loaded reference images for spawn lineups and grenades on all active duty maps (Ancient, Anubis, Dust 2, Inferno, Mirage, Nuke, Overpass, Train).
-   **Interactive Zoom**: Hold `Shift` to inspect lineups in detail with a smooth, stabilized zoom feature.
-   **Fast & Lightweight**: Built with caching strategies and optimized assets to ensure zero delay when loading in-game.
-   **Quick Links**: Direct access to external tools like [CSNades.gg](https://csnades.gg) and [Cybershoke](https://cybershoke.net).
-   **Search**: Simple Google search integration for everyday use as a browser start page.
-   **Feedback System**: Integrated form to request new features or report issues.

## Technology

-   **Cloudflare Workers**: Serverless architecture for handling requests and routing.
-   **Vanilla JS & CSS**: Zero dependencies for the frontend to minimize page load time.
-   **Cloudflare Assets**: Static asset hosting for cheat sheet images.

## Development

This project uses [Wrangler](https://developers.cloudflare.com/workers/wrangler/), the Cloudflare Workers CLI. You do not need to install complex node modules as the project attempts to stay lean.

### Prerequisites

-   [Node.js](https://nodejs.org/) installed.
-   Access to the Cloudflare account (if deploying).

### Commands

**Start Local Server**
Run the worker locally to test changes.
```bash
npx wrangler dev
```
Accessed via `http://127.0.0.1:8787`.

**Deploy to Production**
Push your changes to the Cloudflare global network.
```bash
npx wrangler deploy
```

**View Live Logs**
Debug production issues by streaming logs.
```bash
npx wrangler tail
```

## Project Structure

-   `src/handlers`: Logic for API endpoints (e.g., feature requests).
-   `src/templates`: HTML generation and frontend logic.
-   `src/styles`: CSS-in-JS style definitions.
-   `src/utils`: Helper functions (e.g., email service).
-   `public/`: Static image assets and thumbnails.
-   `wrangler.toml`: Cloudflare environment configuration.

## Maintenance

### Cache Invalidation
The site uses aggressive 1-year caching for images to maximize performance. If you update an image, you must manually invalidate user caches by incrementing the version number.

1.  Open `src/templates/components/cheatSheets.js`.
2.  Update the `ASSET_VERSION` constant (e.g., change `'v=1'` to `'v=2'`).
3.  Deploy the changes.

This appends a query parameter (e.g., `image.jpg?v=2`) to all image requests, forcing browsers and the CDN to fetch the new version.

