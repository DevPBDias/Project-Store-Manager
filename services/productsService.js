const productsModel = require('../models/productsModel');

const getAllProducts = async () => productsModel.getAllProducts();
const getProductById = async (id) => productsModel.getProductById(id);
const addProduct = async (name) => productsModel.addProduct(name);
const updateProduct = async (product) => {
  const id = Number(product.id);
  const updated = await productsModel.updateProduct(id, product.name);
  if (!updated.affectedRows) return null;
  return { ...product };
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
};
