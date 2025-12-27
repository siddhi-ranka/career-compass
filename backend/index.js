require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { predict, buildAnswerPrompt, buildAnalysisPrompt } = require('./geminiClient');

// Optional Firebase Admin initialization if credentials supplied
let admin = null;
try {
  admin = require('firebase-admin');
  const fs = require('fs');
  const credPath = process.env.FIREBASE_ADMIN_JSON_PATH || './serviceAccountKey.json';
  if (fs.existsSync(credPath)) {
    const creds = require(credPath);
    admin.initializeApp({ credential: admin.credential.cert(creds) });
    console.log('Firebase Admin initialized');
  } else if (process.env.FIREBASE_ADMIN_JSON_BASE64) {
    const creds = JSON.parse(Buffer.from(process.env.FIREBASE_ADMIN_JSON_BASE64, 'base64').toString('utf8'));
    admin.initializeApp({ credential: admin.credential.cert(creds) });
    console.log('Firebase Admin initialized from env');
  }
} catch (e) {
  // Not fatal — admin is optional for local dev
  // eslint-disable-next-line no-console
  console.log('Firebase Admin not initialized (no credentials found)');
}

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.post('/api/chat', async (req, res) => {
  const { domain, question, sessionId, userId } = req.body;
  if (!question || !domain) return res.status(400).json({ success: false, message: 'domain and question required' });

  try {
    const prompt = buildAnswerPrompt(domain, question);
    const text = await predict(prompt);

    // Try to parse JSON response (recommended prompt asks for JSON only)
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      parsed = { answer: text };
    }

    return res.json({ success: true, data: parsed });
  } catch (err) {
    console.error('Error in /api/chat', err);
    return res.status(500).json({ success: false, error: err.message || String(err) });
  }
});

// Test model endpoint: useful for verifying generative API integration
app.post('/api/test-model', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ success: false, message: 'prompt required' });

  try {
    const text = await predict(prompt);
    return res.json({ success: true, raw: text });
  } catch (err) {
    console.error('Error in /api/test-model', err);
    return res.status(500).json({ success: false, error: err.message || String(err) });
  }
});

app.post('/api/analyze', async (req, res) => {
  const { domain, question, userAnswer } = req.body;
  if (!domain || !question || userAnswer === undefined) return res.status(400).json({ success: false, message: 'domain, question and userAnswer required' });

  try {
    const prompt = buildAnalysisPrompt(domain, question, userAnswer);
    const text = await predict(prompt);

    let parsed;
    try {
      parsed = JSON.parse(text);
      // Basic validation
      if (typeof parsed.score !== 'number') parsed.score = parsed.score ? Number(parsed.score) : null;
    } catch (e) {
      parsed = { analysis: text };
    }

    return res.json({ success: true, data: parsed });
  } catch (err) {
    console.error('Error in /api/analyze', err);
    return res.status(500).json({ success: false, error: err.message || String(err) });
  }
});

// Admin: create user using Firebase Admin (for testing only). Requires service account file or base64 env
app.post('/api/admin/create-user', async (req, res) => {
  if (!admin) return res.status(400).json({ success: false, error: 'Firebase Admin not configured on server' });

  const { email, password, displayName } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, error: 'email and password required' });

  try {
    const userRecord = await admin.auth().createUser({ email, password, displayName });
    return res.json({ success: true, data: { uid: userRecord.uid, email: userRecord.email } });
  } catch (err) {
    console.error('Admin create-user error', err);
    return res.status(500).json({ success: false, error: err.message || String(err) });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend listening on port ${port}`));
