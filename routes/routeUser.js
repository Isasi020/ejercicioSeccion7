const{ Router} = require('express');
const{ check } = require('express-validator');
const Role = require('../models/role');
const { validarCampos } = require('../middlewares/validar-campos');
const { checkRole } = require('../middlewares/allowed-roles');
const { validatorJWT } = require('../middlewares/validator-jwt');
const { usuarioGet, usuarioPost, usuarioPut, usuarioDelete, usuarioPatch} = require('../controllers/ctrlUsers');
const { esRolValido, existeUsuarioPorId } = require('../helpers/db.validators');

const router  =  Router();

// Rutas de la aplicación
router.get('/', usuarioGet);


router.post('/', [
    validatorJWT,
    check('email').isEmail(),
    check('name', 'Name has not be empty').not().isEmpty(),
    check('password', 'Password has a min of 6 words').isLength({min:6}),
    check('role').optional().default('ROLE_USER').custom( esRolValido ),
    validarCampos
], usuarioPost);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId), 
    check('password', 'Password has a min of 6 words').isLength({min:6}),
    validarCampos
], usuarioPut);

router.delete('/:id',usuarioDelete);

router.patch('/',usuarioPatch);

module.exports = router;