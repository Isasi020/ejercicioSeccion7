const path = require('path');
const { buscarPelicula, buscarPeliculaPorId} = require('../models/busquedas');

const ctrlBuscarPeli= async (req, res) => {
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
}

const ctrlBuscarInfoPeli = async (req, res) => {
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
}

const postBuscarPeliculas = async(req, res) =>{
    const {id}= req.body;

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
}

const postBuscarInfoPelicula = async(req, res) => {
    const {id}= req.body; 

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
}

const ctrlMockDelete = async (req, res) => {
    const {id} = req.query
    if (!id) {
        return res.status(400).json({ error: "Debes proporcionar un id para eliminar" });
    }else{

        res.json(`pelicula con id: ${id} eliminada con exito`);
    }
}


const ctrlMockUpdate = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res
      .status(400)
      .json({ error: "Debes proporcionar un id para editar" });
  } else {
    res.json(`pelicula con id: ${id} editada con exito`);
  }
};

const ctrlPaginaInicio = (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "home.html"));
};

const ctrlPaginaNoEncontrada = (req, res) => {
  res.status(404).send("Página no encontrada");
};

module.exports = {
    ctrlPaginaInicio,
    ctrlBuscarPeli,
    ctrlBuscarInfoPeli,
    postBuscarPeliculas,
    postBuscarInfoPelicula,
    ctrlPaginaNoEncontrada,
    ctrlMockUpdate, 
    ctrlMockDelete
}