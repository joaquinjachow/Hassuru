const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Esquema de Administrador
const adminSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'admin'  // Por defecto, todos los usuarios de este modelo son 'admin'
  }
}, { timestamps: true });

// Middleware para hashear la contraseña antes de guardar el administrador
adminSchema.pre('save', async function(next) {
  const admin = this;
  if (admin.isModified('password')) {
    try {
      admin.password = await bcrypt.hash(admin.password, 10);
    } catch (error) {
      return next(error); // Propaga el error al siguiente middleware
    }
  }
  next();
});


// Método para comparar contraseñas
adminSchema.methods.compararPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

// Modelo de Administrador
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
