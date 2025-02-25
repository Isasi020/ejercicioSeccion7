const path = require('path');
const Pelicula = require('../models/pelicula');

const getListaPeliculas = async (req, res) => {
    const lista = await Pelicula.find();
    res.json({
        msg: 'GET-API -CONTROLADOR',
        lista
    });
};

const postPelicula = async (req, res) => {
    const { titulo, año, portada, categoria } = req.body;
    const nuevaPelicula = new Pelicula ({titulo, año, portada, categoria});
    await nuevaPelicula.save();

    res.json({
        msg: 'POST API - CONTROLADOR',
        nuevaPelicula
        });
};

const deletePelicula = async(req, res) => {
    const {id} = req.query;
    const idPelicula = await Pelicula.findByIdAndDelete(id);

    res.json({
        msg: 'DELETE API - CONTROLADOR',
        mensajeConfirmacion: `Pelicula con id ${id}, eliminada con exito`,
        idPelicula
    })
};

const putPelicula = async (req, res) =>{
    const { id } = req.params; 
    const { _id, __v, ...resto } = req.body;
    const pelicula = await Pelicula.findByIdAndUpdate(id, resto);
    
    res.json({
        msg: 'PUT API - CONTROLADOR',
        mensajeConfirmacion: `Pelicula con id ${id}, actualizada con exito`,
        pelicula
    })
};

const ctrlPaginaInicio = (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "home.html"));
};

const ctrlPaginaNoEncontrada = (req, res) => {
  res.status(404).send("Página no encontrada");
};

const controladorMetodos = {
    ctrlPaginaInicio,
    ctrlPaginaNoEncontrada,
    postPelicula,
    getListaPeliculas,
    deletePelicula,
    putPelicula
}

module.exports = controladorMetodos;
 