export const getCsnadesHtml = () => `
        <div class="section-header nade-section-header">
            <div>
                <h2>Nade Lineups</h2>
                <p id="nade-source-credit" style="font-size: 0.75rem; color: var(--text-dim); margin: 8px 0 0 0; font-weight: 400;"></p>
            </div>
            <div class="source-selector-wrapper">
                <label for="nade-source-select" style="font-size: 0.8rem; color: var(--text-dim); margin-right: 8px; white-space: nowrap;">Source:</label>
                <select id="nade-source-select" class="source-select" onchange="setNadesSource(this.value)">
                    <option value="csnades">csnades.gg</option>
                    <option value="jumpthrow">jumpthrow.pro</option>
                </select>
            </div>
        </div>
        <div class="grid" id="nade-grid">
            <a data-map="mirage" class="card nade-card">Mirage</a>
            <a data-map="dust2" class="card nade-card">Dust 2</a>
            <a data-map="inferno" class="card nade-card">Inferno</a>
            <a data-map="overpass" class="card nade-card">Overpass</a>
            <a data-map="nuke" class="card nade-card">Nuke</a>
            <a data-map="ancient" class="card nade-card">Ancient</a>
            <a data-map="anubis" class="card nade-card">Anubis</a>
        </div>
`;
