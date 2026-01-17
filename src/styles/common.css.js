export const commonStyles = `
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
        margin-bottom: 0;
        border-bottom: none;
        padding-bottom: 0;
    }

    .header-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--border);
        gap: 20px;
    }

    .search-container {
        margin-bottom: 40px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--border);
    }

    .search-form {
        display: flex;
        gap: 8px;
        align-items: center;
    }

    .search-input {
        flex: 1;
        max-width: 400px;
        padding: 12px 16px;
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 8px;
        color: var(--text-main);
        font-family: 'Inter', sans-serif;
        font-size: 0.95rem;
        transition: all 0.2s ease;
    }

    .search-input:focus {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
    }

    .search-input::placeholder {
        color: var(--text-dim);
    }

    .search-button {
        padding: 12px 24px;
        background: var(--accent);
        border: none;
        border-radius: 8px;
        color: #0a0c10;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: 'Inter', sans-serif;
        font-size: 0.95rem;
    }

    .search-button:hover {
        background: #0ea5e9;
        transform: translateY(-2px);
    }

    .request-button {
        padding: 10px 20px;
        background: var(--accent);
        border: none;
        border-radius: 6px;
        color: #0a0c10;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
        white-space: nowrap;
    }

    .request-button:hover {
        background: #0ea5e9;
        transform: translateY(-2px);
    }

    @media (max-width: 600px) {
        .search-form {
            flex-direction: column;
        }
        .search-input {
            max-width: 100%;
        }
        .header-wrapper {
            flex-direction: column;
            align-items: flex-start;
        }
    }
`;
