const jwt = require('jsonwebtoken');

const generatorJWT = ( _id) =>{

    return new Promise( (resolve, reject)  => {

        const payload = {_id};

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: "10 days"
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('Cannot generate token')
            }else{
                console.log('Token generated successfully');
                resolve(token)
            }
        })
    })
}

module.exports = {
    generatorJWT
}