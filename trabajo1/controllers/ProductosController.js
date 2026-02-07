const pool = require('../config/db');

const getProductos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        res.json(rows); 

    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }

};

const createProducto = async (req, res) => {
    const { nombre, precio, stock} = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)',
            [nombre, precio, stock]
        );
        res.status(201).json({ id: result.insertId, nombre, precio, stock });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Método de PUT (solo precio y stok)
const updateProducto = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { precio, stock } = req.body;

        // Validaciones
        if (typeof precio !== 'number' || precio <= 0) {
            return res.status(400).json({ error: 'El precio debe ser un número mayor a 0' });
        }

        if (!Number.isInteger(stock)) {
            return res.status(400).json({ error: 'El stock debe ser un número entero' });
        }

        const [result] = await pool.query(
            'UPDATE productos SET precio = ?, stock = ? WHERE id = ?',
            [precio, stock, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto actualizado correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar en BD' });
    }
};


// Método de delete
const deleteProducto = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const [result] = await pool.query(
            'DELETE FROM productos WHERE id = ?',
            [id]
        );  
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error(error);

        res.status(500).json({ error: 'Error al eliminar en BD' });
    }
};




module.exports = {getProductos, createProducto, updateProducto, deleteProducto};