const connection = require('./connectionProducts');

const getAllSales = async () => {
  const query = `
  SELECT  A.id AS saleId, date, B.product_id as productId, quantity
  FROM
    StoreManager.sales AS A
    INNER JOIN
    StoreManager.sales_products AS B
      ON A.id = B.sale_id
  `;
  const [result] = await connection.execute(query);
  return result;
};

const getSalesById = async (id) => {
  const query = `
  SELECT date, B.product_id as productId, quantity
  FROM
    StoreManager.sales AS A
    INNER JOIN
    StoreManager.sales_products AS B
      ON A.id = B.sale_id
  WHERE A.id = ?
  `;
  const [result] = await connection.execute(query, [id]);
  return result;
};

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
  getAllSales,
  getSalesById,
};