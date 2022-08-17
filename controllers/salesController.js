const salesService = require('../services/salesService');

const ERRO = 'Algo deu errado no Controller';

const getAllSales = async (_req, res, _next) => {
  try {
    const sales = await salesService.getAllSales();
    return res.status(200).json(sales);
  } catch (error) {
    return res.status(500).json({ message: ERRO });
  }
};

const getSalesById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getSalesById(id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(200).json(sale);
  } catch (error) {
    return res.status(500).json({ message: ERRO });
  }
};

module.exports = {
  getAllSales,
  getSalesById,
};