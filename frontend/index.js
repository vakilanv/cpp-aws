import express from "express";
import fetch from "node-fetch";

const app = express();
const port = 3000;

const JAVA_BACKEND = process.env.JAVA_BACKEND || 'http://backend-java:8080/java';
const PYTHON_BACKEND = process.env.PYTHON_BACKEND || 'http://backend-python:5000/python';

app.get("/", async (req, res) => {
    const javaData = await fetch(JAVA_BACKEND)
        .then(r => r.json().catch(() => ({message: r.statusText})))
        .catch(err => ({message: err.message}));

    const pythonData = await fetch(PYTHON_BACKEND)
        .then(r => r.json().catch(() => ({message: r.statusText})))
        .catch(err => ({message: err.message}));

    res.json({
        java: javaData.message,
        python: pythonData.message
    });
});

app.get("/error", async (req, res) => {
    const javaError = await fetch(JAVA_BACKEND.replace('/java','/error'))
        .then(r => r.json().catch(() => ({message: r.statusText})))
        .catch(err => ({message: err.message}));

    const pythonError = await fetch(PYTHON_BACKEND.replace('/python','/error'))
        .then(r => r.json().catch(() => ({message: r.statusText})))
        .catch(err => ({message: err.message}));

    res.status(500).json({
        java: javaError.message,
        python: pythonError.message
    });
});

app.listen(port, () => console.log(`Frontend running on port ${port}`));