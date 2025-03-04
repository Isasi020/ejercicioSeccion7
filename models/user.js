const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role: {
        type: String,
        default: 'ROLE_USER',
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique:true   
     },
    status: {
        type: Boolean,
        default: true,
    }
});

// Exportar el modelo correctamente
module.exports = model('User', userSchema);