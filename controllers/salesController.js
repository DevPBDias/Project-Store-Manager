const salesService = require('../services/salesService');

const ERRO = 'Algo deu errado no Controller';

const addSales = async (req, res) => {
  try {
    const value = req.body;
    const newSale = await salesService.addSales(value);
    if (!newSale) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(201).json(newSale);
  } catch (error) {
    return res.status(500).json({ message: ERRO });
  }
};

module.exports = {
  addSales,
};