const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // El nombre de usuario es obligatorio
    unique: true    // No puede haber dos usuarios con el mismo nombre
  },
  password: {
    type: String,
    required: true // La contraseña es obligatoria
  }
});

// Exportamos el modelo para poder usarlo en otros archivos
module.exports = mongoose.model('User', UserSchema);