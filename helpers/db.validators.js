const Pelicula = require ('../models/pelicula');
const Categoria = require ('../models/categoria');
const User = require('../models/user');
const Role = require('../models/role');
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
        throw new Error(`El id ${id} no existe`)
    }
};


const esRolValido = async(role) => {
        const existeRol = await Role.findOne({role});
        if(!existeRol){
            throw new Error(`El rol ${role} no esta registrado en la base de datos` );
        }
}

const emailExiste = async(correo = '') => { 
    const existeEmail = await User.findOne({correo});
       if(existeEmail){
           //guardamos
           throw new Error(`El email ${correo} ya estaba registrado`)
       }
}

const existeUsuarioPorId = async(_id) => { 
   const existeUsuario = await User.findById(_id);
      if(!existeUsuario){
          //guardamos
          throw new Error(`El id ${_id} no existe`)
      }
}

module.exports = {
    esPeliculaValida,
    esCategoriaValida,
    esIdValido,
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}