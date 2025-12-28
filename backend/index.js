require('dotenv').config();
const express = require('express');
const cors = require('cors');
// Generative model integration removed — stubbed endpoints below.
// If you want to re-enable, re-add a client that exports predict/buildAnswerPrompt/buildAnalysisPrompt
// const { predict, buildAnswerPrompt, buildAnalysisPrompt } = require('./geminiClient');

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
  // Generative chat endpoint removed. This repository no longer uses external generative APIs.
  return res.status(501).json({ success: false, message: 'Generative chat endpoint removed' });
});

// Generative endpoints removed. They are stubbed to return 501 Not Implemented so the server runs without external AI integration.
app.post('/api/test-model', async (req, res) => {
  return res.status(501).json({ success: false, message: 'Generative test-model endpoint removed' });
});

app.post('/api/analyze', async (req, res) => {
  return res.status(501).json({ success: false, message: 'Generative analyze endpoint removed' });
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
