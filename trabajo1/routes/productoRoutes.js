const express = require ('express');
const router = express.Router();
const ProductosController = require ('../controllers/ProductosController');

// Ruta para obtener todos los productos
router.get('/', ProductosController.getProductos);
router.post('/', ProductosController.createProducto);
router.put('/:id', ProductosController.updateProducto);
router.delete('/:id', ProductosController.deleteProducto);

module.exports = router;