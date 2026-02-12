const express = require('express');
const { poblarProductos } = require('../controllers/externalController');
const router = express.Router();

router.post('/poblar', poblarProductos);

router.get('/buscar/:texto', buscarProductos);

module.exports = router;