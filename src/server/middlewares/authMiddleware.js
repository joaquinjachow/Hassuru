const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Extrae el token de los encabezados
  const token = req.headers['authorization']?.split(' ')[1];

  // Si no hay token, retorna un error 403
  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  // Verifica el token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token no válido' });
    }

    // Guarda el ID del administrador en la solicitud para usar en las siguientes funciones
    req.adminId = decoded.id;
    next(); // Llama al siguiente middleware o ruta
  });
};

module.exports = authMiddleware;