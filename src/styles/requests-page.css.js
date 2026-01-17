export const requestsPageStyles = `
    .container {
        max-width: 800px;
        margin: 0 auto;
    }

    h1 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 10px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--border);
    }

    .back-link {
        display: inline-block;
        margin-bottom: 20px;
        color: var(--accent);
        text-decoration: none;
        font-size: 0.9rem;
        transition: all 0.2s ease;
    }

    .back-link:hover {
        transform: translateX(-4px);
    }

    .request-item {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 15px;
        transition: all 0.2s ease;
    }

    .request-item:hover {
        border-color: var(--accent);
        background: #161b22;
    }

    .request-title {
        font-weight: 600;
        font-size: 1rem;
        margin-bottom: 8px;
        color: var(--text-main);
        word-break: break-word;
    }

    .request-description {
        font-size: 0.9rem;
        color: var(--text-dim);
        margin-bottom: 12px;
        line-height: 1.5;
        word-break: break-word;
    }

    .request-meta {
        display: flex;
        gap: 20px;
        font-size: 0.8rem;
        color: var(--text-dim);
    }

    .request-time {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .request-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 10px;
    }

    .delete-button {
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #ef4444;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-left: auto;
    }

    .delete-button:hover {
        background: rgba(239, 68, 68, 0.2);
        border-color: rgba(239, 68, 68, 0.5);
    }

    .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: var(--text-dim);
    }

    .empty-state h2 {
        font-size: 1.2rem;
        margin-bottom: 10px;
        color: var(--text-main);
    }
`;
