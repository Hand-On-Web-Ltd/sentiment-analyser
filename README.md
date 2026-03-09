# Sentiment Analyser

Paste customer reviews or feedback and get instant sentiment analysis — no API keys, no server, everything runs in your browser.

Uses the AFINN-165 word list to score text as positive, neutral, or negative. Highlights which words are driving the score so you can see exactly what's going on.

## Features

- **Single review mode** — paste text, get a sentiment score and rating
- **Batch mode** — paste multiple reviews (one per line), get individual scores plus an overall summary
- **Word highlighting** — positive words in green, negative words in red
- **Score breakdown** — see the exact score contribution of each word
- **No API needed** — the AFINN word list is built right in

## How to Use

1. Open `index.html`
2. Paste a review or multiple reviews
3. Hit "Analyse"
4. See the results

## What is AFINN?

AFINN is a list of English words rated for sentiment on a scale from -5 (very negative) to +5 (very positive). Created by Finn Årup Nielsen, it's widely used for basic sentiment analysis.

## Files

| File | What it does |
|------|-------------|
| `index.html` | Page layout |
| `style.css` | Styling |
| `app.js` | Analysis logic |
| `afinn.js` | AFINN-165 word list as a JS object |

## About Hand On Web
We build AI chatbots, voice agents, and automation tools for businesses.
- 🌐 [handonweb.com](https://www.handonweb.com)
- 📧 outreach@handonweb.com
- 📍 Chester, UK

## Licence
MIT
