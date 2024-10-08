// models/Producto.js
const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
  },
  descripcion: {
    type: String,
    // required: [true, 'La descripción es obligatoria'],
  },
  precios: {
    AR: {
      type: Number,
      required: [true, 'El precio en AR es obligatorio'],
    },
    USD: {
      type: Number,
      required: [true, 'El precio en USD es obligatorio'],
    },
  },
  marca: {
    type: String,
    required: [true, 'La marca del producto es obligatoria'],
  },
  categoria: {
    type: String,
    enum: ['zapatillas', 'ropa', 'accesorios'],
    required: true,
  },
  tallas: {
    type: Map,
    of: Number,
    required: true, 
  },
  colores: [
    {
      color: {
        type: String,
        required: true,
      },
    },
  ],
  // Solo una imagen por producto
  image: {
    url: {
      type: String,
      required: true,
    },
  },
  destacado: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Producto || mongoose.model('Producto', ProductoSchema);
