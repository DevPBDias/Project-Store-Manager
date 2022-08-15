const express = require('express');
const app = require('./app');
const validateName = require('./middlewares/validations');
require('dotenv').config();

app.use(express.json());

const routes = require('./routes');

app.use('/products', validateName, routes.productsRoute);

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
