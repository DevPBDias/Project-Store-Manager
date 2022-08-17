const express = require('express');
const salesController = require('../controllers/salesController');

const salesRoute = express.Router();

salesRoute.get('/', salesController.getAllSales);
salesRoute.get('/:id', salesController.getSalesById);

module.exports = salesRoute;
