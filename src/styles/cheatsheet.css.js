export const cheatsheetStyles = `
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

    .credit-link {
        font-size: 0.7rem;
        color: var(--text-dim);
        text-decoration: none;
        margin-top: 5px;
    }

    .credit-link:hover {
        color: var(--accent);
    }

    @media (max-width: 600px) {
        .grid { grid-template-columns: 1fr; }
    }
`;
