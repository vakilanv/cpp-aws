const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const JAVA_BACKEND = process.env.JAVA_BACKEND || 'http://backend-java:8080/java';
const PYTHON_BACKEND = process.env.PYTHON_BACKEND || 'http://backend-python:5000/python';

app.get('/java', async (req, res) => {
  try {
    const response = await axios.get(JAVA_BACKEND);
    res.send(response.data);
  } catch (err) {
    res.status(500).send('Error contacting Java backend');
  }
});

app.get('/python', async (req, res) => {
  try {
    const response = await axios.get(PYTHON_BACKEND);
    res.send(response.data);
  } catch (err) {
    res.status(500).send('Error contacting Python backend');
  }
});

app.get('/', (req, res) => {
  res.send(`
    <h1>Frontend Proxy</h1>
    <ul>
      <li><a href="/java">Java Backend</a></li>
      <li><a href="/python">Python Backend</a></li>
    </ul>
  `);
});

app.listen(port, () => {
  console.log(`Frontend running on port ${port}`);
});