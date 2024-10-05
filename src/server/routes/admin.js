const express = require('express');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para iniciar sesión como administrador
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validación de entrada
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  try {
    // Verifica si el administrador existe por email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Compara la contraseña
    const esPasswordCorrecta = await admin.compararPassword(password);
    if (!esPasswordCorrecta) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Genera un token JWT
    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'  // El token expira en 1 hora
    });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Opcional: Ruta para obtener información del administrador
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select('-password'); // No devolver la contraseña

    if (!admin) {
      return res.status(404).json({ error: 'Administrador no encontrado' });
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
