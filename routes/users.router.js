const express = require('express');
const UsersService = require('../services/users.service');

const router = express.Router();
const service = new UsersService();

// Obtener todos los usuarios
router.get('/', (req, res) => {
 const users = service.find();
 res.json(users);
});

//Filtro de ejemplo
router.get('/filter', (req, res) => {
  res.send('Soy un filtro');
});

// Obtener un usuario por su id
  router.get('/:id',async (req, res) => {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.json(user);
  });


// POST: Crear un nuevo usuario
router.post('/', async (req, res) => {
  const body = req.body;
  const newUser = await service.create(body);
  res.status(201).json(newUser)

});

// PATCH: Actualizar datos de un usuario
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const user = await service.update(id, body);

  res.json(user);
});

// DELETE: Eliminar un usuario
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await service.delete(id);

  res.json(user);
});

module.exports = router;
