const{ Router} = require('express');
const{ check, checkSchema} = require('express-validator');
const { esPeliculaValida, esCategoriaValida, esIdValido } = require ('../helpers/db.validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { checkRole } = require('../middlewares/allowed-roles');
const { validatorJWT } = require('../middlewares/validator-jwt');
const controladorMetodos = require('../controllers/ctrlMovies');
const router  =  Router();

router.get('/listMovies',
   [
    validatorJWT,
    checkRole('ROLE_USER', 'ROLE_EDITOR', 'ROLE_ADMIN'),
   ],
    controladorMetodos.listMovies);


    router.post('/createMovie',
        [
            validatorJWT,
            checkRole('ROLE_EDITOR', 'ROLE_ADMIN'), 
            checkSchema({
                titulo: {
                    in: ['body'],
                    isString: true,
                    isLength: {
                        options: { max: 250 },
                        errorMessage: 'El título debe tener menos de 250 caracteres',
                    },
                    custom: {
                        options: esPeliculaValida,
                    },
                    errorMessage: 'El título de la película es obligatorio',
                },
                año: {
                    in: ['body'],
                    errorMessage: 'Año debe estar en el body',
                    isInt: {
                        options: { min: 1985, max: new Date().getFullYear() },
                        errorMessage: 'El año debe ser entre 1985 y el año actual',
                    },
                },
                portada: {
                    in: ['body'],
                    notEmpty: {
                        errorMessage: 'La URL de la portada es obligatoria',
                    },
                    isURL: {
                        errorMessage: 'La portada debe ser una URL válida',
                    },
                },
                categoria: {
                    in: ['body'],
                    notEmpty: {
                        errorMessage: 'La categoría es obligatoria',
                    },
                    isLength: {
                        options: { max: 250 },
                        errorMessage: 'La categoría debe tener menos de 250 caracteres',
                    },
                    custom: {
                        options: esCategoriaValida,
                    },
                },
            }),
            validarCampos,
        ],
        controladorMetodos.createMovie
    );


router.put('/updateMovie/:id',
    [
        validatorJWT, 
        checkRole('ROLE_EDITOR', 'ROLE_ADMIN'), 
        check('id').custom(esIdValido),
        check('titulo').custom(esPeliculaValida),
        check('categoria').custom(esCategoriaValida),
        check('portada', 'La url de la portada es obligatorio').notEmpty(),
        check('portada', 'La portada debe tener una url valida').isURL().optional(), 
        validarCampos
    ], controladorMetodos.updateMovie);


router.delete('/deleteMovie', 
    [     
        validatorJWT,
        checkRole('ROLE_ADMIN'),
        check('id').custom(esIdValido),
        validarCampos
    ], controladorMetodos.deleteMovie);

router.get('*', controladorMetodos.ctrlPaginaNoEncontrada);

module.exports = router;