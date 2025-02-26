const Pelicula = require ('../models/pelicula');
const Categoria = require ('../models/categoria');
const mongoose = require ('mongoose');
const { ObjectId } = mongoose.Types;


const esPeliculaValida = async(titulo = '') => {

    const existeTitulo = await Pelicula.findOne({titulo});
    if(existeTitulo){
        throw new Error(`La pelicula ${titulo}, ya existe`);
    }
};

const esCategoriaValida = async(categoria  = '') =>{
    const categoriasValidas = Categoria.schema.path('categoria').enumValues; 
    if (!categoriasValidas.includes(categoria)) {
        throw new Error(
            "Debes introducir una categoría válida de las siguientes:  " + 
            categoriasValidas           
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