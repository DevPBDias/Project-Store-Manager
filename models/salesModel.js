const connection = require('./connectionProducts');

const addSales = async (newSale) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ();',
  );
  await newSale.map(async (obj) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES ?;',
      [result.insertId, obj.productId, obj.quantity],
    );
  });
  return result.insertId;
};

module.exports = {
  addSales,
};