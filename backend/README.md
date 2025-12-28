# Career Compass Backend

This backend previously exposed generative endpoints used for model-driven chat and analysis. Generative API support has been removed to simplify the project.

Current endpoints:
- GET /health -> { status: 'ok' }
- Admin routes for Firebase Admin (create user) are still present but require credentials — see the code for details.

How to run locally:
1. cd backend
2. npm install
3. npm start

Notes:
- If you want to re-enable generative APIs, restore `geminiClient` and add `GENERATIVE_API_URL` and `GENERATIVE_API_KEY` to `.env`.
- Keep any real API keys secret — do not commit `.env` to source control.
