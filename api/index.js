const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/index');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Configurar CORS
const whitelist = ['http://127.0.0.1:5500'];
const options = {
  origin: (origin, callback) => {
     if (whitelist.includes(origin)) {
       callback(null, true);
     } else {
       callback(new Error('No permitido por CORS'));
     }
   }
 };



// Middleware para JSON
//app.use(cors());
app.use(cors(options));

// Rutas
routerApi(app);

// Rutas de ejemplo
app.get('/api', (req, res) => res.send('Hola, servidor en Express'));
app.get('/api/nueva-ruta', (req, res) => res.send('Soy una nueva ruta'));
app.get('/api/home', (req, res) => res.send('Bienvenido a la home'));

// Manejo de errores
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
