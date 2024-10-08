// routes/productos.js
const authMiddleware = require('../middlewares/authMiddleware');

const express = require('express');
const Producto = require('../models/Producto');

const router = express.Router();

// Ruta para filtrar productos
router.get('/filtrar', async (req, res) => {
  try {
    const { marca, categoria } = req.query;

    const filtros = {};
    if (marca) {
      filtros.marca = marca;
    }
    if (categoria) {
      filtros.categoria = categoria;
    }

    if (Object.keys(filtros).length === 0) {
      return res.status(400).json({ error: 'Debes especificar al menos un filtro (marca o categoría).' });
    }

    const productosFiltrados = await Producto.find(filtros);
    res.status(200).json(productosFiltrados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/filtrar-categoria', async (req, res) => {
  try {
    const { categoria } = req.query;

    // Validar la categoría para aceptar solo ciertos valores
    const categoriasValidas = ['zapatillas', 'ropa', 'accesorios'];
    if (categoria && categoriasValidas.includes(categoria)) {
      const productosFiltrados = await Producto.find({ categoria });
      return res.status(200).json(productosFiltrados);
    } else if (categoria) {
      return res.status(400).json({ error: 'Categoría no válida. Las categorías permitidas son: zapatillas, ropa, accesorios.' });
    }

    return res.status(400).json({ error: 'Debes especificar una categoría (zapatillas, ropa, accesorios).' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para agregar un producto
router.post('/', async (req, res) => {
  try {
    // Asegúrate de que 'tallas' sea un objeto y no un array
    if (typeof req.body.tallas !== 'object' || Array.isArray(req.body.tallas)) {
      return res.status(400).json({ error: 'El campo tallas debe ser un objeto con tallas y su stock' });
    }

    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();

    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un producto
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para eliminar un producto
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
