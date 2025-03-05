const { response, request } = require("express");
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const validatorJWT = async (req =request, res=response, next)=>{

    const token = req.header('x-token');
    if(!token){
        console.log('token error');
        return res.status(401).json({
            msg: 'Token is required'
        });
    }

    try {
        const {_id} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req._id = _id;

        const user = await User.findById(_id);

        if(!user){
            console.log(id);
            console.log('user not valid');
            return res.status(401).json({
                msg: 'User not valid'
            });
        }
        req.user = user;
        console.log('user daat' + user);
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'No valid token'
        });
    }
    console.log(token);
};

module.exports ={
    validatorJWT
}