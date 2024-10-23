const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productosRoutes = require('./routes/productos');
const stockRoutes = require('./routes/stock');
const adminRoutes = require('./routes/admin');
const tiktokRoutes = require('./routes/tiktoks');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// CORS configuration
app.use(cors({
  origin: ['https://hassuru.vercel.app', 'http://localhost:3000', 'https://hassuru.vercel.app/admin'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Agregar OPTIONS para preflight
  credentials: true, // Cambiado a booleano
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Manejar las solicitudes preflight
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin); // Permitir dinámicamente el origen
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204); // Responder con 204 No Content para preflight
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

app.use('/api/productos', productosRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/tiktoks', tiktokRoutes);

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
