require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const route = require('./routes/route');

const app = express();
const puerto = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'home.html'));
});

app.use('/api/movies', route);

app.get('/*', (req, res) => {
    res.status(404).send('Página no encontrada');
});

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
