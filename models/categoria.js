const {Schema, model} = require('mongoose');

const CategoriaSchema = Schema(

    {
        categoria: 
        {
            type:String,
            required:[true, "titulo obligatorio"],
            enum: ["terror", "suspense", "accion", "ciencia ficcion", "drama", "comedia", "misterio", "romantica"]
        }
    }
);

module.exports = model('Categoria', CategoriaSchema);
