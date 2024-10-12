
// dbconfig.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productosRoutes = require('./routes/productos');
const stockRoutes = require('./routes/stock');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000; // Puerto para el backend

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cors({
  origin: 'http://localhost:3000', // Reemplaza con tu origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Rutas
app.use('/api/productos', productosRoutes); 
app.use('/api/stock', stockRoutes);
app.use('/api/admin', adminRoutes); 

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
