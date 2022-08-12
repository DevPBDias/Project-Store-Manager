const connection = require('./connectionProducts');

const getAllProducts = async () => {
  const [result] = await connection
    .execute('SELECT * FROM products');
  return result;
};

const getProductById = async (id) => {
  const [result] = await connection
    .execute('SELECT * FROM products WHERE id = ? ORDER BY id;', [id]);
  if (!result.length) return null;
  return result[0];
};

module.exports = { getAllProducts, getProductById };