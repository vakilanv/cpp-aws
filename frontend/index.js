const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const JAVA_BACKEND = process.env.JAVA_BACKEND || 'http://backend-java:8080/age';
const PYTHON_BACKEND = process.env.PYTHON_BACKEND || 'http://backend-python:5000/day';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Homepage
app.get('/', (req, res) => {
  res.send(`
    <h1>Birthday Demo</h1>
    <form action="/result" method="post">
      <label>Enter your name:</label>
      <input type="text" name="name" required><br><br>
      <label>Enter your birthdate:</label>
      <input type="date" name="birthdate" required><br><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

// Handle form submission
app.post('/result', async (req, res) => {
  const { name, birthdate } = req.body;

  try {
    const javaResp = await axios.get(JAVA_BACKEND, { params: { name, birthdate } });
    const pythonResp = await axios.get(PYTHON_BACKEND, { params: { name, birthdate } });

    res.send(`
      <h2>Hey ${javaResp.data.name}, here are your results:</h2>
      <p>Your age (from Java backend): ${javaResp.data.age}</p>
      <p>Your day of the week (from Python backend): ${pythonResp.data.day}</p>
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
