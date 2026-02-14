
const express = require('express');
const { poblarProductos, buscarProductos } = require('../controllers/externalController');
const router = express.Router();

router.post('/poblar', poblarProductos);

router.get('/search', buscarProductos);

module.exports = router;