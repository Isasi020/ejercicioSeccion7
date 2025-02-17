const path = require('path');
const { buscarPelicula, buscarPeliculaPorId} = require('../models/busquedas');

const parametrosBuscarPeliculas = async (req, res, title) =>{

    if (!title) {
        return res.status(400).json({ error: "Debes proporcionar un título para buscar" });
    }

    try {
        const pelicula = await buscarPelicula(title);
        if (pelicula) {
            res.json(pelicula);
        } else {
            res.status(404).json({ error: 'No se encontraron resultados' });
        }
    } catch (error) {
        console.error('Error al obtener datos de RapidAPI:', error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

const paramtrosBuscarPeliculasPorId = async(req, res, id)=>{
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

const ctrlListarPeliculas= async (req, res) => {
    const { title } = req.query; 
    parametrosBuscarPeliculas(req, res, title);
};

const ctrlBuscarInfoPeliId = async (req, res) => {
    const { id } = req.query;
    paramtrosBuscarPeliculasPorId(req, res, id);
};

const postBuscarPeliculas = async (req, res) => {
    const { title } = req.body;
    parametrosBuscarPeliculas(req, res, title);
    // paramtrosBuscarPeliculasPorId(req, res, id);

};

const postBuscarInfoPelicula = async(req, res) => {
    const {id}= req.body; 
    paramtrosBuscarPeliculasPorId(req, res, id);
};

const ctrlMockDelete = async (req, res) => {
    const {id} = req.query
    if (!id) {
        return res.status(400).json({ error: "Debes proporcionar un id para eliminar" });
    }else{
        res.json(`pelicula con id: ${id} eliminada con exito`);
    }
};


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

const controladorMetodos = {
    ctrlPaginaInicio,
    ctrlBuscarPeli: ctrlListarPeliculas,
    ctrlBuscarInfoPeli: ctrlBuscarInfoPeliId,
    postBuscarPeliculas,
    postBuscarInfoPelicula,
    ctrlPaginaNoEncontrada,
    ctrlMockUpdate, 
    ctrlMockDelete
}

module.exports = controladorMetodos;
 