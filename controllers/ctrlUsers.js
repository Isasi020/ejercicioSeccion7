const {response} = require('express');
const User = require("../models/user");
const bcryptjs = require('bcryptjs');

const usuarioGet = async (req, res = response) => {
    try {
        const users = await User.find({ status: true });
        res.json({
            total: users.length, 
            users
        });

    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

const usuarioPost = async (req, res = response) => {

    try {
        const {name, email, password, role} = req.body;
        const user = new User({name, email, password, role});
    
        const salt  = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt)
    
        await user.save();
    
        res.json({
            msg: 'POST API - CONTROLADOR',
            user
        });
    } catch (error) {
        console.log('hubo un error al crear usuario', error);
        res.status(400).json({
            msg: 'Error al crear usuario'
        })
    }
}

const usuarioPut = async (req, res = response) => {
    const { id } = req.params;
    const { password, ...updateBody } = req.body;

    if (password) {
        if (password.length < 6) {
            return res.status(400).json({ msg: "La contraseña debe tener al menos 6 caracteres" });
        }
        const salt = bcryptjs.genSaltSync();
        updateBody.password = bcryptjs.hashSync(password, salt);
    }

    try {
        const user = await User.findByIdAndUpdate(id, updateBody, { new: true });
        res.json({
            msg: "PUT API - CONTROLADOR",
            id,
            user
        });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json(
            { msg: "Error interno del servidor"});
    }
};

const usuarioDelete = async (req, res = response) => {
  
    const { id } = req.params;
    console.log('id desde delete ' + id);
    const user =await User.findByIdAndUpdate(id, {estado:false});
    const usuarioAutenticado = req.user;

    res.json({
        msg: 'DELETE API - CONTROLADOR',
        id,
        user,
        usuarioAutenticado
    });
}

const usuarioPatch = (req, res = response) => {
    res.json({
        msg: 'PATCH API - CONTROLADOR'
    });
}

module.exports = {
    usuarioGet, 
    usuarioPost,
    usuarioDelete,
    usuarioPatch,
    usuarioPut
}