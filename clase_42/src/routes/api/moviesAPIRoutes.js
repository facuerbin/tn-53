const express = require('express');
const router = express.Router();
const moviesAPIController = require('../../controllers/api/moviesAPIController');

router.get('', moviesAPIController.list);
router.post('/create-from-api/:id', moviesAPIController.createMovieFromApi);
router.get('/detail/:id', moviesAPIController.detail);
router.post('', moviesAPIController.create);
router.delete('/:id', moviesAPIController.delete);

// Implementar ruta para search
router.get('/search', moviesAPIController.search);

// router.get('/recommended', moviesController.recomended);
// //Rutas exigidas para la creación del CRUD
// router.get('/add', moviesController.add);
// router.post('/create', moviesController.create);
// router.get('/edit/:id', moviesController.edit);
// router.put('/update/:id', moviesController.update);
// router.get('/delete/:id', moviesController.delete);
// router.delete('/delete/:id', moviesController.destroy);

module.exports = router;