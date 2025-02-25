const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { sequelize } = require('./models');
const libraryRoutes = require('./routes/libraryRoutes');

const app = express();

// Configuración de seguridad
app.use(helmet());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Configurar CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://tu-dominio.com' 
    : 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de 100 peticiones por ventana
});
app.use('/api/', limiter);

// Middleware
app.use(express.json({ limit: '10kb' })); // Limitar tamaño del body

// Rutas
app.use('/api/libraries', libraryRoutes);

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ message: '¡API funcionando correctamente!' });
});

// Sincronizar base de datos
sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
}); 