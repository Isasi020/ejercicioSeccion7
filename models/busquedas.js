const axios = require('axios');
require('dotenv').config(); 

const Params = {
    method: "GET",
    url: process.env.API_URL,
    headers: {
        "x-rapidapi-key": process.env.API_KEY, 
        "x-rapidapi-host": process.env.API_HOST, 
    }
};

async function buscarPelicula(peliculaEscrita) {
    const options = {
        ...Params,
        params: {
            s: peliculaEscrita, 
            r: "json", 
        },
    };
    try {
        const response = await axios.request(options); 
        return response.data.Search;
    } catch (error) {
        console.error('Error al buscar la película:', error);
        return null;
    }
}

async function buscarPeliculaPorId(id) {
    const options = {
        ...Params,
        params: {
            i: id, 
            r: "json", 
        },
    };
    try {
        const response = await axios.request(options); 
        return response.data; 
        
    } catch (error) {
        console.error('Error al buscar la película:', error);
        return null;
    }
}

module.exports = {buscarPelicula, buscarPeliculaPorId}