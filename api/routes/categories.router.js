const express = require('express');
const CategoriesService = require('../services/categories.service');
const { faker } = require('@faker-js/faker');

const router = express.Router();
const service = new CategoriesService();

// Obtener todas las categorías
router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
  });



// Obtener una categoría específica por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const category = await service.findOne(id);

  if(!category){
    return res.status(404).json({
      message: 'Category not found'
    });
  }
  res.json(category);


});

// Crear una nueva categoría
router.post('/', async (req, res) => {
  const { name, products } = req.body;
  const newCategory = await service.create({
    name,
    products,
  });
  res.status(201).json(newCategory);
});

// Actualizar una categoría existente
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try{
    const updatedCategory = await service.update(id, body);
    res.json(updatedCategory);
  }catch(err){
    res.status(404).json({message: err.message});
  }
});

// Eliminar una categoría
router.delete('/:id',async (req, res) => {
  const { id } = req.params;

  try{
    await service.delete(id);
    res.json({message: 'Category deleted successfully', id});

  }catch(error){
    res.status(404).json({message: error.message});
  }
});

module.exports = router;
