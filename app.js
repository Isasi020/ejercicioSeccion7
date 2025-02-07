require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const puerto = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

const Params = {
    method: "GET",
    url: process.env.API_URL,
    headers: {
        "x-rapidapi-key": process.env.API_KEY, 
        "x-rapidapi-host": process.env.API_HOST, 
    }
};

async function buscarPelicula(peliculaEscrita) {
    const options = {
        ...Params,
        params: {
            s: peliculaEscrita, 
            r: "json", 
        },
    };
    try {
        const response = await axios.request(options); 
        return response.data.Search;
    } catch (error) {
        console.error('Error al buscar la película:', error);
        return null;
    }
}

async function buscarPeliculaPorId(id) {
    const options = {
        ...Params,
        params: {
            i: id, 
            r: "json", 
        },
    };
    try {
        const response = await axios.request(options); 
        return response.data; 
        
    } catch (error) {
        console.error('Error al buscar la película:', error);
        return null;
    }
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'home.html'));
});

app.get('/api/movies/search', async (req, res) => {
    const { title } = req.query; 

    if (!title) {
        return res.status(400).json({ error: "Debes proporcionar un título para buscar" });
    }

    try {
        const peliculas = await buscarPelicula(title);
        if (peliculas) {
            res.json(peliculas);
        } else {
            res.status(404).json({ error: 'No se encontraron resultados' });
        }
    } catch (error) {
        console.error('Error al obtener datos de RapidAPI:', error);
    }
});

app.get('/api/movies/find', async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: "Debes proporcionar un id para buscar" });
    }

    try {
        const pelicula = await buscarPeliculaPorId(id);
        if (pelicula) {
            res.json(pelicula);
        } else {
            res.status(404).json({ error: 'No se encontraron resultados' });
        }
    } catch (error) {
        console.error('Error al obtener datos de RapidAPI:', error);
    }
});

app.get('/*', (req, res) => {
    res.status(404).send('Página no encontrada');
});

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
