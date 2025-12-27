const GENERATIVE_API_URL = process.env.GENERATIVE_API_URL;
const GENERATIVE_API_KEY = process.env.GENERATIVE_API_KEY;

async function predict(prompt) {
  // Development fallback when GENERATIVE_API_URL is not set
  if (!GENERATIVE_API_URL) {
    console.warn('GENERATIVE_API_URL not set — using local fallback for predict()');

    // Simple heuristics to return structured JSON strings expected by the frontend
    if (prompt.includes('return a JSON object') || prompt.includes('Question:')) {
      // Answer prompt
      const answer = {
        answer: '4',
        confidence: 0.99,
        tags: ['math', 'arithmetic'],
        explanation: '2+2 equals 4 because adding two and two gives four.'
      };
      return JSON.stringify(answer);
    }

    if (prompt.includes('objective grader') || prompt.includes("student's answer")) {
      const analysis = {
        score: 100,
        feedback: 'Correct answer. Well done!',
        areas: [],
        suggestedNextSteps: 'Try a slightly harder problem to stretch your skills.'
      };
      return JSON.stringify(analysis);
    }

    // Generic fallback
    return 'I am a development fallback response. Set GENERATIVE_API_URL to use the real model.';
  }

  // Build headers and URL/bodies for different providers
  let url = GENERATIVE_API_URL;
  const headers = { 'Content-Type': 'application/json' };

  // If using a Bearer token (non-Google providers), put it in Authorization
  if (GENERATIVE_API_KEY && !/generativelanguage\.googleapis/.test(url) && !/vertex\.googleapis/.test(url)) {
    headers['Authorization'] = `Bearer ${GENERATIVE_API_KEY}`;
  }

  let body;
  if (/vertex\.googleapis/.test(url) || GENERATIVE_PROVIDER === 'vertex') {
    // Vertex AI request shape
    body = {
      instances: [{ input: prompt }],
      parameters: { temperature: 0.2, maxOutputTokens: 512 },
    };
  } else if (/generativelanguage\.googleapis/.test(url) || GENERATIVE_PROVIDER === 'google') {
    // Google Generative Language API (text-bison, Gemini via GL API)
    body = { prompt: { text: prompt }, temperature: 0.2, maxOutputTokens: 512 };
    // For Google API keys, include the key as a query parameter
    if (GENERATIVE_API_KEY && !url.includes('key=')) {
      url = `${url}${url.includes('?') ? '&' : '?'}key=${GENERATIVE_API_KEY}`;
    }
  } else {
    // Generic provider
    body = { input: prompt };
  }

  const resp = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });

  const contentType = resp.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const json = await resp.json();

    // Vertex / Google GL responses may nest content in different places - try multiple patterns
    if (json.output && Array.isArray(json.output) && json.output[0] && json.output[0].content) {
      const content = json.output[0].content[0];
      if (typeof content === 'string') return content;
      if (content && content.text) return content.text;
    }

    if (json.candidates && Array.isArray(json.candidates) && json.candidates[0]) {
      const c = json.candidates[0];
      if (typeof c === 'string') return c;
      // text-bison/v1 responses sometimes return 'content' or nested objects
      if (c.output && Array.isArray(c.output) && c.output[0]) {
        const cc = c.output[0];
        if (typeof cc === 'string') return cc;
        if (cc.content) return typeof cc.content === 'string' ? cc.content : (cc.content[0]?.text || JSON.stringify(cc.content));
      }
      if (c.content) return typeof c.content === 'string' ? c.content : JSON.stringify(c.content);
      if (c.text) return c.text;
      return JSON.stringify(c);
    }

    if (json.result) return typeof json.result === 'string' ? json.result : JSON.stringify(json.result);

    // As a last resort, stringify the json
    return JSON.stringify(json);
  }

  return resp.text();
}

function buildAnswerPrompt(domain, question) {
  return `You are an expert tutor in the domain "${domain}". Answer the question concisely and then return a JSON object ONLY with the following shape:\n{ "answer": string, "confidence": number (0-1), "tags": [string], "explanation": string }.\nQuestion: ${question}`;
}

function buildAnalysisPrompt(domain, question, userAnswer) {
  return `You are an objective grader for the domain "${domain}". Given the question:\n${question}\nand the student's answer:\n${userAnswer}\nReturn ONLY a JSON object with this structure:\n{ "score": number (0-100), "feedback": string, "areas": [string], "suggestedNextSteps": string }`;
}

module.exports = { predict, buildAnswerPrompt, buildAnalysisPrompt };
