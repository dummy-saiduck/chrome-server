# chrome-server

Minimal TypeScript Express server that demonstrates a simple AI endpoint. The project ships with local shims so it can run without external AI SDKs for development.

Quickstart

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file at project root with:

```
OPENAI_API_KEY=""
MODEL=gpt-5
CUSTOM_PROMPT=""
PORT=8000
```

3. Build and run

```bash
npm run build
npm start
```

4. For development with automatic reloads

```bash
npm run dev
```

Notes

- The project includes a local `src/openai.ts` and a stubbed `generateText` for local testing. Replace with real API calls when integrating with a real SDK.
- `render.yaml` is preconfigured for Render.com deploys.
