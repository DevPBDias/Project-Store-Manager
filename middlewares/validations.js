const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const validateIdQtty = (req, res, next) => {
  const object = req.body;  
  const id = object.some((item) => item.productId === undefined);
  const qtty = object.some((item) => item.quantity === undefined);
  const valueQtty = object.some((item) => item.quantity < 1);
  if (id) return res.status(400).json({ message: '"productId" is required' });
  if (qtty) return res.status(400).json({ message: '"quantity" is required' });
  if (valueQtty) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  validateName,
  validateIdQtty,
};