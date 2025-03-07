const User = require('../models/user');
const Role = require('../models/role');
const bcryptjs =require('bcryptjs');

const { response, request} = require("express");
const { generatorJWT } = require('../helpers/generator-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req = request , res = response) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                email: email,
                password: password,
                msg: 'User or password is not correct',
            });
        }

        const validarPassword = bcryptjs.compareSync(password, user.password);
        if (!validarPassword) {
            return res.status(400).json({
                email: email,
                password: password,
                msg: 'User or password is not correct',
            });
        }

        const token = await generatorJWT(user._id);

        res.json({
            token: token,
            msg: 'Login successfully'
        })

    } catch (error) {
        res.status(500).json(error);
    }
}

const googleSignIn = async (req, res) => {

    const { credential } = req.body;
    console.log('cuerpo de google', req.body);
    const id_token = credential;

    try {
        const { name, email } = await googleVerify(id_token);
        let user = await User.findOne({ email });

        if (!user) {
            const data = {
                name,
                email,
                password: ':P',        
            };
            user = new User(data);
            await user.save();
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Hable con el admin, usuario bloqueado'
            });
        }

        // Genero el JWT
        const token = await generatorJWT(user.id);

        res.json({
            email: user.email,
            token
        });

    } catch (error) {

        res.status(400).json({
            ok: false,
            msg: error.message,
        });
    }
};

module.exports = {
    login,
    googleSignIn
}
