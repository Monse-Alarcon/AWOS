const { Pool }  = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

pool.connect()
    .then(client => {
        console.log('PostgreSQL conectado exitosamente');
        client.release();
    })
    .catch(err => console.error('Error de conexión: ', err.code));

module.exports = pool;