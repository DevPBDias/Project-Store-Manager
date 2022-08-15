const express = require('express');
const productsController = require('../controllers/productsController');
const validateName = require('../middlewares/validations');

const productsRoute = express.Router();

productsRoute.get('/', productsController.getAllProducts);
productsRoute.get('/:id', productsController.getProductById);
productsRoute.post('/', validateName, productsController.addProduct);
productsRoute.put('/:id', validateName, productsController.updateProduct);
productsRoute.delete('/:id', productsController.delProduct);

module.exports = productsRoute;
