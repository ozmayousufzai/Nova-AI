# NOVA AI — Web-Grounded Version

NOVA is a portfolio-quality AI-tool discovery site with a web-grounded Ask NOVA experience.

## What this version does

- No OpenAI integration.
- No Google tab opens when asking a question.
- Ask NOVA searches the live web through Brave Search Answers API.
- The answer appears inside the NOVA interface.
- Clickable source links appear below the answer.
- API key stays on the server in `.env` and is never placed in browser JavaScript.
- All existing discovery, collections, favorites, comparison, theme, and responsive features remain.

## Run it

1. Install Node.js.
2. Open this folder in VS Code.
3. Open the terminal in this folder.
4. Run `npm install`.
5. Copy `.env.example` and rename the copy to `.env`.
6. Create a Brave Search API key and put it after `BRAVE_SEARCH_API_KEY=`.
7. Run `npm start`.
8. Open `http://127.0.0.1:5500`.

Do not use Live Server for this version because the Node server provides `/api/ask`.

## API cost

Brave Search currently advertises free monthly credits on its Search plan, while the Answers API is usage-based. Check the current Brave pricing before publishing or using it heavily.

## Security

Never upload `.env` to GitHub. Keep the API key server-side.
