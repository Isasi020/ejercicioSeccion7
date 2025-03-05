const { response, request } = require("express");
const User = require('../models/user');


const checkRole = (...rolesAllowed) => {
    return async (req = request, res = response, next) => {

        try {

            const { role } = await req.user;
            console.log(req.user);
            console.log('role extracted: ' + role);

            if (!rolesAllowed.includes(role)) {
                console.log('Action denied');
                return res.status(401).json({
                    msg: 'role not authorizated, access denied'
                })
            }

            next();
        } catch (error) {
            console.log('error_: ' + error);
            return res.status(500).json({
                msg: 'error '
            })
        }
    }
}

module.exports = {
    checkRole
}