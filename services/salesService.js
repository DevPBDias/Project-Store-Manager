const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const addSales = async (sale) => {
  const products = await productsModel.getAllProducts();
  const verify = sale.every((i) => products.some((p) => p.id === i.productId));
  if (!verify) return null;  
  const id = await salesModel.addSales(sale);
  const result = { id, itemsSold: sale };
  return result;
};

const getAllSales = async () => salesModel.getAllSales();

const getSalesById = async (id) => {
  const result = await salesModel.getSalesById(id);
  if (!result.length) return null;
  return result;
};

module.exports = {
  addSales,
  getAllSales,
  getSalesById,
};