const salesModel = require('../models/salesModel');

const getAllSales = async () => salesModel.getAllSales();

const getSalesById = async (id) => {
  const result = await salesModel.getSalesById(id);
  if (!result.length) return null;
  return result;
};

module.exports = {
  getAllSales,
  getSalesById,
};