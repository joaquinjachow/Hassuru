const express = require('express');
const Producto = require('../models/Producto');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { tallas } = req.body;
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    for (const talla in tallas) {
      producto.tallas.set(talla, tallas[talla]);
    }
    await producto.save();
    res.status(200).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
