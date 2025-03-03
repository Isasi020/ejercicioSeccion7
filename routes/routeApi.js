const{ Router} = require('express');
const{ check, checkSchema} = require('express-validator');
const { esPeliculaValida, esCategoriaValida, esIdValido } = require ('../helpers/db.validators');
const { validarCampos } = require('../middlewares/validar-campos');
const controladorMetodos = require('../controllers/ctrls');
const router  =  Router();

router.get('/list', controladorMetodos.getListaPeliculas);

router.post('/createCheck',
    [
        check('titulo', 'El titulo de pelicula es obligatorio').contains(),
        check('titulo', 'El titulo debe tener menos de 250 caracteres').isLength({max:250}),
        check('titulo').custom(esPeliculaValida),

        check('año', 'El año debe ser entre 1985 y el año actual').isAfter('1985-01-01').isBefore(new Date().getFullYear().toString() ),
        check('portada', 'La url de la portada es obligatorio').notEmpty(),
        check('portada', 'La portada debe tener una url valida').isURL().optional(),
        check('categoria', 'La categoria es obligatorio').notEmpty(),
        check('categoria', 'La categiria debe tener menos de 250 caracteres').isLength({max:250}),
        check('categoria').custom(esCategoriaValida),
        validarCampos

    ], controladorMetodos.postPelicula);

    router.post('/createJsonValidation', checkSchema({

        titulo: {
            in: ['body'],
            isString: true,
            isLength: {
                options:{max:250},
                errorMessage: 'Titulo debe ser mas pequeño de 250 caractrers',
            },
            custom: {
                options: esPeliculaValida,
            },

            errorMessage: 'Introduce un titulo',
        },
        año: {
                in:['body'],
                errorMessage: 'Año debe estar en el body',
            
            isInt: {
                options:{min: 1985, max: new Date().getFullYear()},
                errorMessage: 'El año debe ser entre 1985 y el año actual',
            },
        },
        portada: {
            in: ['body'], 
            errorMessage: 'Debes introducir una portada en el body', 
            isURL: { 
                errorMessage: 'La portada debe ser una URL válida',
            },
        },
        categoria:{
                in:['body'],
                errorMessage: 'Debes introducir una categoria en el body',
            custom:{
                options: esCategoriaValida
            }       
        },

    }), validarCampos
    , controladorMetodos.postPelicula);


router.put('/update/:id',
    [
        check('id').custom(esIdValido),
        check('titulo').custom(esPeliculaValida),
        check('categoria').custom(esCategoriaValida),
        check('portada', 'La url de la portada es obligatorio').notEmpty(),
        check('portada', 'La portada debe tener una url valida').isURL().optional(), 
        validarCampos
    ], controladorMetodos.putPelicula);


router.delete('/delete', 
    [        
        check('id').custom(esIdValido),
        validarCampos
    ], controladorMetodos.deletePelicula);

router.get('*', controladorMetodos.ctrlPaginaNoEncontrada);

module.exports = router;