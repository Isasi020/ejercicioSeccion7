const{ Router} = require('express');
const{ check} = require('express-validator');
const { login, googleSignIn } = require('../controllers/ctrlAuthentication');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

 router.post("/login", login );

 router.post('/google',[
    check('id_token', 'id_token de google es necesario').notEmpty(),
    validarCampos
], googleSignIn);


module.exports = router;