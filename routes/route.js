const{ Router} = require('express');
const router  =  Router();
const { buscarPelicula, buscarPeliculaPorId } = require('../models/busquedas');

router.get('/search', async (req, res) => {
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

router.get('/find', async (req, res) => {
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

module.exports = router;