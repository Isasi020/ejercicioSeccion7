const{ Router} = require('express');
const router  =  Router();
const { ctrlBuscarPeli, ctrlBuscarInfoPeli, postBuscarInfoPelicula, 
    postBuscarPeliculas, ctrlPaginaNoEncontrada, ctrlMockDelete, ctrlMockUpdate} = require('../controllers/ctrls');

router.get('/search', ctrlBuscarPeli);
router.get('/find', ctrlBuscarInfoPeli);

router.post('/postPelicula', postBuscarPeliculas);
router.post('/postInfo', postBuscarInfoPelicula);

router.delete('/delete', ctrlMockDelete);
router.put('/put', ctrlMockUpdate);

router.get('*', ctrlPaginaNoEncontrada);

module.exports = router;