const express = require('express');
const salesController = require('../controllers/salesController');
const { validateIdQtty } = require('../middlewares/validations');

const salesRoute = express.Router();

salesRoute.post('/', validateIdQtty, salesController.addSales);
salesRoute.get('/', salesController.getAllSales);
salesRoute.get('/:id', salesController.getSalesById);

module.exports = salesRoute;
