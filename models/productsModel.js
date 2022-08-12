const connection = require('./connectionProducts');

const getAllProducts = async () => {
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.products');
  return result;
};

const getProductById = async (id) => {
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?;', [id]);
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
};
