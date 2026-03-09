let mode = 'single';

function setMode(m) {
    mode = m;
    document.querySelectorAll('.mode-btn').forEach((btn, i) => {
        btn.classList.toggle('active', (i === 0 && m === 'single') || (i === 1 && m === 'batch'));
    });
}

function analyseText(text) {
    const words = text.toLowerCase().replace(/[^a-z\s'-]/g, '').split(/\s+/);
    let score = 0;
    const matches = [];

    words.forEach(word => {
        if (AFINN[word] !== undefined) {
            score += AFINN[word];
            matches.push({ word, score: AFINN[word] });
        }
    });

    let rating = 'Neutral';
    let ratingClass = 'neutral';
    if (score > 0) { rating = 'Positive'; ratingClass = 'positive'; }
    if (score < 0) { rating = 'Negative'; ratingClass = 'negative'; }
    if (score > 5) rating = 'Very Positive';
    if (score < -5) rating = 'Very Negative';

    return { score, rating, ratingClass, matches };
}

function highlightText(text) {
    const words = text.split(/(\s+)/);
    return words.map(word => {
        const clean = word.toLowerCase().replace(/[^a-z'-]/g, '');
        if (AFINN[clean] !== undefined) {
            const cls = AFINN[clean] > 0 ? 'pos' : 'neg';
            return `<span class="${cls}">${word}</span>`;
        }
        return word;
    }).join('');
}

function analyse() {
    const input = document.getElementById('input').value.trim();
    if (!input) return;

    const results = document.getElementById('results');
    results.classList.remove('hidden');

    if (mode === 'single') {
        document.getElementById('single-result').classList.remove('hidden');
        document.getElementById('batch-result').classList.add('hidden');
        showSingleResult(input);
    } else {
        document.getElementById('single-result').classList.add('hidden');
        document.getElementById('batch-result').classList.remove('hidden');
        showBatchResult(input);
    }
}

function showSingleResult(text) {
    const result = analyseText(text);

    const scoreEl = document.getElementById('score');
    scoreEl.textContent = (result.score > 0 ? '+' : '') + result.score;
    scoreEl.className = 'score-value ' + result.ratingClass;

    const ratingEl = document.getElementById('rating');
    ratingEl.textContent = result.rating;
    ratingEl.className = 'score-label ' + result.ratingClass;

    document.getElementById('highlighted').innerHTML = highlightText(text);

    const breakdown = document.getElementById('breakdown');
    if (result.matches.length > 0) {
        const sorted = result.matches.sort((a, b) => Math.abs(b.score) - Math.abs(a.score));
        breakdown.innerHTML = '<h3>Word Scores</h3>' + sorted.map(m =>
            `<div class="word-item"><span>${m.word}</span><span class="${m.score > 0 ? 'positive' : 'negative'}">${m.score > 0 ? '+' : ''}${m.score}</span></div>`
        ).join('');
    } else {
        breakdown.innerHTML = '<h3>No scored words found</h3>';
    }
}

function showBatchResult(text) {
    const lines = text.split('\n').filter(l => l.trim());
    const results = lines.map((line, i) => ({ text: line, index: i + 1, ...analyseText(line) }));

    const pos = results.filter(r => r.score > 0).length;
    const neg = results.filter(r => r.score < 0).length;
    const neu = results.filter(r => r.score === 0).length;

    document.getElementById('batch-summary').innerHTML = `
        <div class="summary-card"><div class="num positive">${pos}</div><div class="label">Positive</div></div>
        <div class="summary-card"><div class="num negative">${neg}</div><div class="label">Negative</div></div>
        <div class="summary-card"><div class="num neutral">${neu}</div><div class="label">Neutral</div></div>
    `;

    const maxAbs = Math.max(...results.map(r => Math.abs(r.score)), 1);
    document.getElementById('batch-chart').innerHTML = results.map(r => {
        const width = Math.abs(r.score) / maxAbs * 100;
        const color = r.score > 0 ? '#22c55e' : r.score < 0 ? '#ef4444' : '#64748b';
        return `<div class="bar-row">
            <span class="bar-label">#${r.index}</span>
            <div class="bar-track"><div class="bar-fill" style="width:${width}%;background:${color}"></div></div>
            <span class="bar-score ${r.ratingClass}">${r.score > 0 ? '+' : ''}${r.score}</span>
        </div>`;
    }).join('');
}
