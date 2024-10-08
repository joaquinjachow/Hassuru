// routes/stock.js

const express = require('express');
const Producto = require('../models/Producto');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para actualizar el stock de un producto
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { tallas } = req.body; // Esperamos un objeto de tallas con cantidades
    const producto = await Producto.findById(req.params.id);
    
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    // Actualizar el stock de tallas
    for (const talla in tallas) {
      producto.tallas.set(talla, tallas[talla]); // Ajusta la cantidad de stock para cada talla
    }

    await producto.save();
    res.status(200).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
