const express = require('express');
const router = express.Router();
const genresAPIController = require('../../controllers/api/genresAPIController');

router.get('/', genresAPIController.list);
router.get('/detail/:id', genresAPIController.detail);

module.exports = router;