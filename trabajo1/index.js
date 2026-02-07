const express = require('express');
const app = express();
require('dotenv').config();
const productosRoutes = require('./routes/productoRoutes');
const cors= require('cors');

app.use(cors());

app.use(express.json());

app.use('/api/productos', productosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});