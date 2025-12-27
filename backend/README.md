# Career Compass Backend (Generative API proxy)

This tiny backend exposes two endpoints used by the frontend:

- POST /api/chat  -> { domain, question, sessionId?, userId? }
  - Uses a domain-specific prompt to ask the generative model to return a JSON answer

- POST /api/analyze -> { domain, question, userAnswer }
  - Asks the model to grade and return structured JSON with score and feedback

How to run locally:
1. Copy `.env.example` to `.env` and fill `GENERATIVE_API_URL` and `GENERATIVE_API_KEY`.
2. cd backend
3. npm install
4. npm start

Notes:
- Keep your API key secret — do not commit `.env` to source control.
- The `geminiClient` supports Vertex AI / Google Generative API and generic endpoints. Example Vertex endpoint: `https://generativemodels.googleapis.com/v1/models/gemini-1.5:generateMessage` (use OAuth/Bearer or API key as your project requires). For generic providers, set `GENERATIVE_API_URL` to the model endpoint and `GENERATIVE_API_KEY` to the bearer token or API key.
- Always instruct the model to output JSON only (we try to parse JSON on the server).
