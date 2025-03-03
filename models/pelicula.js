const {Schema, model} = require('mongoose');


const PeliculaSchema = Schema(

    {
        titulo: 
        {
            type:String,
            required:[true, "titulo obligatorio"],
        },


        año: 
        {
            type:Number,
            required:[true, "Fecha de lanzamiento obligatorio"],
        },

        
        portada: 
        {
            type:String,
            required:[true, "Portada obligatoria"],
        },

        
        categoria: 
        {
            type:String,
            required:[true, "Categoria obligatoria"],
        }
    }

)
module.exports = model('Pelicula', PeliculaSchema);
