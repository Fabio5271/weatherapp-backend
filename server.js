// JS imports:
// const express = require('express');
// const axios = require('axios');
// const dotenv = require('dotenv');

// ES imports:
import express from 'express';
import axios from 'axios';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;
const OWM_KEY = process.env.OWM_API_KEY;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});

app.get('/api/weather', async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ error: 'City query is required' });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=${OWM_KEY}`
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

