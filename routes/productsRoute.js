const express = require('express');
const productsController = require('../controllers/productsController');

const productsRoute = express.Router();

productsRoute.get('/', productsController.getAllProducts);
productsRoute.get('/:id', productsController.getProductById);
productsRoute.post('/', productsController.addProduct);

module.exports = productsRoute;
