// dbconfig.js

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const productosRoutes = require('./routes/productos');
const stockRoutes = require('./routes/stock');

const app = express();
const PORT = process.env.PORT || 5000; // Puerto para el backend

app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Rutas
app.use('/api/productos', productosRoutes); 
app.use('/api/stock', stockRoutes); 

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});


