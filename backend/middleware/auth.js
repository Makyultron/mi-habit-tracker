const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  // Buscamos el token en los encabezados de la petición
  const token = req.header('x-auth-token');

  // Si no hay token, denegamos el acceso
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, permiso no válido' });
  }

  // Si hay token, intentamos verificarlo
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Si es válido, guardamos los datos del usuario en la petición
    req.user = decoded.user;
    // y le decimos a Express que continúe hacia la ruta principal
    next();
  } catch (err) {
    // Si el token no es válido, denegamos el acceso
    res.status(401).json({ msg: 'El token no es válido' });
  }
};