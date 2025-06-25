const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HabitSchema = new Schema({
  // El ID del usuario al que pertenece este hábito
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User' // Esto lo conecta con nuestro modelo 'User'
  },
  // El nombre del hábito (ej: "Leer 30 minutos")
  name: {
    type: String,
    required: true
  },
  // Las fechas en que se ha completado el hábito
  completions: [{
    date: {
      type: Date
    }
  }],
  // La fecha de creación del hábito
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Habit', HabitSchema);