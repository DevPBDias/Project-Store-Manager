const productsService = require('../services/productsService');

const ERRO = 'Algo deu errado no Controller';

const getAllProducts = async (_req, res, _next) => {
  try {
    const products = await productsService.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: ERRO });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: ERRO });
  }
};

const addProduct = async (req, res) => {
  const { name } = req.body;
  try {
    const newProduct = await productsService.addProduct(name);
    console.log(newProduct);
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: ERRO });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
};