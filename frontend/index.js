const express = require('express');
const fetch = require('node-fetch');
const app = express();

const JAVA_BACKEND = process.env.JAVA_BACKEND || 'http://localhost:8080/java';
const PYTHON_BACKEND = process.env.PYTHON_BACKEND || 'http://localhost:5000/python';

app.get("/", async (req, res) => {
    let messages = [];

    try {
        const javaRes = await fetch(JAVA_BACKEND);
        const javaData = await javaRes.json().catch(() => ({message: await javaRes.text()}));
        messages.push({java: javaData});
    } catch (err) {
        messages.push({java: err.message});
    }

    try {
        const pythonRes = await fetch(PYTHON_BACKEND);
        const pythonData = await pythonRes.json().catch(() => ({message: await pythonRes.text()}));
        messages.push({python: pythonData});
    } catch (err) {
        messages.push({python: err.message});
    }

    res.json(messages);
});

app.get("/error/java", async (req,res) => {
    try {
        const javaRes = await fetch(JAVA_BACKEND.replace('/java','') + '/error');
        const javaData = await javaRes.text();
        res.send(javaData);
    } catch(err) {
        res.status(500).send(err.message);
    }
});

app.get("/error/python", async (req,res) => {
    try {
        const pythonRes = await fetch(PYTHON_BACKEND.replace('/python','') + '/error');
        const pythonData = await pythonRes.text();
        res.send(pythonData);
    } catch(err) {
        res.status(500).send(err.message);
    }
});

app.listen(3000, () => console.log("Frontend running on port 3000"));