const{ Router} = require('express');
const router  =  Router();
const controladorMetodos = require('../controllers/ctrls');

router.get('/', controladorMetodos.ctrlPaginaInicio);
router.get('*', controladorMetodos.ctrlPaginaNoEncontrada);

module.exports = router;
