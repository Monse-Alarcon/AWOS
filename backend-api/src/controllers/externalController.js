const pool = require('../config/db');

const poblarProductos = async (request, response) => {
    try {
        // Fetch FakeStoreApi
        const apiFetch = await fetch('http://fakestoreapi.com/products');
        const products = await apiFetch.json();

        let inserciones = 0;
        // Destructurar el objeto
        for(const product of products){
            const { title, price, description, image, category} = product;

            const stock = Math.floor(Math.random() * 50) + 1;

             // Insertar categoría 
            const categoriaQuery = `
                INSERT INTO categoria (nombre)
                VALUES ($1)
                ON CONFLICT (nombre) DO NOTHING
                RETURNING id
            `;

            let categoriaId;

            const categoriaInsert = await pool.query(categoriaQuery, [category]);

            if (categoriaInsert.rows.length > 0) {
                categoriaId = categoriaInsert.rows[0].id;
            } else {
                const categoriaSelect = await pool.query(
                    "SELECT id FROM categoria WHERE nombre = $1",
                    [category]
                );
                categoriaId = categoriaSelect.rows[0].id;
            }


            // antes 
            const query = `
                INSERT INTO productos
                (nombre, precio, stock, descripcion, imagen_url, id_categoria)
                VALUES ($1, $2, $3, $4, $5, $6)
            `

            await pool.query(query, [title, price, stock, description, image, categoriaId]);

            inserciones++;
        }
        response.status(200).json(
            {
                mensaje: "Carga masiva exitosa", 
                cantidad: inserciones
            }
        );
    } catch (error) {
        console.log(`Error: ${error}`);
        response.status(500).json({error: error.message})
    }
};




module.exports = { poblarProductos };