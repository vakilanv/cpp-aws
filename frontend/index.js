const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Backend service URLs (from environment variables)
const JAVA_BACKEND = process.env.JAVA_BACKEND || 'http://backend-java:8080/java';
const PYTHON_BACKEND = process.env.PYTHON_BACKEND || 'http://backend-python:5000/python';

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);
  next();
});

// Route: /java -> calls Java backend
app.get('/java', async (req, res) => {
  try {
    const response = await axios.get(JAVA_BACKEND);
    console.log('[INFO] Java backend response:', response.data);
    res.send(response.data);
  } catch (err) {
    console.error('[ERROR] Failed to contact Java backend:', err.message);
    res.status(500).send('Error contacting Java backend');
  }
});

// Route: /python -> calls Python backend
app.get('/python', async (req, res) => {
  try {
    const response = await axios.get(PYTHON_BACKEND);
    console.log('[INFO] Python backend response:', response.data);
    res.send(response.data);
  } catch (err) {
    console.error('[ERROR] Failed to contact Python backend:', err.message);
    res.status(500).send('Error contacting Python backend');
  }
});

// Homepage
app.get('/', (req, res) => {
  console.log('[INFO] Serving homepage');
  res.send(`
    <h1>Frontend Proxy</h1>
    <ul>
      <li><a href="/java">Java Backend</a></li>
      <li><a href="/python">Python Backend</a></li>
      <li><a href="/error">Trigger Frontend Error</a></li>
    </ul>
  `);
});

// Route: /error -> always triggers 500 for demo
app.get('/error', (req, res) => {
  const errMsg = 'Frontend Internal Server Error (for demo)';
  console.error('[ERROR] ' + errMsg);
  res.status(500).send(errMsg);
});

// Catch-all for undefined routes
app.use((req, res) => {
  console.warn('[WARN] Unknown route accessed:', req.originalUrl);
  res.status(404).send('Not Found');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[ERROR] Unhandled exception:', err);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Frontend running on port ${port}`);
});