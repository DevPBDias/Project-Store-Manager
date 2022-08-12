const productsService = require('../services/productsService');

const ERRO = 'Algo deu errado no Controller';

const getAllProducts = async (_req, res, _next) => {
  try {
    const products = await productsService.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
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
    console.error(error);
    return res.status(500).json({ message: ERRO });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};