require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Asegúrate de que cors está importado
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const Habit = require('./models/Habit');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = 3001;

// --- CONFIGURACIÓN DE CORS (LA PARTE CLAVE) ---
// Aquí le decimos al backend que acepte peticiones desde cualquier origen.
// Para producción, sería mejor restringirlo a la URL específica de tu app.
app.use(cors());
// ---------------------------------------------

app.use(express.json());

// --- RUTAS DE AUTENTICACIÓN ---
// (Estas rutas no cambian)
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) { return res.status(400).json({ msg: 'Por favor, envía usuario y contraseña' }); }
  try {
    let user = await User.findOne({ username });
    if (user) { return res.status(400).json({ msg: 'El usuario ya existe' }); }
    user = new User({ username, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(201).json({ msg: 'Usuario registrado exitosamente' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) { return res.status(400).json({ msg: 'Por favor, envía usuario y contraseña' }); }
  try {
    const user = await User.findOne({ username });
    if (!user) { return res.status(400).json({ msg: 'Credenciales inválidas' }); }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) { return res.status(400).json({ msg: 'Credenciales inválidas' }); }
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});


// --- RUTAS DE HÁBITOS ---
// (Estas rutas no cambian)
app.get('/api/habits', authMiddleware, async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(habits);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el Servidor');
  }
});

app.post('/api/habits', authMiddleware, async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ msg: 'El nombre del hábito es requerido' });
  }
  try {
    const newHabit = new Habit({ name, user: req.user.id });
    const habit = await newHabit.save();
    res.json(habit);
  } catch (err) {
    console.error('Error al guardar el hábito:', err.message);
    res.status(500).send('Error en el Servidor al guardar el hábito');
  }
});

app.put('/api/habits/:id', authMiddleware, async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, user: req.user.id });
    if (!habit) {
      return res.status(404).json({ msg: 'Hábito no encontrado' });
    }
    habit.completed = !habit.completed;
    await habit.save();
    res.json(habit);
  } catch (err) {
    console.error('Error al actualizar hábito:', err.message);
    res.status(500).send('Error en el Servidor');
  }
});

app.delete('/api/habits/:id', authMiddleware, async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, user: req.user.id });
    if (!habit) {
      return res.status(404).json({ msg: 'Hábito no encontrado' });
    }
    await habit.deleteOne();
    res.json({ msg: 'Hábito eliminado' });
  } catch (err) {
    console.error('Error al eliminar hábito:', err.message);
    res.status(500).send('Error en el Servidor');
  }
});


// --- CONEXIÓN Y ARRANQUE DEL SERVIDOR ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("¡Conexión a MongoDB exitosa!");
    app.listen(PORT, () => {
      console.log(`Servidor de Habit Tracker corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Error fatal de conexión a la base de datos:", err);
    process.exit(1);
  });