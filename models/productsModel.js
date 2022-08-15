const connection = require('./connectionProducts');

const getAllProducts = async () => {
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.products');
  return result;
};

const getProductById = async (id) => {
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?;', [id]);
  if (!result.length) return null;
  return result[0];
};

const addProduct = async (name) => {
  const [result] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUES (?);', [name]);
  return { id: result.insertId, name };
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
};
