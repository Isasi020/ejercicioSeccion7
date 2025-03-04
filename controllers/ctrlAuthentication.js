const User = require('../models/user');
const Role = require('../models/role');
const bcryptjs =require('bcryptjs');

const { response, request} = require("express");
const { generatorJWT } = require('../helpers/generator-jwt');

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

module.exports = {
    login
}
