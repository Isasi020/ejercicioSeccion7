const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_ATLAS, {

        });
        const nombreBD = mongoose.connection.db.databaseName;
        console.log("Base de datos "  + nombreBD + " conectada");
    }catch(error){
        console.log(error);
        throw new Error('Error al intentar conectar con la base de datos');
    }
}
module.exports = {
    dbConnection
}

