const Pelicula = require ('../models/pelicula');
const Categoria = require ('../models/categoria');
const mongoose = require ('mongoose');
const { ObjectId } = mongoose.Types;


const esPeliculaValida = async(titulo = '') => {

    if(titulo.length<1){
        throw new Error(`Titulo vacio`);
    }
    
    const existeTitulo = await Pelicula.findOne({titulo});
    if(existeTitulo){
        throw new Error(`La pelicula ${titulo}, ya existe`);
    }
};

const esCategoriaValida = async(categoria = '') =>{
    const categoriasValidas = await Categoria.find().select('categoria');

    const existeCategoria = await Categoria.findOne({categoria});
    if (!existeCategoria) {
        throw new Error(
            "Debes introducir una categoría válida de las siguientes:  " + 
            categoriasValidas.map(c => c.categoria)
         )
    }
};


const esIdValido = async (id) => {
    if (!id) {
        throw new Error("Debes introducir in id para poder eliminar");
    }

    if (!ObjectId.isValid(id)) {
        throw new Error('El ID proporcionado no tiene un formato válido');
    }

    const existeId = await Pelicula.findById(id);
    if (!existeId) {
        //guardamos
        throw new Error(`El id ${id} no existe`)
    }
};





module.exports = {
    esPeliculaValida,
    esCategoriaValida,
    esIdValido
}