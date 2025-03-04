const{ Router} = require('express');
const router  =  Router();
const controladorMetodos = require('../controllers/ctrlMovies');

router.get('/', controladorMetodos.ctrlPaginaInicio);
router.get('*', controladorMetodos.ctrlPaginaNoEncontrada);

module.exports = router;
