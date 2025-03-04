const {Schema, model} = require('mongoose');

const roleSchema= new Schema({
    
    role:{
        type:String,
        enum: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_EDITOR'],
    }
});

module.exports = model('Role', roleSchema);