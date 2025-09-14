const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Backend service URLs (from environment variables)
const JAVA_BACKEND = process.env.JAVA_BACKEND || 'http://backend-java:8080/age';
const PYTHON_BACKEND = process.env.PYTHON_BACKEND || 'http://backend-python:5000/day';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Homepage with birthdate form
app.get('/', (req, res) => {
  res.send(`
    <h1>Birthday Demo</h1>
    <form action="/result" method="post">
      <label>Enter your birthdate:</label>
      <input type="date" name="birthdate" required>
      <button type="submit">Submit</button>
    </form>
  `);
});

// Handle form submission
app.post('/result', async (req, res) => {
  const birthdate = req.body.birthdate;
  try {
    const javaResp = await axios.get(`${JAVA_BACKEND}?birthdate=${birthdate}`);
    const pythonResp = await axios.get(`${PYTHON_BACKEND}?birthdate=${birthdate}`);

    res.send(`
      <h2>Results</h2>
      <p>Age (Java backend): ${javaResp.data.age}</p>
      <p>Day of the week (Python backend): ${pythonResp.data.day}</p>
      <a href="/">Go back</a>
    `);
  } catch (err) {
    console.error("[ERROR] Backend call failed:", err.message);
    res.status(500).send("Error calling backend services");
  }
});

app.listen(port, () => {
  console.log(`Frontend running on port ${port}`);
});