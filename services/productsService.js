const productsModel = require('../models/productsModel');

const getAllProducts = async () => productsModel.getAllProducts();
const getProductById = async (id) => productsModel.getProductById(id);
const addProduct = async (name) => productsModel.addProduct(name);

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
};
