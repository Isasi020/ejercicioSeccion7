const{ Router} = require('express');
const router  =  Router();
const { ctrlPaginaInicio, ctrlPaginaNoEncontrada} = require('../controllers/ctrls');

router.get('/', ctrlPaginaInicio);
router.get('*', ctrlPaginaNoEncontrada);

module.exports = router;
