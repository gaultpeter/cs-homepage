export const dialogStyles = `
    /* Dialog Modal */
    #request-dialog {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    }

    #request-dialog.show {
        display: flex;
    }

    .dialog-content {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }

    .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .dialog-header h2 {
        margin: 0;
        font-size: 1.3rem;
        color: var(--text-main);
    }

    .dialog-close {
        background: none;
        border: none;
        color: var(--text-dim);
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.2s ease;
    }

    .dialog-close:hover {
        color: var(--text-main);
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-size: 0.95rem;
        font-weight: 500;
        color: var(--text-main);
    }

    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 12px;
        background: var(--bg);
        border: 1px solid var(--border);
        border-radius: 6px;
        color: var(--text-main);
        font-family: 'Inter', sans-serif;
        font-size: 0.95rem;
        box-sizing: border-box;
        transition: all 0.2s ease;
    }

    .form-group input:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
    }

    .form-group textarea {
        resize: vertical;
        min-height: 100px;
    }

    .dialog-actions {
        display: flex;
        gap: 10px;
        margin-top: 25px;
    }

    .dialog-actions button {
        flex: 1;
        padding: 12px 16px;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: 'Inter', sans-serif;
        font-size: 0.95rem;
    }

    .dialog-actions .submit-btn {
        background: var(--accent);
        color: #0a0c10;
    }

    .dialog-actions .submit-btn:hover {
        background: #0ea5e9;
    }

    .dialog-actions .cancel-btn {
        background: var(--border);
        color: var(--text-main);
        border: 1px solid var(--border);
    }

    .dialog-actions .cancel-btn:hover {
        background: #1e293b;
        border-color: var(--accent);
    }

    @media (max-width: 600px) {
        .dialog-content {
            width: 95%;
        }
    }
`;
