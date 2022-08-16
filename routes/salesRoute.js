const express = require('express');
const salesController = require('../controllers/salesController');
const { validateIdQtty } = require('../middlewares/validations');

const salesRoute = express.Router();

salesRoute.post('/', validateIdQtty, salesController.addSales);

module.exports = salesRoute;