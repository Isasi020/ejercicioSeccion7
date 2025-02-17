const{ Router} = require('express');
const router  =  Router();
const controladorMetodos = require('../controllers/ctrls');

router.get('/search', controladorMetodos.ctrlBuscarPeli);
router.get('/find', controladorMetodos.ctrlBuscarInfoPeli);

router.post('/postPelicula',controladorMetodos.postBuscarPeliculas);
router.post('/postInfo', controladorMetodos.postBuscarInfoPelicula);

router.delete('/delete', controladorMetodos.ctrlMockDelete);
router.put('/put', controladorMetodos.ctrlMockUpdate);

router.get('*', controladorMetodos.ctrlPaginaNoEncontrada);

module.exports = router;